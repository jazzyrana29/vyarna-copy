import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { SalesReferralsKafkaService } from './microservices/vy-sales-referrals-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [SalesReferralsKafkaService],
})
export class SalesReferralsModule {
  private logger = getLoggerConfig(SalesReferralsModule.name);

  constructor() {
    this.logger.debug(
      `${SalesReferralsModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
