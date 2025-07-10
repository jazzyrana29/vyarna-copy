import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { NutritionLogController } from './vy-nutrition-log.controller';
import { NutritionLogKafkaService } from './microservices/vy-nutrition-log-kafka.service';
import { NutritionLogWebsocket } from './vy-nutrition-log.gateway';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [NutritionLogController],
  providers: [NutritionLogWebsocket, NutritionLogKafkaService],
})
export class NutritionLogModule {
  private logger = getLoggerConfig(NutritionLogModule.name);

  constructor() {
    this.logger.debug(
      `${NutritionLogModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
