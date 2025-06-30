import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../../utils/common';

import { Wave } from '../../../../entities/wave.entity';
import { Node } from '../../../../entities/node.entity';

import { NodeDto, WaveDto, TaskDto } from 'ez-utils';

import { FilterEvaluatorService } from './filter-evaluator.service';
import { TaskHandlerService } from './task-handler.service';
import { ActionHandlerService } from './action-handler.service';
import * as _ from 'lodash';

@Injectable()
export class NodeHandlerService {
  private logger = getLoggerConfig(NodeHandlerService.name);

  constructor(
    @InjectRepository(Wave)
    private readonly waveRepository: Repository<Wave>,
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    private readonly filterEvaluatorService: FilterEvaluatorService,
    private readonly actionHandlerService: ActionHandlerService,
    private readonly taskHandlerService: TaskHandlerService,
  ) {
    this.logger.debug(
      `${NodeHandlerService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  /**
   * Private method that executes a node.
   * 1) (Optional) create Task for the node (later).
   * 2) Switch nodeType => call specialized private method
   */
  public async executeNode(
    nodeDto: NodeDto,
    waveDto: WaveDto,
    previousTaskDto: TaskDto | null,
    waveContext: any,
    traceId: string,
  ): Promise<void> {
    // (1) Create a Task referencing node & wave
    // This ensures we have a record of reaching this node.
    const newTask = await this.taskHandlerService.createTask(
      nodeDto,
      waveDto,
      previousTaskDto,
      waveContext,
      traceId,
    );

    // Ensure node type is defined
    const nodeTypeName = nodeDto.nodeType?.name?.toUpperCase();
    if (!nodeTypeName) {
      this.logger.error(
        `Node type is undefined for node with ID: ${nodeDto.nodeId}`,
        traceId,
        'executeNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Node type is undefined');
    }

    this.logger.info(
      `Retrieved node type: ${nodeTypeName} for node with ID: ${nodeDto.nodeId}`,
      traceId,
      'executeNode',
      LogStreamLevel.ProdStandard,
    );

    // (2) Switch based on nodeType => delegate logic
    switch (nodeTypeName) {
      case 'START':
        await this.handleStartNode(
          nodeDto,
          waveDto,
          newTask,
          waveContext,
          traceId,
        );
        break;
      case 'ACTION':
        await this.handleActionNode(
          nodeDto,
          waveDto,
          newTask,
          waveContext,
          traceId,
        );
        break;
      case 'FLOW':
        await this.handleFlowNode(
          nodeDto,
          waveDto,
          newTask,
          waveContext,
          traceId,
        );
        break;
      case 'FLOW RETURN':
        await this.handleFlowReturnNode(
          nodeDto,
          waveDto,
          newTask,
          waveContext,
          traceId,
        );
        break;
      case 'MANIFOLD':
        await this.handleManifoldNode(
          nodeDto,
          waveDto,
          newTask,
          waveContext,
          traceId,
        );
        break;
      case 'STOP':
        await this.handleStopNode(
          nodeDto,
          waveDto,
          newTask,
          waveContext,
          traceId,
        );
        break;
      default:
        this.logger.error(
          `Unknown node type: ${nodeTypeName} for node with ID: ${nodeDto.nodeId}`,
          traceId,
          'executeNode',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(`Unknown node type: ${nodeTypeName}`);
    }
  }

  // ---------------------------------------------------
  // PRIVATE HANDLER METHODS FOR EACH NODE TYPE
  // ---------------------------------------------------

  private async handleStartNode(
    nodeDto: NodeDto,
    waveDto: WaveDto,
    currentTaskDto: TaskDto | null,
    waveContext: any,
    traceId: string,
  ): Promise<void> {
    try {
      // Mark current task as IN_PROGRESS at the start
      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsInProgress(
          currentTaskDto,
          traceId,
        );
      }

      // (1) Update wave start date
      waveDto.executionStartDate = new Date();
      await this.waveRepository.save(waveDto);

      // (2) For each nodeExit => execute the target node
      if (nodeDto.nodeExits) {
        for (const nodeExit of nodeDto.nodeExits) {
          const targetNode = await this.nodeRepository.findOne({
            where: { nodeId: nodeExit.targetNodeId, isDeleted: false },
            relations: [
              'nodeType',
              'nodeExits',
              'nodeExits.nodeExitType',
              'manifold',
              'manifold.filters',
              'manifold.filters.nodeExit',
              'manifold.filters.filterSubsets',
              'manifold.filters.filterSubsets.filterSubsetItems',
              'manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable',
              'manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable.evaluationVariableDataType',
              'manifold.filters.filterSubsets.filterSubsetItems.evaluationOperator',
              'action',
              'action.actionVariables',
            ],
          });

          if (targetNode) {
            this.logger.info(
              `Executing next node with id: ${targetNode.nodeId} (${targetNode.name}) as target of nodeExit with targetNodeId: ${nodeExit.targetNodeId}`,
              traceId,
              'handleStartNode',
              LogStreamLevel.ProdStandard,
            );
            await this.executeNode(
              targetNode,
              waveDto,
              { ...currentTaskDto, isExecutedFromId: nodeExit.nodeExitId },
              waveContext,
              traceId,
            );
          } else {
            this.logger.error(
              `NodeExit target node not found for nodeExit with targetNodeId=${nodeExit.targetNodeId}`,
              traceId,
              'handleStartNode',
              LogStreamLevel.DebugHeavy,
            );
            waveDto.waveStatus = 'FailedWithError';
            waveDto.executionEndDate = new Date();
            await this.waveRepository.save(waveDto);
            return; // Stop execution as a failure occurred
          }
        }
      }

      // Mark current task as COMPLETED when node processing finishes
      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsCompleted(
          currentTaskDto,
          waveContext,
          traceId,
        );
      }

      const latestWave = await this.waveRepository.findOne({
        where: { waveId: waveDto.waveId, isDeleted: false },
      });

      if (latestWave?.waveStatus !== 'FailedWithError') {
        waveDto.waveStatus = 'Completed';
        waveDto.executionEndDate = new Date();
        await this.waveRepository.save(waveDto);
      }
    } catch (error) {
      this.logger.error(
        `Error in handleStartNode: ${error.message}`,
        traceId,
        'handleStartNode',
        LogStreamLevel.DebugHeavy,
      );
      waveDto.waveStatus = 'FailedWithError';
      waveDto.executionEndDate = new Date();
      await this.waveRepository.save(waveDto);
    }
  }

  private async handleActionNode(
    nodeDto: NodeDto,
    waveDto: WaveDto,
    currentTaskDto: TaskDto | null,
    waveContext: any,
    traceId: string,
  ): Promise<void> {
    try {
      // Mark current task as IN_PROGRESS at the start
      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsInProgress(
          currentTaskDto,
          traceId,
        );
      }

      const latestWave = await this.waveRepository.findOne({
        where: { waveId: waveDto.waveId, isDeleted: false },
      });

      if (!latestWave || latestWave.waveStatus !== 'InExecution') {
        this.logger.error(
          `Wave (${waveDto.waveId}) is not in execution. Current status: ${latestWave?.waveStatus}`,
          traceId,
          'handleActionNode',
          LogStreamLevel.DebugHeavy,
        );
        return;
      }

      const action = nodeDto.action;
      const { success, outputs } =
        await this.actionHandlerService.performActionExecution(
          action,
          waveContext,
          traceId,
        );

      waveContext.priorOutputs = {
        ...(waveContext.priorOutputs || {}),
        ...outputs,
      };
      waveContext.inputVariables = {
        ...waveContext.inputVariables,
        ...waveContext.priorOutputs,
      };

      if (
        waveContext.returnVariables &&
        Object.keys(waveContext.returnVariables).length > 0
      ) {
        latestWave.returnVariables = {
          ...(latestWave.returnVariables || {}),
          ...waveContext.returnVariables,
        };
        await this.waveRepository.save(latestWave);
        // Keep the DTO in sync
        waveDto.returnVariables = latestWave.returnVariables;
        // Clear the context for the next action
        waveContext.returnVariables = {};
      }

      let targetNode: NodeDto | null = null;
      let nodeExitId: string | null = null;

      if (success) {
        const successExit = nodeDto.nodeExits?.find(
          (nodeExit) => nodeExit.nodeExitType?.name === 'EXECUTED',
        );

        if (successExit) {
          nodeExitId = successExit.nodeExitId;
          targetNode = await this.nodeRepository.findOne({
            where: { nodeId: successExit.targetNodeId, isDeleted: false },
            relations: [
              'nodeType',
              'nodeExits',
              'nodeExits.nodeExitType',
              'manifold',
              'manifold.filters',
              'manifold.filters.nodeExit',
              'manifold.filters.filterSubsets',
              'manifold.filters.filterSubsets.filterSubsetItems',
              'manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable',
              'manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable.evaluationVariableDataType',
              'manifold.filters.filterSubsets.filterSubsetItems.evaluationOperator',
              'action',
              'action.actionVariables',
            ],
          });
        }
      } else {
        const errorExit = nodeDto.nodeExits?.find(
          (nodeExit) => nodeExit.nodeExitType?.name === 'ERROR',
        );

        if (errorExit) {
          nodeExitId = errorExit.nodeExitId;
          targetNode = await this.nodeRepository.findOne({
            where: { nodeId: errorExit.targetNodeId, isDeleted: false },
            relations: [
              'nodeType',
              'nodeExits',
              'nodeExits.nodeExitType',
              'manifold',
              'manifold.filters',
              'manifold.filters.nodeExit',
              'manifold.filters.filterSubsets',
              'manifold.filters.filterSubsets.filterSubsetItems',
              'manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable',
              'manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable.evaluationVariableDataType',
              'manifold.filters.filterSubsets.filterSubsetItems.evaluationOperator',
              'action',
              'action.actionVariables',
            ],
          });
        }
      }

      // Mark current task as COMPLETED before moving on to the next node
      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsCompleted(
          currentTaskDto,
          waveContext,
          traceId,
        );
      }

      if (targetNode) {
        await this.executeNode(
          targetNode,
          waveDto,
          { ...currentTaskDto, isExecutedFromId: nodeExitId },
          waveContext,
          traceId,
        );
      } else {
        // If no valid target node found, fail the wave execution
        this.logger.error(
          `No valid target node found for ACTION node (${nodeDto.nodeId}). Wave marked as FailedWithError.`,
          traceId,
          'handleActionNode',
          LogStreamLevel.DebugHeavy,
        );

        waveDto.waveStatus = 'FailedWithError';
        waveDto.executionEndDate = new Date();
        await this.waveRepository.save(waveDto);
      }
    } catch (error) {
      this.logger.error(
        `Error in handleActionNode: ${error.message}`,
        traceId,
        'handleActionNode',
        LogStreamLevel.DebugHeavy,
      );

      // Ensure wave status is marked as failed in case of unexpected error
      waveDto.waveStatus = 'FailedWithError';
      waveDto.executionEndDate = new Date();
      await this.waveRepository.save(waveDto);
    }
  }

  private async handleFlowNode(
    nodeDto: NodeDto,
    waveDto: WaveDto,
    currentTaskDto: TaskDto | null,
    waveContext: any,
    traceId: string,
  ): Promise<void> {
    try {
      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsInProgress(
          currentTaskDto,
          traceId,
        );
      }

      // Verify that wave is still in execution before proceeding
      const latestWave = await this.waveRepository.findOne({
        where: { waveId: waveDto.waveId, isDeleted: false },
      });

      if (!latestWave || latestWave.waveStatus !== 'InExecution') {
        this.logger.error(
          `Wave (${waveDto.waveId}) is not in execution. Current status: ${latestWave?.waveStatus}`,
          traceId,
          'handleFlowNode',
          LogStreamLevel.DebugHeavy,
        );
        return;
      }

      // Placeholder for FLOW execution logic
      this.logger.info(
        `Executing FLOW node (${nodeDto.nodeId}) for wave (${waveDto.waveId}).`,
        traceId,
        'handleFlowNode',
        LogStreamLevel.ProdStandard,
      );

      // Execution logic will be implemented here

      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsCompleted(
          currentTaskDto,
          waveContext,
          traceId,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error in handleFlowNode: ${error.message}`,
        traceId,
        'handleFlowNode',
        LogStreamLevel.DebugHeavy,
      );

      // Ensure wave status is marked as failed in case of unexpected error
      waveDto.waveStatus = 'FailedWithError';
      waveDto.executionEndDate = new Date();
      await this.waveRepository.save(waveDto);
    }
  }

  private async handleFlowReturnNode(
    nodeDto: NodeDto,
    waveDto: WaveDto,
    currentTaskDto: TaskDto | null,
    waveContext: any,
    traceId: string,
  ): Promise<void> {
    try {
      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsInProgress(
          currentTaskDto,
          traceId,
        );
      }

      // Verify that wave is still in execution before proceeding
      const latestWave = await this.waveRepository.findOne({
        where: { waveId: waveDto.waveId, isDeleted: false },
      });

      if (!latestWave || latestWave.waveStatus !== 'InExecution') {
        this.logger.error(
          `Wave (${waveDto.waveId}) is not in execution. Current status: ${latestWave?.waveStatus}`,
          traceId,
          'handleFlowReturnNode',
          LogStreamLevel.DebugHeavy,
        );
        return;
      }

      // Placeholder for FLOW RETURN execution logic
      this.logger.info(
        `Executing FLOW RETURN node (${nodeDto.nodeId}) for wave (${waveDto.waveId}).`,
        traceId,
        'handleFlowReturnNode',
        LogStreamLevel.ProdStandard,
      );

      // Execution logic will be implemented here

      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsCompleted(
          currentTaskDto,
          waveContext,
          traceId,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error in handleFlowReturnNode: ${error.message}`,
        traceId,
        'handleFlowReturnNode',
        LogStreamLevel.DebugHeavy,
      );

      // Ensure wave status is marked as failed in case of unexpected error
      waveDto.waveStatus = 'FailedWithError';
      waveDto.executionEndDate = new Date();
      await this.waveRepository.save(waveDto);
    }
  }

  private async handleManifoldNode(
    nodeDto: NodeDto,
    waveDto: WaveDto,
    currentTaskDto: TaskDto | null,
    waveContext: any,
    traceId: string,
  ): Promise<void> {
    try {
      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsInProgress(
          currentTaskDto,
          traceId,
        );
      }

      // Verify that wave is still in execution before proceeding
      const latestWave = await this.waveRepository.findOne({
        where: { waveId: waveDto.waveId, isDeleted: false },
      });

      if (!latestWave || latestWave.waveStatus !== 'InExecution') {
        this.logger.error(
          `Wave (${waveDto.waveId}) is not in execution. Current status: ${latestWave?.waveStatus}`,
          traceId,
          'handleManifoldNode',
          LogStreamLevel.DebugHeavy,
        );
        return;
      }

      const manifold = nodeDto.manifold;
      if (!manifold || !manifold.filters) return;

      const baseContext = _.cloneDeep(waveContext);

      const filters = manifold.filters
        .filter((f) => !f.isDeleted && f.isActive)
        .sort((a, b) => a.manifoldOrder - b.manifoldOrder);

      for (const filter of filters) {
        // Evaluate the filter
        const filterHasPassed = await this.filterEvaluatorService.checkFilter(
          filter,
          baseContext,
          traceId,
        );

        this.logger.info(
          `Filter evaluation completed. Result: ${filterHasPassed} for filter: ${filter.filterName || filter.filterId || 'unknown'}`,
          traceId,
          'executeFilter',
          LogStreamLevel.ProdStandard,
        );

        if (!filterHasPassed) {
          // skip this branch
          continue;
        }

        const branchContext = _.cloneDeep(baseContext);

        // Get nodeExit and find the target node
        const nodeExit = filter.nodeExit;
        if (!nodeExit) {
          this.logger.error(
            `NodeExit missing for filter ${filter.filterId} in MANIFOLD node ${nodeDto.nodeId}`,
            traceId,
            'handleManifoldNode',
            LogStreamLevel.DebugHeavy,
          );

          waveDto.waveStatus = 'FailedWithError';
          waveDto.executionEndDate = new Date();
          await this.waveRepository.save(waveDto);
          return; // Stop execution as a failure occurred
        }

        const targetNode = await this.nodeRepository.findOne({
          where: { nodeId: nodeExit.targetNodeId, isDeleted: false },
          relations: [
            'nodeType',
            'nodeExits',
            'nodeExits.nodeExitType',
            'manifold',
            'manifold.filters',
            'manifold.filters.nodeExit',
            'manifold.filters.filterSubsets',
            'manifold.filters.filterSubsets.filterSubsetItems',
            'manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable',
            'manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable.evaluationVariableDataType',
            'manifold.filters.filterSubsets.filterSubsetItems.evaluationOperator',
            'action',
            'action.actionVariables',
          ],
        });

        if (targetNode) {
          await this.executeNode(
            targetNode,
            waveDto,
            { ...currentTaskDto, isExecutedFromId: nodeExit.nodeExitId },
            branchContext,
            traceId,
          );

          // Verify if the wave is still in execution after executing the node
          const updatedWave = await this.waveRepository.findOne({
            where: { waveId: waveDto.waveId, isDeleted: false },
          });

          if (!updatedWave || updatedWave.waveStatus !== 'InExecution') {
            this.logger.error(
              `Wave (${waveDto.waveId}) is no longer in execution after executing node (${targetNode.nodeId}). Current status: ${updatedWave?.waveStatus}`,
              traceId,
              'handleManifoldNode',
              LogStreamLevel.DebugHeavy,
            );
            return; // Stop execution as the wave is no longer in execution
          }
        } else {
          // If no valid target node found, fail the wave execution
          this.logger.error(
            `Target node not found for MANIFOLD nodeExit with targetNodeId=${nodeExit.targetNodeId}`,
            traceId,
            'handleManifoldNode',
            LogStreamLevel.DebugHeavy,
          );

          waveDto.waveStatus = 'FailedWithError';
          waveDto.executionEndDate = new Date();
          await this.waveRepository.save(waveDto);
          return; // Stop execution as a failure occurred
        }

        if (manifold.executionStyle === 'STOP ON HIT') {
          break;
        }
      }

      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsCompleted(
          currentTaskDto,
          waveContext,
          traceId,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error in handleManifoldNode: ${error.message}`,
        traceId,
        'handleManifoldNode',
        LogStreamLevel.DebugHeavy,
      );

      // Ensure wave status is marked as failed in case of unexpected error
      waveDto.waveStatus = 'FailedWithError';
      waveDto.executionEndDate = new Date();
      await this.waveRepository.save(waveDto);
    }
  }

  private async handleStopNode(
    nodeDto: NodeDto,
    waveDto: WaveDto,
    currentTaskDto: TaskDto | null,
    waveContext: any,
    traceId: string,
  ): Promise<void> {
    try {
      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsInProgress(
          currentTaskDto,
          traceId,
        );
      }

      // Verify that wave is still in execution before proceeding
      const latestWave = await this.waveRepository.findOne({
        where: { waveId: waveDto.waveId, isDeleted: false },
      });

      if (!latestWave || latestWave.waveStatus !== 'InExecution') {
        this.logger.error(
          `Wave (${waveDto.waveId}) is not in execution. Current status: ${latestWave?.waveStatus}`,
          traceId,
          'handleStopNode',
          LogStreamLevel.DebugHeavy,
        );
        return;
      }

      // Placeholder for STOP logic
      this.logger.info(
        `Executing STOP node (${nodeDto.nodeId}) for wave (${waveDto.waveId}).`,
        traceId,
        'handleStopNode',
        LogStreamLevel.ProdStandard,
      );

      // No further execution required for STOP node

      if (currentTaskDto) {
        currentTaskDto = await this.taskHandlerService.markTaskAsCompleted(
          currentTaskDto,
          waveContext,
          traceId,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error in handleStopNode: ${error.message}`,
        traceId,
        'handleStopNode',
        LogStreamLevel.DebugHeavy,
      );

      // Ensure wave status is marked as failed in case of unexpected error
      waveDto.waveStatus = 'FailedWithError';
      waveDto.executionEndDate = new Date();
      await this.waveRepository.save(waveDto);
    }
  }
}
