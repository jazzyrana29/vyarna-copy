import { Module } from '@nestjs/common';
import { PumpGateway } from './pump.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { PumpKafkaService } from './pump-kafka.service';
import { PumpResponseController } from './pump-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PumpResponseController],
  providers: [PumpGateway, PumpKafkaService],
})
export class PumpModule {
  private logger = getLoggerConfig(PumpModule.name);

  constructor() {
    this.logger.debug(
      `${PumpModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
