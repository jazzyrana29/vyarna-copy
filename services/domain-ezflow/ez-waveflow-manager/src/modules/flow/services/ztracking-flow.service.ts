import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Flow } from '../../../entities/flow.entity';
import { ZtrackingFlow } from '../../../entities/ztracking-flow.entity';

import { GetZtrackingFlowDto, ZtrackingFlowDto } from 'ez-utils';

@Injectable()
export class ZtrackingFlowService {
  private logger = getLoggerConfig(ZtrackingFlowService.name);

  constructor(
    @InjectRepository(ZtrackingFlow)
    private readonly flowRepository: Repository<ZtrackingFlow>,
  ) {
    this.logger.debug(
      `${ZtrackingFlowService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForFlow(flow: Flow, traceId: string): Promise<boolean> {
    const ztrackingEntity = await this.flowRepository.save(
      this.flowRepository.create({
        ...flow,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `create ZtrackingFlow saved in database`,
      traceId,
      'createZtrackingForFlow',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async getZtrackingForFlow(
    { flowId = '' }: GetZtrackingFlowDto,
    traceId: string,
  ): Promise<ZtrackingFlowDto[]> {
    const ztrackingEntities = await this.flowRepository.find({
      where: { flowId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${flowId}`,
        traceId,
        'getZtrackingForFlow',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${flowId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking flow found in database`,
      traceId,
      'getZtrackingForFlow',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
