import { randomInt } from 'crypto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Flow } from '../../../entities/flow.entity';
import { Node } from '../../../entities/node.entity';
import { NodeExit } from '../../../entities/node-exit.entity';
import { Filter } from '../../../entities/filter.entity';
import { FilterSubset } from '../../../entities/filter-subset.entity';
import { FilterSubsetItem } from '../../../entities/filter-subset-item.entity';
import { Manifold } from '../../../entities/manifold.entity';
import { EvaluationVariableDataType } from '../../../entities/evaluation-variable-data-type.entity';
import { NodeType } from '../../../entities/node-type.entity';

import {
  CloneFlowDto,
  CreateFlowDto,
  DeleteFlowDto,
  FlowDto,
  FuzzySearchFlowsDto,
  GetManyFlowsDto,
  GetOneFlowDto,
  PaginatedFlowsResponseDto,
  UpdateFlowDto,
  UpdatePublishStatusFlowDto,
} from 'ez-utils';
import { NodeService } from '../../node/services/node.service';
import { ZtrackingFlowService } from './ztracking-flow.service';

@Injectable()
export class FlowService {
  private logger = getLoggerConfig(FlowService.name);

  constructor(
    @InjectRepository(Flow)
    private readonly flowRepository: Repository<Flow>,
    @InjectRepository(NodeType)
    private readonly nodeTypeRepository: Repository<NodeType>,
    private readonly nodeService: NodeService,
    private readonly ztrackingFlowService: ZtrackingFlowService,
  ) {
    this.logger.debug(
      `${FlowService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createFlow(
    createFlowDto: CreateFlowDto,
    traceId: string,
  ): Promise<FlowDto> {
    const createdFlow = await this.flowRepository.save(
      this.flowRepository.create(createFlowDto),
    );

    this.logger.info(
      `Flow created with ID: ${createdFlow.flowId}`,
      traceId,
      'createFlow',
      LogStreamLevel.ProdStandard,
    );

    // Get START and STOP node types
    const startNodeType = await this.nodeTypeRepository.findOne({
      where: { name: 'START' },
    });
    const stopNodeType = await this.nodeTypeRepository.findOne({
      where: { name: 'STOP' },
    });

    if (!startNodeType || !stopNodeType) {
      this.logger.error(
        `START or STOP node types are missing from the database.`,
        traceId,
        'createFlow',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        'START or STOP node types are missing from the database.',
      );
    }

    // Create START node
    const startNode = await this.nodeService.createNode(
      {
        flowId: createdFlow.flowId,
        nodeTypeId: startNodeType.nodeTypeId,
        name: 'Start',
        updatedBy: createFlowDto.updatedBy,
        positionX: 100,
        positionY: 250,
      },
      traceId,
    );

    // Create STOP node
    const stopNode = await this.nodeService.createNode(
      {
        flowId: createdFlow.flowId,
        nodeTypeId: stopNodeType.nodeTypeId,
        name: 'Stop',
        updatedBy: createFlowDto.updatedBy,
        positionX: 900,
        positionY: 250,
      },
      traceId,
    );

    this.logger.info(
      `Start and Stop nodes created for Flow ID: ${createdFlow.flowId}`,
      traceId,
      'createFlow',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFlowService.createZtrackingForFlow(
        createdFlow,
        traceId,
      )
    ) {
      return createdFlow;
    }
  }

  async updateFlow(
    updateFlowDto: UpdateFlowDto,
    traceId: string,
  ): Promise<FlowDto> {
    const flow = await this.flowRepository.findOne({
      where: { flowId: updateFlowDto.flowId },
    });

    if (!flow) {
      this.logger.error(
        `No Flow found with ID: ${updateFlowDto.flowId}`,
        traceId,
        'updateFlow',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Flow found with ID: ${updateFlowDto.flowId}`,
      );
    }

    // If the flow is published, restrict updates to only 'name' and 'description'
    if (flow.isPublished) {
      const allowedFields = ['name', 'description'];
      const updateKeys = Object.keys(updateFlowDto);

      // Check if any of the update keys are not allowed
      const invalidFields = updateKeys.filter(
        (key) => !allowedFields.includes(key) && key !== 'flowId',
      );

      if (invalidFields.length > 0) {
        this.logger.error(
          `Cannot update fields [${invalidFields.join(', ')}] on a published flow.`,
          traceId,
          'updateFlow',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `Cannot update fields [${invalidFields.join(', ')}] on a published flow.`,
        );
      }
    }

    const updatedFlow = await this.flowRepository.save({
      ...flow,
      ...updateFlowDto,
    });

    this.logger.info(
      `Flow with ID: ${updatedFlow.flowId} updated`,
      traceId,
      'updateFlow',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFlowService.createZtrackingForFlow(
        updatedFlow,
        traceId,
      )
    )
      return updatedFlow;
  }

  async updatePublishStatusFlow(
    updatePublishStatusDto: UpdatePublishStatusFlowDto,
    traceId: string,
  ): Promise<FlowDto> {
    const { flowId, isPublished } = updatePublishStatusDto;

    const flow = await this.flowRepository.findOne({
      where: { flowId },
    });

    if (!flow) {
      this.logger.error(
        `No Flow found with ID: ${flowId}`,
        traceId,
        'updatePublishStatusFlow',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Flow found with ID: ${flowId}`);
    }

    flow.isPublished = isPublished;

    if (isPublished) {
      const flowWithRelations = await this.flowRepository.findOne({
        where: { flowId },
        relations: [
          'nodes',
          'nodes.manifold',
          'nodes.manifold.filters',
          'nodes.manifold.filters.filterSubsets',
          'nodes.manifold.filters.filterSubsets.filterSubsetItems',
          'nodes.manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable',
          'nodes.manifold.filters.filterSubsets.filterSubsetItems.evaluationVariable.evaluationVariableDataType',
          'nodes.manifold.filters.filterSubsets.filterSubsetItems.evaluationOperator',
          'nodes.action',
          'nodes.action.actionVariables',
        ],
      });

      // Build JSON containing variables and operators
      const variablesObject = this.buildFlowVariablesObject(flowWithRelations);

      // Store JSON in flow.variables
      flow.variables = JSON.stringify(variablesObject);
    } else {
      // Optionally clear variables when unpublishing
      flow.variables = null;
    }

    const updatedFlow = await this.flowRepository.save(flow);

    this.logger.info(
      `Flow with ID: ${flowId} publish status updated to ${isPublished}`,
      traceId,
      'updatePublishStatusFlow',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFlowService.createZtrackingForFlow(
        updatedFlow,
        traceId,
      )
    )
      return updatedFlow;
  }

  async deleteFlow(
    { flowId = '', updatedBy = null }: DeleteFlowDto,
    traceId: string,
  ): Promise<FlowDto> {
    if (!flowId) {
      this.logger.error(
        'You need to provide flowId',
        traceId,
        'deleteFlow',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('You need to provide flowId');
    }

    // Start a transaction to ensure all updates are atomic
    const queryRunner =
      this.flowRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // 1) Find the Flow (must be active)
      const flow = await this.flowRepository.findOne({
        where: { flowId, isDeleted: false },
        relations: ['nodes', 'nodes.nodeExits'],
      });

      if (!flow) {
        this.logger.error(
          `No Active Flow found with ID: ${flowId}`,
          traceId,
          'deleteFlow',
          LogStreamLevel.DebugHeavy,
        );
        throw new NotFoundException(`No Active Flow found with ID: ${flowId}`);
      }

      // 2) Mark Flow as Deleted
      flow.isDeleted = true;
      flow.updatedBy = updatedBy;
      await queryRunner.manager.save(flow);

      // 3) Mark all Nodes under this Flow as Deleted
      if (flow.nodes.length > 0) {
        for (const node of flow.nodes) {
          node.isDeleted = true;
          node.updatedBy = updatedBy;
          await queryRunner.manager.save(node);

          // 4) Mark all NodeExits for each Node as Deleted
          if (node.nodeExits.length > 0) {
            for (const nodeExit of node.nodeExits) {
              nodeExit.isDeleted = true;
              nodeExit.updatedBy = updatedBy;
              await queryRunner.manager.save(nodeExit);
            }
          }
        }
      }

      // Commit transaction
      await queryRunner.commitTransaction();

      this.logger.info(
        `Flow with ID: ${flowId} marked as deleted along with its nodes and nodeExits`,
        traceId,
        'deleteFlow',
        LogStreamLevel.ProdStandard,
      );

      // Reload flow to return with updated values
      const deletedFlow = await this.flowRepository.findOne({
        where: { flowId },
        relations: [
          'nodes',
          'nodes.nodeType',
          'nodes.nodeExits',
          'nodes.nodeExits.nodeExitType',
        ],
      });

      if (!deletedFlow) {
        this.logger.error(
          `Flow with ID: ${flowId} not found after deletion.`,
          traceId,
          'deleteFlow',
          LogStreamLevel.DebugHeavy,
        );
        throw new NotFoundException(
          `Flow with ID: ${flowId} not found after deletion.`,
        );
      }

      // Track changes
      if (
        await this.ztrackingFlowService.createZtrackingForFlow(
          deletedFlow,
          traceId,
        )
      ) {
        return deletedFlow;
      }
    } catch (error) {
      // Rollback transaction if an error occurs
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Error deleting flow: ${error.message}`,
        traceId,
        'deleteFlow',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getOneFlow(
    {
      flowId = '',
      name = '',
      isDeleted = false,
      filterDeletedNodes = true,
    }: GetOneFlowDto,
    traceId: string,
  ): Promise<FlowDto> {
    if (!flowId && !name) {
      this.logger.error(
        'Either provide flowId or name',
        traceId,
        'getOneFlow',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Either provide flowId or name');
    }

    const where: FindOptionsWhere<Flow> = {};
    if (name) where.name = name;
    if (flowId) where.flowId = flowId;
    where.isDeleted = isDeleted;

    const query = this.flowRepository
      .createQueryBuilder('flow')
      .leftJoinAndSelect(
        'flow.nodes',
        'node',
        filterDeletedNodes ? 'node.isDeleted = :nodeIsDeleted' : undefined,
        filterDeletedNodes ? { nodeIsDeleted: false } : {},
      )
      .leftJoinAndSelect('node.nodeType', 'nodeType')
      .leftJoinAndSelect('node.incomingExits', 'incomingExits')
      .leftJoinAndSelect('node.nodeExits', 'nodeExits')
      .leftJoinAndSelect('node.action', 'action')
      .leftJoinAndSelect('incomingExits.nodeExitType', 'incomingExitsType')
      .leftJoinAndSelect('nodeExits.nodeExitType', 'nodeExitsType')
      .where(where);

    const flow = await query.getOne();

    if (!flow) {
      this.logger.error(
        `No Flow found with ID: ${flowId} or name: ${name}`,
        traceId,
        'getOneFlow',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Flow found with ID: ${flowId} or name: ${name}`,
      );
    }

    // For thinking
    if (filterDeletedNodes) {
      flow.nodes = flow.nodes?.filter((node) => !node.isDeleted) || [];
    }

    this.logger.info(
      `Flow found with ID: ${flow.flowId}`,
      traceId,
      'getOneFlow',
      LogStreamLevel.ProdStandard,
    );

    return flow;
  }

  async getManyFlows(
    getManyFlowsDto: GetManyFlowsDto,
    traceId: string,
  ): Promise<PaginatedFlowsResponseDto> {
    const {
      isDeleted,
      isPublished,
      waveTypeId,
      name,
      description,
      updatedBy,
      pagination,
      sort = [],
    } = getManyFlowsDto;

    // 1) Construct the base WHERE conditions
    const where: Record<string, any> = {
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(typeof isPublished === 'boolean' && { isPublished }),
      ...(waveTypeId && { waveTypeId }),
      ...(name && { name }),
      ...(description && { description }),
      ...(updatedBy && { updatedBy }),
    };

    // 2) Build base query
    let query = this.flowRepository.createQueryBuilder('flow').where(where);

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        if (index === 0) {
          query = query.orderBy(`flow.${s.by}`, s.order);
        } else {
          query = query.addOrderBy(`flow.${s.by}`, s.order);
        }
      });
    } else {
      // Default sorting if none provided
      query = query.orderBy('flow.createdAt', 'ASC');
    }

    // 4) Get total count (for pagination calculation)
    const totalCount = await query.getCount();

    // 5) Apply pagination if pagination is defined (not null)
    let isPaginated = false;
    let maxPages: number | null = null;
    let currentPage: number | null = null;
    let usedPageSize: number | null = null;

    if (pagination) {
      isPaginated = true;
      const { page = 1, pageSize = 25 } = pagination;

      const skip = (page - 1) * pageSize;
      query = query.skip(skip).take(pageSize);

      maxPages = Math.ceil(totalCount / pageSize);
      currentPage = page;
      usedPageSize = pageSize;
    }

    // 6) Execute query
    const flows = await query.getMany();

    this.logger.info(
      `${flows.length} Flows found in the database`,
      traceId,
      'getManyFlows',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: flows,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  async cloneFlow(
    cloneFlowDto: CloneFlowDto,
    traceId: string,
  ): Promise<FlowDto> {
    return await this.flowRepository.manager.transaction(async (manager) => {
      const { flowId } = cloneFlowDto;

      // Repositories within the transaction
      const flowRepo = manager.getRepository(Flow);
      const nodeRepo = manager.getRepository(Node);
      const nodeExitRepo = manager.getRepository(NodeExit);
      const manifoldRepo = manager.getRepository(Manifold);
      const filterRepo = manager.getRepository(Filter);
      const filterSubsetRepo = manager.getRepository(FilterSubset);
      const filterSubsetItemRepo = manager.getRepository(FilterSubsetItem);

      // Step 1: Retrieve original flow with active (isDeleted: false) relations
      const originalFlow = await flowRepo.findOne({
        where: { flowId },
        relations: [
          'nodes',
          'nodes.nodeExits',
          'nodes.incomingExits',
          'nodes.manifold',
          'nodes.manifold.filters',
          'nodes.manifold.filters.filterSubsets',
          'nodes.manifold.filters.filterSubsets.filterSubsetItems',
        ],
      });

      if (!originalFlow) {
        this.logger.error(
          `No Flow found with ID: ${flowId}`,
          traceId,
          'cloneFlow',
          LogStreamLevel.DebugHeavy,
        );
        throw new NotFoundException(`No Flow found with ID: ${flowId}`);
      }

      const copyRandomID = randomInt(0, 999999).toString().padStart(6, '0');

      // Step 2: Create and save new flow entity
      const newFlow = flowRepo.create({
        name: `${originalFlow.name} (COPY-${copyRandomID})`,
        description: originalFlow.description,
        waveTypeId: originalFlow.waveTypeId,
        businessUnitId: originalFlow.businessUnitId,
        updatedBy: originalFlow.updatedBy,
        isPublished: false,
      });

      const savedFlow = await flowRepo.save(newFlow);

      // Step 3: Maps to track old → new IDs
      const nodeIdMap = new Map<string, string>();
      const nodeExitIdMap = new Map<string, string>();
      const manifoldIdMap = new Map<string, string>();

      // Step 4: Clone active Nodes
      for (const oldNode of originalFlow.nodes.filter(
        (node) => !node.isDeleted,
      )) {
        const { manifold, nodeExits, incomingExits, ...nodeData } = oldNode;

        const newNode = nodeRepo.create({
          ...nodeData,
          nodeId: undefined,
          flowId: savedFlow.flowId,
          manifoldId: null, // Will be updated after manifold cloning
          actionId: null, // Will be updated after action cloning
          updatedBy: oldNode.updatedBy,
        });

        const savedNode = await nodeRepo.save(newNode);
        nodeIdMap.set(oldNode.nodeId, savedNode.nodeId);
      }

      // Step 5: Clone active NodeExits (BEFORE Filters)
      for (const oldNode of originalFlow.nodes.filter(
        (node) => !node.isDeleted,
      )) {
        for (const oldNodeExit of oldNode.nodeExits.filter(
          (exit) => !exit.isDeleted,
        )) {
          const newSourceNodeId = nodeIdMap.get(oldNodeExit.sourceNodeId);
          const newTargetNodeId = nodeIdMap.get(oldNodeExit.targetNodeId);

          const newNodeExit = nodeExitRepo.create({
            ...oldNodeExit,
            nodeExitId: undefined,
            filterId: undefined, // Will be updated after filters are cloned
            sourceNodeId: newSourceNodeId,
            targetNodeId: newTargetNodeId,
            updatedBy: oldNodeExit.updatedBy,
          });

          const savedNodeExit = await nodeExitRepo.save(newNodeExit);
          nodeExitIdMap.set(oldNodeExit.nodeExitId, savedNodeExit.nodeExitId);
        }
      }

      // Step 6: Clone active Manifolds and update their related Nodes
      for (const oldNode of originalFlow.nodes.filter(
        (node) => !node.isDeleted,
      )) {
        if (oldNode.manifold && !oldNode.manifold.isDeleted) {
          const oldManifold = oldNode.manifold;
          const { filters, ...manifoldData } = oldManifold;

          const newManifold = manifoldRepo.create({
            ...manifoldData,
            manifoldId: undefined,
            nodeId: nodeIdMap.get(oldNode.nodeId),
            updatedBy: manifoldData.updatedBy,
          });

          const savedManifold = await manifoldRepo.save(newManifold);
          manifoldIdMap.set(manifoldData.manifoldId, savedManifold.manifoldId);

          // Update the related node to reference new manifold
          const nodeToUpdate = await nodeRepo.findOne({
            where: { nodeId: savedManifold.nodeId },
          });
          if (!nodeToUpdate) {
            this.logger.error(
              `No node found with ID: ${savedManifold.nodeId} for updating manifold reference.`,
              traceId,
              'cloneFlow',
              LogStreamLevel.DebugHeavy,
            );
            throw new Error(
              'Error updating cloned node with new manifold reference.',
            );
          }
          nodeToUpdate.manifold = savedManifold;
          await nodeRepo.save(nodeToUpdate);
        }
      }

      // Step 7: Clone active Filters and update related NodeExits
      for (const oldNode of originalFlow.nodes.filter(
        (node) => !node.isDeleted,
      )) {
        if (oldNode.manifold && !oldNode.manifold.isDeleted) {
          for (const oldFilter of oldNode.manifold.filters.filter(
            (filter) => !filter.isDeleted,
          )) {
            const { filterSubsets, ...filterData } = oldFilter;

            const newFilter = filterRepo.create({
              ...filterData,
              filterId: undefined,
              manifoldId: manifoldIdMap.get(oldFilter.manifoldId),
              nodeExitId: nodeExitIdMap.get(oldFilter.nodeExitId) || null, // Ensure correct nodeExit link
              updatedBy: oldFilter.updatedBy,
            });

            const savedFilter = await filterRepo.save(newFilter);

            // Update the related NodeExit to reference new Filter
            if (savedFilter.nodeExitId) {
              const nodeExitToUpdate = await nodeExitRepo.findOne({
                where: { nodeExitId: savedFilter.nodeExitId },
              });

              if (nodeExitToUpdate) {
                nodeExitToUpdate.filter = savedFilter;
                await nodeExitRepo.save(nodeExitToUpdate);
              }
            }

            // Step 8: Clone active FilterSubsets
            for (const oldFilterSubset of filterSubsets.filter(
              (subset) => !subset.isDeleted,
            )) {
              const { filterSubsetItems, ...subsetData } = oldFilterSubset;

              const newFilterSubset = filterSubsetRepo.create({
                ...subsetData,
                filterSubsetId: undefined,
                filterId: savedFilter.filterId,
                updatedBy: oldFilterSubset.updatedBy,
              });

              const savedFilterSubset =
                await filterSubsetRepo.save(newFilterSubset);

              // Step 9: Clone active FilterSubsetItems
              for (const oldFilterSubsetItem of filterSubsetItems.filter(
                (item) => !item.isDeleted,
              )) {
                const newFilterSubsetItem = filterSubsetItemRepo.create({
                  ...oldFilterSubsetItem,
                  filterSubsetItemId: undefined,
                  filterSubsetId: savedFilterSubset.filterSubsetId,
                  updatedBy: oldFilterSubsetItem.updatedBy,
                });

                await filterSubsetItemRepo.save(newFilterSubsetItem);
              }
            }
          }
        }
      }

      // Step 10: Track changes in ztracking
      await this.ztrackingFlowService.createZtrackingForFlow(
        savedFlow,
        traceId,
      );

      this.logger.info(
        `Flow cloned with new ID: ${savedFlow.flowId}`,
        traceId,
        'cloneFlow',
        LogStreamLevel.ProdStandard,
      );

      // Step 11: Return cloned flow with its relations
      const clonedFlow = await flowRepo.findOne({
        where: { flowId: savedFlow.flowId },
        relations: [
          'nodes',
          'nodes.nodeExits',
          'nodes.incomingExits',
          'nodes.incomingExits.nodeExitType',
          'nodes.nodeExits.nodeExitType',
        ],
      });

      if (!clonedFlow) {
        this.logger.error(
          `Cloned flow with ID ${savedFlow.flowId} not found after cloning.`,
          traceId,
          'cloneFlow',
          LogStreamLevel.DebugHeavy,
        );
        throw new Error(`Cloned flow with ID ${savedFlow.flowId} not found.`);
      }

      return clonedFlow;
    });
  }

  async fuzzySearchFlows(
    fuzzySearchFlowsDto: FuzzySearchFlowsDto,
    traceId: string,
  ): Promise<PaginatedFlowsResponseDto> {
    const {
      fuzzyName,
      fuzzyDescription,
      fuzzyUpdatedBy,
      name,
      description,
      updatedBy,
      waveTypeId,
      isDeleted,
      isPublished,
      pagination,
      sort = [],
    } = fuzzySearchFlowsDto;

    // 1) Build base query
    let query = this.flowRepository
      .createQueryBuilder('flow')
      .leftJoin('flow.waveType', 'waveType');

    // 2) Apply filters only if at least one is provided
    const hasFilters =
      fuzzyName ||
      fuzzyDescription ||
      fuzzyUpdatedBy ||
      name ||
      description ||
      updatedBy ||
      waveTypeId ||
      typeof isDeleted === 'boolean' ||
      typeof isPublished === 'boolean';

    if (hasFilters) {
      query.where('1 = 1'); // Ensures `AND` conditions can be appended dynamically

      // **Fuzzy Search (Priority)**
      if (fuzzyName) {
        query.andWhere('flow.name ILIKE :fuzzyName', {
          fuzzyName: `%${fuzzyName}%`,
        });
      } else if (name) {
        query.andWhere('flow.name = :name', { name });
      }

      if (fuzzyDescription) {
        query.andWhere('flow.description ILIKE :fuzzyDescription', {
          fuzzyDescription: `%${fuzzyDescription}%`,
        });
      } else if (description) {
        query.andWhere('flow.description = :description', { description });
      }

      if (fuzzyUpdatedBy) {
        query.andWhere('CAST(flow.updatedBy AS text) ILIKE :fuzzyUpdatedBy', {
          fuzzyUpdatedBy: `%${fuzzyUpdatedBy}%`,
        });
      } else if (updatedBy) {
        query.andWhere('flow.updatedBy = :updatedBy', { updatedBy });
      }

      // **Exact Filters**
      if (waveTypeId) {
        query.andWhere('waveType.waveTypeId = :waveTypeId', { waveTypeId });
      }
      if (typeof isDeleted === 'boolean') {
        query.andWhere('flow.isDeleted = :isDeleted', { isDeleted });
      }
      if (typeof isPublished === 'boolean') {
        query.andWhere('flow.isPublished = :isPublished', { isPublished });
      }
    }

    // 3) Apply Sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        if (index === 0) {
          query = query.orderBy(`flow.${s.by}`, s.order);
        } else {
          query = query.addOrderBy(`flow.${s.by}`, s.order);
        }
      });
    } else {
      query = query.orderBy('flow.createdAt', 'ASC'); // Default sorting
    }

    // 4) Get total count (for pagination calculation)
    const totalCount = await query.getCount();

    // 5) Apply Pagination if defined
    let isPaginated = false;
    let maxPages: number | null = null;
    let currentPage: number | null = null;
    let usedPageSize: number | null = null;

    if (pagination) {
      isPaginated = true;
      const { page = 1, pageSize = 25 } = pagination;

      const skip = (page - 1) * pageSize;
      query = query.skip(skip).take(pageSize);

      maxPages = Math.ceil(totalCount / pageSize);
      currentPage = page;
      usedPageSize = pageSize;
    }

    // 6) Execute query
    const flows = await query.getMany();

    this.logger.info(
      `${flows.length} Flow(s) found matching search criteria`,
      traceId,
      'fuzzySearchFlows',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: flows,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  private buildFlowVariablesObject(flowDto: FlowDto): any {
    if (!flowDto) {
      return {};
    }

    return {
      flowId: flowDto.flowId,
      nodes: flowDto.nodes?.map((node) => ({
        nodeId: node.nodeId,
        action: node.action
          ? {
              actionId: node.action.actionId,
              name: node.action.name,
              actionVariables: node.action.actionVariables?.map(
                (actionVar) => ({
                  actionVariableId: actionVar.actionVariableId,
                  name: actionVar.name,
                }),
              ),
            }
          : null,
        manifold: node.manifold
          ? {
              manifoldId: node.manifold.manifoldId,
              filters: node.manifold.filters?.map((filter) => ({
                filterId: filter.filterId,
                filterSubsets: filter.filterSubsets?.map((subset) => ({
                  filterSubsetId: subset.filterSubsetId,
                  filterSubsetItems: subset.filterSubsetItems?.map((item) => ({
                    filterSubsetItemId: item.filterSubsetItemId,
                    evaluationVariable: item.evaluationVariable
                      ? {
                          evaluationVariableId:
                            item.evaluationVariable.evaluationVariableId,
                          name: item.evaluationVariable.name,
                          description: item.evaluationVariable.description,
                          evaluationVariableDataType: item.evaluationVariable
                            .evaluationVariableDataType
                            ? {
                                evaluationVariableDataTypeId:
                                  item.evaluationVariable
                                    .evaluationVariableDataType
                                    .evaluationVariableDataTypeId,
                                name: (
                                  item.evaluationVariable
                                    .evaluationVariableDataType as EvaluationVariableDataType
                                ).name,
                                description: (
                                  item.evaluationVariable
                                    .evaluationVariableDataType as EvaluationVariableDataType
                                ).description,
                              }
                            : null,
                        }
                      : null,
                    evaluationOperator: item.evaluationOperator
                      ? {
                          evaluationOperatorId:
                            item.evaluationOperator.evaluationOperatorId,
                          name: item.evaluationOperator.name,
                          symbol: item.evaluationOperator.symbol,
                          description: item.evaluationOperator.description,
                          choiceType: item.evaluationOperator.choiceType,
                        }
                      : null,
                  })),
                })),
              })),
            }
          : null,
      })),
    };
  }
}
