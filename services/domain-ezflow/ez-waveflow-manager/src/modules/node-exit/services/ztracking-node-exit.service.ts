import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { NodeExit } from '../../../entities/node-exit.entity';
import { ZtrackingNodeExit } from '../../../entities/ztracking-node-exit.entity';

import { GetZtrackingNodeExitDto, ZtrackingNodeExitDto } from 'ez-utils';

@Injectable()
export class ZtrackingNodeExitService {
  private logger = getLoggerConfig(ZtrackingNodeExitService.name);

  constructor(
    @InjectRepository(ZtrackingNodeExit)
    private readonly nodeExitRepository: Repository<ZtrackingNodeExit>,
  ) {
    this.logger.debug(
      `${ZtrackingNodeExitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForNodeExit(
    nodeExit: NodeExit,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.nodeExitRepository.save(
      this.nodeExitRepository.create({
        ...nodeExit,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `create ZtrackingNodeExit saved in database`,
      traceId,
      'createZtrackingForNodeExit',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async getZtrackingForNodeExit(
    { nodeExitId = '' }: GetZtrackingNodeExitDto,
    traceId: string,
  ): Promise<ZtrackingNodeExitDto[]> {
    const ztrackingEntities = await this.nodeExitRepository.find({
      where: { nodeExitId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${nodeExitId}`,
        traceId,
        'getZtrackingForNodeExit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${nodeExitId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking node exit found in database`,
      traceId,
      'getZtrackingForNodeExit',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
