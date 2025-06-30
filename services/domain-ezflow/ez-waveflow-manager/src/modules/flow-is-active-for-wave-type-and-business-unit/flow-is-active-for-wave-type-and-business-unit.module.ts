import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { FlowIsActiveForWaveTypeAndBusinessUnit } from '../../entities/flow-is-active-for-wave-type-and-business-unit.entity';
import { ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit } from '../../entities/ztracking-flow-is-active-for-wave-type-and-business-unit.entity';

import { FlowIsActiveForWaveTypeAndBusinessUnitService } from './services/flow-is-active-for-wave-type-and-business-unit.service';
import { FlowIsActiveForWaveTypeAndBusinessUnitKafkaService } from './services/flow-is-active-for-wave-type-and-business-unit-kafka.service';
import { ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService } from './services/ztracking-flow-is-active-for-wave-type-and-business-unit.service';

import { FlowIsActiveForWaveTypeAndBusinessUnitController } from './flow-is-active-for-wave-type-and-business-unit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FlowIsActiveForWaveTypeAndBusinessUnit,
      ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit,
    ]),
  ],
  controllers: [FlowIsActiveForWaveTypeAndBusinessUnitController],
  providers: [
    FlowIsActiveForWaveTypeAndBusinessUnitService,
    FlowIsActiveForWaveTypeAndBusinessUnitKafkaService,
    ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService,
  ],
})
export class FlowIsActiveForWaveTypeAndBusinessUnitModule {
  private logger = getLoggerConfig(
    FlowIsActiveForWaveTypeAndBusinessUnitModule.name,
  );

  constructor() {
    this.logger.debug(
      `${FlowIsActiveForWaveTypeAndBusinessUnitModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
