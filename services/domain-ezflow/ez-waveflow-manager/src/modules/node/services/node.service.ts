import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Node } from '../../../entities/node.entity';
import { Flow } from '../../../entities/flow.entity';
import { NodeType } from '../../../entities/node-type.entity';
import { NodeExit } from '../../../entities/node-exit.entity';
import { NodeExitType } from '../../../entities/node-exit-type.entity';

import {
  CreateActionDto,
  CreateManifoldDto,
  CreateNodeDto,
  DeleteNodeDto,
  FuzzySearchNodesDto,
  GetOneNodeDto,
  NodeDto,
  PaginatedNodesResponseDto,
  UpdateNodeDto,
} from 'ez-utils';

import { ZtrackingNodeService } from './ztracking-node.service';
import { ActionService } from '../../../modules/action/services/action.service';
import { ManifoldService } from '../../../modules/manifold/services/manifold.service';

@Injectable()
export class NodeService {
  private logger = getLoggerConfig(NodeService.name);

  constructor(
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    @InjectRepository(Flow)
    private readonly flowRepository: Repository<Flow>,
    @InjectRepository(NodeType)
    private readonly nodeTypeRepository: Repository<NodeType>,
    @InjectRepository(NodeExit)
    private readonly nodeExitRepository: Repository<NodeExit>,
    @InjectRepository(NodeExitType)
    private readonly nodeExitTypeRepository: Repository<NodeExitType>,
    private readonly manifoldService: ManifoldService,
    private readonly actionService: ActionService,
    private readonly ztrackingNodeService: ZtrackingNodeService,
  ) {
    this.logger.debug(
      `${NodeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createNode(
    createNodeDto: CreateNodeDto,
    traceId: string,
  ): Promise<NodeDto> {
    const flow = await this.flowRepository.findOne({
      where: { flowId: createNodeDto.flowId },
    });
    if (!flow) {
      this.logger.error(
        `No Flow found with ID: ${createNodeDto.flowId}`,
        traceId,
        'createNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Flow found with ID: ${createNodeDto.flowId}`,
      );
    }

    if (flow.isPublished) {
      this.logger.error(
        `Cannot add node to a published flow. Flow ID: ${flow.flowId}`,
        traceId,
        'createNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Cannot add node to a published flow.');
    }

    const nodeType = await this.nodeTypeRepository.findOne({
      where: { nodeTypeId: createNodeDto.nodeTypeId },
    });
    if (!nodeType) {
      this.logger.error(
        `No NodeType found with ID: ${createNodeDto.nodeTypeId}`,
        traceId,
        'createNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No NodeType found with ID: ${createNodeDto.nodeTypeId}`,
      );
    }

    const createdNode = await this.nodeRepository.save(
      this.nodeRepository.create(createNodeDto),
    );

    this.logger.info(
      `Node created with ID: ${createdNode.nodeId}`,
      traceId,
      'createNode',
      LogStreamLevel.ProdStandard,
    );

    await this.createDefaultNodeExits(createdNode, nodeType, traceId);
    if (nodeType.name.toUpperCase() === 'MANIFOLD') {
      const createManifoldDto: CreateManifoldDto = {
        name: createdNode.name,
        description: '',
        executionStyle: 'RUN All',
        nodeId: createdNode.nodeId,
      };
      await this.manifoldService.createManifold(createManifoldDto, traceId);
    }

    if (nodeType.name.toUpperCase() === 'ACTION') {
      const actionPayload = createNodeDto.actionPayload || {};
      const createActionDto: CreateActionDto = {
        ...actionPayload,
        name: createdNode.name,
        description: actionPayload?.description || '',
        updatedBy: createdNode.updatedBy || null,
        actionType: createNodeDto.actionType || null,
        nodeId: createdNode.nodeId,
      };
      await this.actionService.createAction(createActionDto, traceId);
    }

    const nodeWithExits = await this.nodeRepository.findOne({
      where: { nodeId: createdNode.nodeId },
      relations: [
        'nodeType',
        'nodeExits',
        'nodeExits.nodeExitType',
        'manifold',
        'action',
        'action.actionVariables',
      ],
    });

    // Track changes
    if (
      await this.ztrackingNodeService.createZtrackingForNode(
        createdNode,
        traceId,
      )
    )
      return nodeWithExits;
  }

  private async createDefaultNodeExits(
    node: Node,
    nodeType: NodeType,
    traceId: string,
  ) {
    const executedType = await this.nodeExitTypeRepository.findOne({
      where: { name: 'EXECUTED' },
    });
    const errorType = await this.nodeExitTypeRepository.findOne({
      where: { name: 'ERROR' },
    });
    const stopType = await this.nodeExitTypeRepository.findOne({
      where: { name: 'STOP' },
    });

    if (!executedType || !errorType || !stopType) {
      this.logger.error(
        'Required NodeExitTypes (EXECUTED/ERROR/STOP) are missing from the DB.',
        traceId,
        'createDefaultNodeExits',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        'Required NodeExitTypes (EXECUTED/ERROR/STOP) are missing from the DB.',
      );
    }

    let exitsToCreate: Partial<NodeExit>[] = [];

    switch (nodeType.name.toUpperCase()) {
      case 'START':
        exitsToCreate = [
          {
            sourceNodeId: node.nodeId,
            nodeExitTypeId: executedType.nodeExitTypeId,
          },
        ];
        break;

      case 'ACTION':
        exitsToCreate = [
          {
            sourceNodeId: node.nodeId,
            nodeExitTypeId: executedType.nodeExitTypeId,
          },
          {
            sourceNodeId: node.nodeId,
            nodeExitTypeId: errorType.nodeExitTypeId,
          },
        ];
        break;

      case 'FLOW':
        exitsToCreate = [
          {
            sourceNodeId: node.nodeId,
            nodeExitTypeId: executedType.nodeExitTypeId,
          },
          {
            sourceNodeId: node.nodeId,
            nodeExitTypeId: stopType.nodeExitTypeId,
          },
        ];
        break;

      case 'FLOW RETURN':
      case 'STOP':
      case 'MANIFOLD':
      default:
        // 0 exits
        exitsToCreate = [];
        break;
    }

    if (exitsToCreate.length > 0) {
      const defaultExits = exitsToCreate.map((exit) =>
        this.nodeExitRepository.create(exit),
      );
      await this.nodeExitRepository.save(defaultExits);
    }
  }

  async updateNode(
    updateNodeDto: UpdateNodeDto,
    traceId: string,
  ): Promise<NodeDto> {
    const node = await this.nodeRepository.findOne({
      where: { nodeId: updateNodeDto.nodeId },
    });
    if (!node) {
      this.logger.error(
        `No Node found with ID: ${updateNodeDto.nodeId}`,
        traceId,
        'updateNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Node found with ID: ${updateNodeDto.nodeId}`,
      );
    }

    const flow = await this.flowRepository.findOne({
      where: { flowId: node.flowId },
    });
    if (!flow) {
      this.logger.error(
        `No Flow found with ID: ${node.flowId}`,
        traceId,
        'updateNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Flow found with ID: ${node.flowId}`);
    }
    if (flow.isPublished) {
      this.logger.error(
        `Cannot update node of a published flow. Flow ID: ${flow.flowId}`,
        traceId,
        'updateNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Cannot update node of a published flow.');
    }
    if (
      updateNodeDto.nodeTypeId &&
      updateNodeDto.nodeTypeId !== node.nodeTypeId
    ) {
      this.logger.error(
        `Cannot change node type once created. Node ID: ${node.nodeId}`,
        traceId,
        'updateNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Cannot change node type once created.');
    }

    const updatedNode = await this.nodeRepository.save({
      ...node,
      ...updateNodeDto,
    });

    this.logger.info(
      `Node with ID: ${updatedNode.nodeId} updated`,
      traceId,
      'updateNode',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingNodeService.createZtrackingForNode(
        updatedNode,
        traceId,
      )
    )
      return updatedNode;
  }

  async deleteNode(
    { nodeId = '', updatedBy = '' }: DeleteNodeDto,
    traceId: string,
  ): Promise<NodeDto> {
    if (!nodeId) {
      this.logger.error(
        'You need to provide nodeId',
        traceId,
        'deleteNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('You need to provide nodeId');
    }

    // Start a transaction to ensure atomic updates
    const queryRunner =
      this.nodeRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // 1) Find the Node (must be active)
      const node = await this.nodeRepository.findOne({
        where: { nodeId, isDeleted: false },
        relations: ['nodeExits', 'nodeExits.nodeExitType'],
      });

      if (!node) {
        this.logger.error(
          `No Active Node found with ID: ${nodeId}`,
          traceId,
          'deleteNode',
          LogStreamLevel.DebugHeavy,
        );
        throw new NotFoundException(`No Active Node found with ID: ${nodeId}`);
      }

      // 2) Fetch Flow to ensure it's not published
      const flow = await this.flowRepository.findOne({
        where: { flowId: node.flowId },
      });
      if (!flow) {
        this.logger.error(
          `No Flow found with ID: ${node.flowId}`,
          traceId,
          'deleteNode',
          LogStreamLevel.DebugHeavy,
        );
        throw new NotFoundException(`No Flow found with ID: ${node.flowId}`);
      }
      if (flow.isPublished) {
        this.logger.error(
          `Cannot delete node of a published flow. Flow ID: ${flow.flowId}`,
          traceId,
          'deleteNode',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          'Cannot delete node of a published flow.',
        );
      }

      // 3) Mark the Node as Deleted
      node.isDeleted = true;
      node.updatedBy = updatedBy;
      await queryRunner.manager.save(node);

      // 4) Mark all NodeExits related to this Node as Deleted
      if (node.nodeExits.length > 0) {
        for (const nodeExit of node.nodeExits) {
          nodeExit.isDeleted = true;
          nodeExit.updatedBy = updatedBy;
          await queryRunner.manager.save(nodeExit);
        }
      }

      // Commit transaction
      await queryRunner.commitTransaction();

      this.logger.info(
        `Node with ID: ${nodeId} and its NodeExits marked as deleted`,
        traceId,
        'deleteNode',
        LogStreamLevel.ProdStandard,
      );

      // Reload and return updated Node with its NodeExits
      const deletedNode = await this.nodeRepository.findOne({
        where: { nodeId },
        relations: ['nodeType', 'nodeExits', 'nodeExits.nodeExitType'],
      });

      if (!deletedNode) {
        this.logger.error(
          `Node with ID: ${nodeId} not found after deletion.`,
          traceId,
          'deleteNode',
          LogStreamLevel.DebugHeavy,
        );
        throw new NotFoundException(
          `Node with ID: ${nodeId} not found after deletion.`,
        );
      }

      // Track changes
      if (
        await this.ztrackingNodeService.createZtrackingForNode(
          deletedNode,
          traceId,
        )
      ) {
        return deletedNode;
      }
    } catch (error) {
      // Rollback transaction in case of error
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Error deleting node: ${error.message}`,
        traceId,
        'deleteNode',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getOneNode(
    { nodeId = '', name = '', isDeleted = false }: GetOneNodeDto,
    traceId: string,
  ): Promise<NodeDto> {
    if (!nodeId && !name) {
      this.logger.error(
        'Either provide nodeId or nodeName',
        traceId,
        'getOneNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Either provide nodeId or nodeName');
    }

    const where: FindOptionsWhere<Node> = {};
    if (name) where.name = name;
    if (nodeId) where.nodeId = nodeId;
    where.isDeleted = isDeleted;
    const node = await this.nodeRepository.findOne({
      where,
      relations: [
        'nodeType',
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
        'nodeExits',
        'incomingExits',
        'nodeExits.nodeExitType',
        'incomingExits.nodeExitType',
      ],
    });

    if (!node) {
      this.logger.error(
        `No Node found with ID: ${nodeId} or name: ${name}`,
        traceId,
        'getOneNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Node found with ID: ${nodeId} or name: ${name}`,
      );
    }

    this.logger.info(
      `Node found with ID: ${node.nodeId}`,
      traceId,
      'getOneNode',
      LogStreamLevel.ProdStandard,
    );

    return node;
  }

  async fuzzySearchNodes(
    fuzzySearchNodesDto: FuzzySearchNodesDto,
    traceId: string,
  ): Promise<PaginatedNodesResponseDto> {
    const {
      fuzzyName,
      fuzzyUpdatedBy,
      name,
      updatedBy,
      flowId,
      nodeTypeId,
      manifoldId,
      isDeleted,
      pagination,
      sort = [],
    } = fuzzySearchNodesDto;

    // 1) Build base query
    let query = this.nodeRepository
      .createQueryBuilder('node')
      .leftJoin('node.flow', 'flow')
      .leftJoin('node.nodeType', 'nodeType')
      .leftJoin('node.manifold', 'manifold');

    // 2) Apply filters only if at least one is provided
    const hasFilters =
      fuzzyName ||
      fuzzyUpdatedBy ||
      name ||
      updatedBy ||
      flowId ||
      nodeTypeId ||
      manifoldId ||
      typeof isDeleted === 'boolean';

    if (hasFilters) {
      // Ensures `AND` conditions can be appended dynamically
      query.where('1 = 1');

      // **Fuzzy Search (Priority)**
      if (fuzzyName) {
        query.andWhere('node.name ILIKE :fuzzyName', {
          fuzzyName: `%${fuzzyName}%`,
        });
      } else if (name) {
        query.andWhere('node.name = :name', { name });
      }

      if (fuzzyUpdatedBy) {
        query.andWhere('CAST(node.updatedBy AS text) ILIKE :fuzzyUpdatedBy', {
          fuzzyUpdatedBy: `%${fuzzyUpdatedBy}%`,
        });
      } else if (updatedBy) {
        query.andWhere('node.updatedBy = :updatedBy', { updatedBy });
      }

      // **Exact Filters**
      if (flowId) {
        query.andWhere('flow.flowId = :flowId', { flowId });
      }
      if (nodeTypeId) {
        query.andWhere('nodeType.nodeTypeId = :nodeTypeId', { nodeTypeId });
      }
      if (manifoldId) {
        query.andWhere('manifold.manifoldId = :manifoldId', { manifoldId });
      }
      if (typeof isDeleted === 'boolean') {
        query.andWhere('node.isDeleted = :isDeleted', { isDeleted });
      }
    }

    // 3) Apply Sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        if (index === 0) {
          query = query.orderBy(`node.${s.by}`, s.order);
        } else {
          query = query.addOrderBy(`node.${s.by}`, s.order);
        }
      });
    } else {
      // Default sorting
      query = query.orderBy('node.createdAt', 'ASC');
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
    const nodes = await query.getMany();

    this.logger.info(
      `${nodes.length} Node(s) found matching search criteria`,
      traceId,
      'searchByFuzzyNameNodes',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: nodes,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
