import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { SalesReferralsWebsocket } from './vy-sales-referrals.gateway';
import { SalesReferralsKafkaService } from './microservices/vy-sales-referrals-kafka.service';
import { SalesReferralsResponseController } from './vy-sales-referrals-response.controller';
import { SalesReferralsController } from './vy-sales-referrals.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [SalesReferralsResponseController, SalesReferralsController],
  providers: [SalesReferralsWebsocket, SalesReferralsKafkaService],
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
