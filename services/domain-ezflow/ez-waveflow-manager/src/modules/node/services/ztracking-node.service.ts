import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Node } from '../../../entities/node.entity';
import { ZtrackingNode } from '../../../entities/ztracking-node.entity';

import { GetZtrackingNodeDto, ZtrackingNodeDto } from 'ez-utils';

@Injectable()
export class ZtrackingNodeService {
  private logger = getLoggerConfig(ZtrackingNodeService.name);

  constructor(
    @InjectRepository(ZtrackingNode)
    private readonly nodeRepository: Repository<ZtrackingNode>,
  ) {
    this.logger.debug(
      `${ZtrackingNodeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForNode(node: Node, traceId: string): Promise<boolean> {
    const ztrackingEntity = await this.nodeRepository.save(
      this.nodeRepository.create({
        ...node,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `create ZtrackingNode saved in database`,
      traceId,
      'createZtrackingForNode',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async getZtrackingForNode(
    { nodeId = '' }: GetZtrackingNodeDto,
    traceId: string,
  ): Promise<ZtrackingNodeDto[]> {
    const ztrackingEntities = await this.nodeRepository.find({
      where: { nodeId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${nodeId}`,
        traceId,
        'getZtrackingForNode',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${nodeId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking node found in database`,
      traceId,
      'getZtrackingForNode',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
