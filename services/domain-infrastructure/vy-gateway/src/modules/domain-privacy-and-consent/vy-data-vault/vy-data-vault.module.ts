import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { DataVaultWebsocket } from './vy-data-vault.gateway';
import { DataVaultKafkaService } from './microservices/vy-data-vault-kafka.service';
import { DataVaultResponseController } from './vy-data-vault-response.controller';
import { DataVaultController } from './vy-data-vault.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [DataVaultResponseController, DataVaultController],
  providers: [DataVaultWebsocket, DataVaultKafkaService],
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
