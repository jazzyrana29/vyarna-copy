import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NutritionSession } from '../../../entities/nutrition_session.entity';
import {
  StartNutritionSessionDto,
  NutritionSessionDto,
  GetNutritionSessionDto,
  GetZtrackingNutritionSessionDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { ZtrackingNutritionSessionService } from './ztracking-nutrition-session.service';
import { ZtrackingNutritionSession } from '../../../entities/ztracking_nutrition_session.entity';

@Injectable()
export class NutritionSessionService {
  private logger = getLoggerConfig(NutritionSessionService.name);

  constructor(
    @InjectRepository(NutritionSession)
    private readonly nutritionSessionRepo: Repository<NutritionSession>,
    private readonly ztrackingService: ZtrackingNutritionSessionService,
  ) {
    this.logger.debug(
      `${NutritionSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startNutritionSession(
    startNutritionSessionDto: StartNutritionSessionDto,
    traceId: string,
  ): Promise<NutritionSessionDto> {
    const entity = this.nutritionSessionRepo.create({
      ...startNutritionSessionDto,
      status: 'IN_PROGRESS',
      startedAt: new Date(),
    });
    await this.nutritionSessionRepo.save(entity);
    await this.ztrackingService.createZtrackingNutritionSessionEntity(
      entity,
      traceId,
    );
    this.logger.info(
      'Nutrition session created',
      traceId,
      'startNutritionSession',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async getNutritionSession(
    getNutritionSessionDto: GetNutritionSessionDto,
    traceId: string,
  ): Promise<NutritionSessionDto | null> {
    const { sessionId } = getNutritionSessionDto;
    const session = await this.nutritionSessionRepo.findOne({
      where: { sessionId },
    });

    this.logger.info(
      session
        ? `Nutrition session found with ID: ${sessionId}`
        : `No Nutrition session found with ID: ${sessionId}`,
      traceId,
      'getNutritionSession',
      LogStreamLevel.ProdStandard,
    );

    return session;
  }

  async getZtrackingNutritionSession(
    getDto: GetZtrackingNutritionSessionDto,
    traceId: string,
  ): Promise<ZtrackingNutritionSession[]> {
    return this.ztrackingService.findZtrackingNutritionSessionEntity(
      getDto,
      traceId,
    );
  }
}
