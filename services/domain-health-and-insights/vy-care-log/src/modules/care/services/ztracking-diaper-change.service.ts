import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { DiaperChange } from '../../../entities/diaper_change.entity';
import { ZtrackingDiaperChange } from '../../../entities/ztracking_diaper_change.entity';

import {
  GetZtrackingDiaperChangeDto,
  ZtrackingDiaperChangeDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingDiaperChangeService {
  private logger = getLoggerConfig(ZtrackingDiaperChangeService.name);

  constructor(
    @InjectRepository(ZtrackingDiaperChange)
    private readonly diaperChangeRepository: Repository<ZtrackingDiaperChange>,
  ) {
    this.logger.debug(
      `${ZtrackingDiaperChangeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForDiaperChange(
    diaperChange: DiaperChange,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.diaperChangeRepository.save(
      this.diaperChangeRepository.create({
        ...diaperChange,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `create ZtrackingDiaperChange saved in database`,
      traceId,
      'createZtrackingForDiaperChange',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async getZtrackingForDiaperChange(
    { diaperChangeId = '' }: GetZtrackingDiaperChangeDto,
    traceId: string,
  ): Promise<ZtrackingDiaperChangeDto[]> {
    const ztrackingEntities = await this.diaperChangeRepository.find({
      where: { diaperChangeId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${diaperChangeId}`,
        traceId,
        'getZtrackingForDiaperChange',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${diaperChangeId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking diaper change found in database`,
      traceId,
      'getZtrackingForDiaperChange',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
