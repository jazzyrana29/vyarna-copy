import { Injectable, NotFoundException } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';

import { Action } from '../../../entities/action.entity';
import { ZtrackingAction } from '../../../entities/ztracking-action.entity';

import { GetZtrackingActionDto, ZtrackingActionDto } from 'ez-utils';

@Injectable()
export class ZtrackingActionService {
  private logger = getLoggerConfig(ZtrackingActionService.name);

  constructor(
    @InjectRepository(ZtrackingAction)
    private readonly ztrackingActionRepo: Repository<ZtrackingAction>,
  ) {
    this.logger.debug(
      `${ZtrackingActionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForAction(
    action: Action,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingActionRepo.save({
      ...action,
      versionDate: new Date(),
    });

    this.logger.info(
      `ZtrackingAction saved for actionId=${action.actionId}`,
      traceId,
      'createZtrackingForAction',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async getZtrackingForAction(
    { actionId = '' }: GetZtrackingActionDto,
    traceId: string,
  ): Promise<ZtrackingActionDto[]> {
    if (!actionId) {
      throw new NotFoundException('actionId is required to fetch ztracking');
    }

    const ztrackingEntities = await this.ztrackingActionRepo.find({
      where: { actionId },
      order: { versionDate: 'DESC' },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entries found for actionId=${actionId}`,
        traceId,
        'getZtrackingForAction',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entries found for actionId=${actionId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking entries found for actionId=${actionId}`,
      traceId,
      'getZtrackingForAction',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
