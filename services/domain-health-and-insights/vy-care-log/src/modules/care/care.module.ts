import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaperChange } from '../../entities/diaper_change.entity';
import { DiaperChangeService } from './services/diaper-change.service';
import { DiaperChangeKafkaService } from './services/diaper-change-kafka.service';
import { DiaperChangeController } from './care.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([DiaperChange])],
  controllers: [DiaperChangeController],
  providers: [DiaperChangeService, DiaperChangeKafkaService],
})
export class CareModule {
  private logger = getLoggerConfig(CareModule.name);
  constructor() {
    this.logger.debug(
      `${CareModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
