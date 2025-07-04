import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { NutritionSession } from '../../../entities/nutrition_session.entity';
import { ZtrackingNutritionSession } from '../../../entities/ztracking_nutrition_session.entity';
import { GetZtrackingNutritionSessionDto } from 'ez-utils';

@Injectable()
export class ZtrackingNutritionSessionService {
  private logger = getLoggerConfig(ZtrackingNutritionSessionService.name);

  constructor(
    @InjectRepository(ZtrackingNutritionSession)
    private readonly ztrackingRepo: Repository<ZtrackingNutritionSession>,
  ) {
    this.logger.debug(
      `${ZtrackingNutritionSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingNutritionSessionEntity(
    session: NutritionSession,
    traceId: string,
  ): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...session, versionDate: new Date() }),
    );
    this.logger.info(
      `ztracking nutrition session entity saved in database`,
      traceId,
      'createZtrackingNutritionSessionEntity',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }

  async findZtrackingNutritionSessionEntity(
    { sessionId }: GetZtrackingNutritionSessionDto,
    traceId: string,
  ): Promise<ZtrackingNutritionSession[]> {
    const entities = await this.ztrackingRepo.find({ where: { sessionId } });

    if (!entities.length) {
      throw new NotFoundException(
        `no ztracking of nutrition session existed with this id => ${sessionId}`,
      );
    }

    this.logger.info(
      `ztracking nutrition session entity found in database`,
      traceId,
      'findZtrackingNutritionSessionEntity',
      LogStreamLevel.ProdStandard,
    );

    return entities;
  }
}
