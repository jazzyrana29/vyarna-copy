import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Wave } from '../../../entities/wave.entity';
import { FlowIsActiveForWaveTypeAndBusinessUnit } from '../../../entities/flow-is-active-for-wave-type-and-business-unit.entity';
import { Flow } from '../../../entities/flow.entity';

import { WaveDto, ExecuteWaveDto } from 'ez-utils';

import { NodeHandlerService } from './wave-execution/node-handler.service';
import { FlowVariableValidatorService } from './wave-execution/flow-variable-validator.service';

@Injectable()
export class WaveExecutionService {
  private logger = getLoggerConfig(WaveExecutionService.name);

  constructor(
    @InjectRepository(Wave)
    private readonly waveRepository: Repository<Wave>,
    @InjectRepository(FlowIsActiveForWaveTypeAndBusinessUnit)
    private readonly flowIsActiveForWaveTypeAndBusinessUnitRepository: Repository<FlowIsActiveForWaveTypeAndBusinessUnit>,
    @InjectRepository(Flow)
    private readonly flowRepository: Repository<Flow>,
    private readonly nodeHandlerService: NodeHandlerService,
    private readonly flowVariableValidatorService: FlowVariableValidatorService,
  ) {
    this.logger.debug(
      `${WaveExecutionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  /**
   * Main entry point:
   * 1) Needs waveTypeId + businessUnitId => find active Flow
   * 2) Locate START node
   * 3) Create Wave (status=InExecution)
   * 4) executeNode(START node, wave, previousTask=null)
   */
  async executeWave(
    executeWaveDto: ExecuteWaveDto,
    traceId: string,
    createWaveMethod: (
      waveTypeId: string,
      flowId: string,
      traceId: string,
    ) => Promise<WaveDto>,
  ): Promise<WaveDto> {
    const { waveTypeId, businessUnitId, inputVariables } = executeWaveDto;

    this.logger.info(
      `Executing wave with WaveTypeId: ${waveTypeId} and BusinessUnitId: ${businessUnitId}`,
      traceId,
      'executeWave',
      LogStreamLevel.ProdStandard,
    );

    // Step 1: Find active flow relation
    const activeFlowRelation =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.findOne({
        where: { waveTypeId, businessUnitId, isDeleted: false },
      });
    if (!activeFlowRelation || !activeFlowRelation.activeFlowId) {
      this.logger.error(
        `No active flow found for waveType=${waveTypeId}, businessUnit=${businessUnitId}`,
        traceId,
        'executeWave',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(
        `No active flow found for waveType=${waveTypeId}, businessUnit=${businessUnitId}`,
      );
    }

    this.logger.info(
      `Active flow found: ${activeFlowRelation.activeFlowId} for waveType=${waveTypeId}, businessUnit=${businessUnitId}`,
      traceId,
      'executeWave',
      LogStreamLevel.ProdStandard,
    );

    const flowId = activeFlowRelation.activeFlowId;

    // Step 1: Load that Flow entity (with nodes)
    const flow = await this.flowRepository.findOne({
      where: { flowId, isDeleted: false },
      relations: [
        'waveType',
        'nodes',
        'nodes.nodeType',
        'nodes.nodeExits',
        'nodes.nodeExits.nodeExitType',
        'nodes.action',
        'nodes.action.actionVariables',
        'nodes.manifold',
        'nodes.manifold.filters',
        'nodes.manifold.filters.nodeExit',
        'nodes.manifold.filters.filterSubsets',
        'nodes.manifold.filters.filterSubsets.filterSubsetItems',
        'nodes.manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable',
        'nodes.manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable.evaluationVariableDataType',
        'nodes.manifold.filters.filterSubsets.filterSubsetItems.evaluationOperator',
      ],
    });
    if (!flow) {
      this.logger.error(
        `Flow not found: ${flowId}`,
        traceId,
        'executeWave',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(`Flow not found: ${flowId}`);
    }

    if (!flow.isPublished) {
      this.logger.error(
        `Flow ${flow.flowId} is not published.`,
        traceId,
        'executeWave',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(`Flow ${flow.flowId} is not published.`);
    }

    // Validate inputs against flow.waveType.inputSchema
    this.flowVariableValidatorService.validateInputVariables(
      flow.waveType,
      inputVariables,
      traceId,
    );

    // Step 2.1: Find the START node
    const startNode = flow.nodes?.find(
      (n) => n.nodeType?.name?.toUpperCase() === 'START',
    );
    if (!startNode) {
      this.logger.error(
        `No START node found in flow: ${flow.flowId}`,
        traceId,
        'executeWave',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(`No START node found in flow: ${flow.flowId}`);
    }

    this.logger.info(
      `Found START node with id: ${startNode.nodeId} - ${startNode.name} in flow: ${flow.flowId}`,
      traceId,
      'executeWave',
      LogStreamLevel.ProdStandard,
    );

    // Step 3: Create wave with status='InExecution'
    const wave = await createWaveMethod(flow.waveTypeId, flow.flowId, traceId);
    if (!wave) {
      this.logger.error(
        `Failed creating wave for waveType=${flow.waveTypeId}`,
        traceId,
        'executeWave',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(`Failed creating wave for waveType=${flow.waveTypeId}`);
    }

    this.logger.info(
      `Wave created successfully with id: ${wave.waveId} for waveType=${flow.waveTypeId} and flow: ${flow.flowId}`,
      traceId,
      'executeWave',
      LogStreamLevel.ProdStandard,
    );

    // Step 4: Prepare waveContext
    const waveContext = {
      inputVariables: inputVariables.reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
      }, {}),
      returnVariables: {},
    };

    // Step 5: Execute the START node
    await this.nodeHandlerService.executeNode(
      startNode,
      wave,
      null,
      waveContext,
      traceId,
    );

    // Reload wave or perform final checks
    const updatedWave = await this.waveRepository.findOne({
      where: { waveId: wave.waveId, isDeleted: false },
      relations: [
        'executionFlow',
        'waveType',
        'tasks',
        'tasks.taskStatus',
        'tasks.node',
        'tasks.node.nodeType',
        'tasks.isExecutedFrom',
        'tasks.isExecutedFrom.nodeExitType',
      ],
    });
    if (!updatedWave) {
      this.logger.error(
        `Wave not found after execution: ${wave.waveId}`,
        traceId,
        'executeWave',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(`Wave not found after execution: ${wave.waveId}`);
    }

    return updatedWave;
  }
}
