import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BusinessUnit } from '../../entities/business-unit.entity';

import { BusinessUnitController } from './business-operators.controller';

import { BusinessUnitService } from './services/business-unit.service';
import { BusinessUnitKafkaService } from './services/business-unit-kafka.service';

import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { ZtrackingBusinessUnit } from '../../entities/ztracking-business-unit.entity';
import { ZtrackingBusinessUnitService } from './services/ztracking-business-unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessUnit, ZtrackingBusinessUnit])],
  controllers: [BusinessUnitController],
  providers: [
    BusinessUnitService,
    BusinessUnitKafkaService,
    ZtrackingBusinessUnitService,
  ],
})
export class BusinessUnitModule {
  private logger = getLoggerConfig(BusinessUnitModule.name);

  constructor() {
    this.logger.debug(
      `${BusinessUnitModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
