import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaperChange } from '../../entities/diaper_change.entity';
import { ZtrackingDiaperChange } from '../../entities/ztracking_diaper_change.entity';
import { DiaperChangeService } from './services/diaper-change.service';
import { DiaperChangeKafkaService } from './services/diaper-change-kafka.service';
import { ZtrackingDiaperChangeService } from './services/ztracking-diaper-change.service';
import { DiaperChangeController } from './care.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([DiaperChange, ZtrackingDiaperChange])],
  controllers: [DiaperChangeController],
  providers: [
    DiaperChangeService,
    DiaperChangeKafkaService,
    ZtrackingDiaperChangeService,
  ],
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
