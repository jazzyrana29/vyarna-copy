import { Module } from '@nestjs/common';
import { PlinkoGateway } from './plinko.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { PlinkoKafkaService } from './plinko-kafka.service';
import { PlinkoResponseController } from './plinko-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PlinkoResponseController],
  providers: [PlinkoGateway, PlinkoKafkaService],
})
export class PlinkoModule {
  private logger = getLoggerConfig(PlinkoModule.name);

  constructor() {
    this.logger.debug(
      `${PlinkoModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
