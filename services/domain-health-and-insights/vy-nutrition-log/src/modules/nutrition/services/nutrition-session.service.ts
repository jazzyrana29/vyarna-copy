import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NutritionSession } from '../../../entities/nutrition_session.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class NutritionSessionService {
  private logger = getLoggerConfig(NutritionSessionService.name);

  constructor(
    @InjectRepository(NutritionSession)
    private readonly repo: Repository<NutritionSession>,
  ) {
    this.logger.debug(
      `${NutritionSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startSession(data: Partial<NutritionSession>, traceId: string): Promise<NutritionSession> {
    const entity = this.repo.create({ ...data, status: 'IN_PROGRESS', startedAt: new Date() });
    await this.repo.save(entity);
    this.logger.info('Nutrition session created', traceId, 'startSession', LogStreamLevel.ProdStandard);
    return entity;
  }

  async getSession(sessionId: string): Promise<NutritionSession | null> {
    return this.repo.findOne({ where: { sessionId } });
  }
}
