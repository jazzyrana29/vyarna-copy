import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Manifold } from '../../../entities/manifold.entity';
import { ZtrackingManifold } from '../../../entities/ztracking-manifold.entity';

import { GetZtrackingManifoldDto, ZtrackingManifoldDto } from 'ez-utils';

@Injectable()
export class ZtrackingManifoldService {
  private logger = getLoggerConfig(ZtrackingManifoldService.name);

  constructor(
    @InjectRepository(ZtrackingManifold)
    private readonly manifoldRepository: Repository<ZtrackingManifold>,
  ) {
    this.logger.debug(
      `${ZtrackingManifoldService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForManifold(
    manifold: Manifold,
    traceId: string,
  ): Promise<ZtrackingManifold> {
    const ztrackingEntity = await this.manifoldRepository.save(
      this.manifoldRepository.create({
        ...manifold,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `create ZtrackingManifold saved in database`,
      traceId,
      'createZtrackingForManifold',
      LogStreamLevel.ProdStandard,
    );
    return ztrackingEntity;
  }

  async getZtrackingForManifold(
    { manifoldId = '' }: GetZtrackingManifoldDto,
    traceId: string,
  ): Promise<ZtrackingManifoldDto[]> {
    const ztrackingEntities = await this.manifoldRepository.find({
      where: { manifoldId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${manifoldId}`,
        traceId,
        'getZtrackingForManifold',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${manifoldId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking manifold found in database`,
      traceId,
      'getZtrackingForManifold',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
