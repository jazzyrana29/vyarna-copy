import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionSession } from '../../entities/nutrition_session.entity';
import { ZtrackingNutritionSession } from '../../entities/ztracking_nutrition_session.entity';
import { NutritionSessionService } from './services/nutrition-session.service';
import { NutritionSessionKafkaService } from './services/nutrition-session-kafka.service';
import { ZtrackingNutritionSessionService } from './services/ztracking-nutrition-session.service';
import { NutritionController } from './nutrition.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([NutritionSession, ZtrackingNutritionSession]),
  ],
  controllers: [NutritionController],
  providers: [
    NutritionSessionService,
    NutritionSessionKafkaService,
    ZtrackingNutritionSessionService,
  ],
})
export class NutritionModule {
  private logger = getLoggerConfig(NutritionModule.name);
  constructor() {
    this.logger.debug(
      `${NutritionModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
