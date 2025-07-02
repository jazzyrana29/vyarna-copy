import { Module } from '@nestjs/common';
import { CrashGateway } from './crash.gateway';
import { CrashKafkaService } from './crash-kafka.service';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { CrashResponseController } from './crash-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [CrashResponseController],
  providers: [CrashGateway, CrashKafkaService],
})
export class CrashModule {
  private logger = getLoggerConfig(CrashModule.name);

  constructor() {
    this.logger.debug(
      `${CrashModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
