import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OperatorService } from './services/operator.service';
import { OperatorKafkaService } from './services/operator-kafka.service';

import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { ZtrackingOperatorService } from './services/ztracking-operator.service';
import { OperatorController } from './operator.controller';
import { Operator } from '../../entities/operator.entity';
import { ZtrackingOperator } from '../../entities/ztracking-operator.entity';
import { BusinessUnit } from '../../entities/business-unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ZtrackingOperator, Operator, BusinessUnit]),
  ],
  controllers: [OperatorController],
  providers: [OperatorService, OperatorKafkaService, ZtrackingOperatorService],
})
export class OperatorModule {
  private logger = getLoggerConfig(OperatorModule.name);

  constructor() {
    this.logger.debug(
      `${OperatorModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
