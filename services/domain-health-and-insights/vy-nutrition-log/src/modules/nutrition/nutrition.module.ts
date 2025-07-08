import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionSession } from '../../entities/nutrition_session.entity';
import { ZtrackingNutritionSession } from '../../entities/ztracking_nutrition_session.entity';
import { BreastEvent } from '../../entities/breast_event.entity';
import { ZtrackingBreastEvent } from '../../entities/ztracking_breast_event.entity';
import { BottleEvent } from '../../entities/bottle_event.entity';
import { ZtrackingBottleEvent } from '../../entities/ztracking_bottle_event.entity';
import { SolidsEvent } from '../../entities/solids_event.entity';
import { ZtrackingSolidsEvent } from '../../entities/ztracking_solids_event.entity';
import { PumpingEvent } from '../../entities/pumping_event.entity';
import { ZtrackingPumpingEvent } from '../../entities/ztracking_pumping_event.entity';
import { SessionSummary } from '../../entities/session_summary.entity';
import { ZtrackingSessionSummary } from '../../entities/ztracking_session_summary.entity';
import { NutritionSessionService } from './services/nutrition-session.service';
import { NutritionSessionKafkaService } from './services/nutrition-session-kafka.service';
import { ZtrackingNutritionSessionService } from './services/ztracking-nutrition-session.service';
import { KafkaModule } from '../utils/kafka/kafka.module';
import { PersonIdentityClientService } from './services/person-identity-client.service';
import { PersonIdentityResponseController } from './person-identity-response.controller';
import { NutritionController } from './nutrition.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NutritionSession,
      ZtrackingNutritionSession,
      BreastEvent,
      ZtrackingBreastEvent,
      BottleEvent,
      ZtrackingBottleEvent,
      SolidsEvent,
      ZtrackingSolidsEvent,
      PumpingEvent,
      ZtrackingPumpingEvent,
      SessionSummary,
      ZtrackingSessionSummary,
    ]),
    KafkaModule,
  ],
  controllers: [NutritionController, PersonIdentityResponseController],
  providers: [
    NutritionSessionService,
    NutritionSessionKafkaService,
    ZtrackingNutritionSessionService,
    PersonIdentityClientService,
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
