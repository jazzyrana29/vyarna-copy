import { Module } from '@nestjs/common';
import { MinesGateway } from './mines.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { MinesKafkaService } from './mines-kafka.service';
import { MinesResponseController } from './mines-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [MinesResponseController],
  providers: [MinesGateway, MinesKafkaService],
})
export class MinesModule {
  private logger = getLoggerConfig(MinesModule.name);

  constructor() {
    this.logger.debug(
      `${MinesModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
