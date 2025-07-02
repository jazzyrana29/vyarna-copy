import { Module } from '@nestjs/common';
import { DragonTowerGateway } from './dragon-tower.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { DragonTowerKafkaService } from './dragon-tower-kafka.service';
import { DragonTowerResponseController } from './dragon-tower-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [DragonTowerResponseController],
  providers: [DragonTowerGateway, DragonTowerKafkaService],
})
export class DragonTowerModule {
  private logger = getLoggerConfig(DragonTowerModule.name);

  constructor() {
    this.logger.debug(
      `${DragonTowerModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
