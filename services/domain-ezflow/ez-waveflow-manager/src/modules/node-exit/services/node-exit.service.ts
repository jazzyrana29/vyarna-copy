import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { NodeExit } from '../../../entities/node-exit.entity';
import { Node } from '../../../entities/node.entity';

import {
  CreateNodeExitDto,
  DeleteNodeExitDto,
  GetOneNodeExitDto,
  NodeExitDto,
  UpdateNodeExitDto,
} from 'ez-utils';

import { ZtrackingNodeExitService } from './ztracking-node-exit.service';

@Injectable()
export class NodeExitService {
  private logger = getLoggerConfig(NodeExitService.name);

  constructor(
    @InjectRepository(NodeExit)
    private readonly nodeExitRepository: Repository<NodeExit>,
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    private readonly ztrackingNodeExitService: ZtrackingNodeExitService,
  ) {
    this.logger.debug(
      `${NodeExitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createNodeExit(
    createNodeExitDto: CreateNodeExitDto,
    traceId: string,
  ): Promise<NodeExitDto> {
    const { sourceNodeId, targetNodeId } = createNodeExitDto;

    const sourceNode = await this.nodeRepository.findOne({
      where: { nodeId: sourceNodeId },
    });
    if (!sourceNode) {
      this.logger.error(
        `No source node found with ID: ${sourceNodeId}`,
        traceId,
        'createNodeExit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        `No source node found with ID: ${sourceNodeId}`,
      );
    }

    if (targetNodeId) {
      const targetNode = await this.nodeRepository.findOne({
        where: { nodeId: targetNodeId },
      });
      if (!targetNode) {
        this.logger.error(
          `No target node found with ID: ${targetNodeId}`,
          traceId,
          'createNodeExit',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `No target node found with ID: ${targetNodeId}`,
        );
      }

      if (sourceNode.flowId !== targetNode.flowId) {
        this.logger.error(
          `Target node's flowId (${targetNode.flowId}) must match source node's flowId (${sourceNode.flowId}).`,
          traceId,
          'createNodeExit',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `Target node's flowId (${targetNode.flowId}) must match source node's flowId (${sourceNode.flowId}).`,
        );
      }
    }

    const createdNodeExit = await this.nodeExitRepository.save(
      this.nodeExitRepository.create(createNodeExitDto),
    );

    this.logger.info(
      `NodeExit created with ID: ${createdNodeExit.nodeExitId}`,
      traceId,
      'createNodeExit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingNodeExitService.createZtrackingForNodeExit(
        createdNodeExit,
        traceId,
      )
    )
      return createdNodeExit;
  }

  async updateNodeExit(
    updateNodeExitDto: UpdateNodeExitDto,
    traceId: string,
  ): Promise<NodeExitDto> {
    const { nodeExitId, sourceNodeId, targetNodeId } = updateNodeExitDto;

    const nodeExit = await this.nodeExitRepository.findOne({
      where: { nodeExitId },
    });

    if (!nodeExit) {
      this.logger.error(
        `No NodeExit found with ID: ${updateNodeExitDto.nodeExitId}`,
        traceId,
        'updateNodeExit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No NodeExit found with ID: ${updateNodeExitDto.nodeExitId}`,
      );
    }

    const finalSourceNodeId = sourceNodeId ?? nodeExit.sourceNodeId;
    const finalTargetNodeId = targetNodeId ?? nodeExit.targetNodeId;

    const sourceNode = await this.nodeRepository.findOne({
      where: { nodeId: finalSourceNodeId },
      relations: ['flow'],
    });
    if (!sourceNode) {
      this.logger.error(
        `No source node found with ID: ${finalSourceNodeId}`,
        traceId,
        'updateNodeExit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        `No source node found with ID: ${finalSourceNodeId}`,
      );
    }

    if (sourceNode.flow && sourceNode.flow.isPublished) {
      const allowedFields = [];
      const updateKeys = Object.keys(updateNodeExitDto);
      const invalidFields = updateKeys.filter(
        (key) => !allowedFields.includes(key) && key !== 'nodeExitId',
      );
      if (invalidFields.length > 0) {
        this.logger.error(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on a node exit of a published flow (Flow ID: ${sourceNode.flow.flowId}).`,
          traceId,
          'updateNodeExit',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on a node exit of a published flow.`,
        );
      }
    }

    if (finalTargetNodeId) {
      const targetNode = await this.nodeRepository.findOne({
        where: { nodeId: finalTargetNodeId },
      });
      if (!targetNode) {
        this.logger.error(
          `No target node found with ID: ${finalTargetNodeId}`,
          traceId,
          'updateNodeExit',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `No target node found with ID: ${finalTargetNodeId}`,
        );
      }

      if (sourceNode.flowId !== targetNode.flowId) {
        this.logger.error(
          `Target node's flowId (${targetNode.flowId}) must match source node's flowId (${sourceNode.flowId}).`,
          traceId,
          'updateNodeExit',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `Target node's flowId (${targetNode.flowId}) must match source node's flowId (${sourceNode.flowId}).`,
        );
      }
    }

    const updatedNodeExit = await this.nodeExitRepository.save({
      ...nodeExit,
      ...updateNodeExitDto,
    });

    this.logger.info(
      `NodeExit with ID: ${updatedNodeExit.nodeExitId} updated`,
      traceId,
      'updateNodeExit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingNodeExitService.createZtrackingForNodeExit(
        updatedNodeExit,
        traceId,
      )
    )
      return updatedNodeExit;
  }

  async deleteNodeExit(
    { nodeExitId = '', updatedBy = '' }: DeleteNodeExitDto,
    traceId: string,
  ): Promise<NodeExitDto> {
    if (!nodeExitId || !updatedBy) {
      this.logger.error(
        'You need to provide both nodeExitId and updatedBy',
        traceId,
        'deleteNodeExit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'You need to provide both nodeExitId and updatedBy',
      );
    }
    const nodeExit = await this.nodeExitRepository.findOne({
      where: { nodeExitId, isDeleted: false },
    });

    if (!nodeExit) {
      this.logger.error(
        `No active NodeExit found with ID: ${nodeExitId}`,
        traceId,
        'deleteNodeExit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No active NodeExit found with ID: ${nodeExitId}`,
      );
    }

    nodeExit.isDeleted = true;
    nodeExit.updatedBy = updatedBy;
    const deletedNodeExit = await this.nodeExitRepository.save(nodeExit);

    this.logger.info(
      `NodeExit with ID: ${nodeExitId} marked as deleted`,
      traceId,
      'deleteNodeExit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingNodeExitService.createZtrackingForNodeExit(
        deletedNodeExit,
        traceId,
      )
    )
      return deletedNodeExit;
  }

  async getOneNodeExit(
    { nodeExitId = '', isDeleted = false }: GetOneNodeExitDto,
    traceId: string,
  ): Promise<NodeExitDto> {
    if (!nodeExitId) {
      this.logger.error(
        'Provide nodeExitId',
        traceId,
        'getOneNodeExit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Provide nodeExitId');
    }

    const where: FindOptionsWhere<NodeExit> = {};
    if (nodeExitId) where.nodeExitId = nodeExitId;
    where.isDeleted = isDeleted;
    const nodeExit = await this.nodeExitRepository.findOne({
      where,
      relations: ['filter'],
    });

    if (!nodeExit) {
      this.logger.error(
        `No NodeExit found with ID: ${nodeExitId}`,
        traceId,
        'getOneNodeExit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No NodeExit found with ID: ${nodeExitId}`);
    }

    this.logger.info(
      `NodeExit found with ID: ${nodeExit.nodeExitId}`,
      traceId,
      'getOneNodeExit',
      LogStreamLevel.ProdStandard,
    );

    return nodeExit;
  }
}
