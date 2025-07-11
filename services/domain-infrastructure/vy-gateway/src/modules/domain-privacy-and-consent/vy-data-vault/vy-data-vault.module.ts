import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { DataVaultKafkaService } from './microservices/vy-data-vault-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [DataVaultKafkaService],
})
export class DataVaultModule {
  private logger = getLoggerConfig(DataVaultModule.name);

  constructor() {
    this.logger.debug(
      `${DataVaultModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
