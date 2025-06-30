import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationOperator } from '../../entities/evaluation-operator.entity';

import { EvaluationOperatorController } from './evaluation-operator.controller';
import { EvaluationOperatorService } from './services/evaluation-operator.service';
import { EvaluationOperatorKafkaService } from './services/evaluation-operator-kafka.service';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationOperator])],
  controllers: [EvaluationOperatorController],
  providers: [EvaluationOperatorService, EvaluationOperatorKafkaService],
})
export class EvaluationOperatorModule {
  private logger = getLoggerConfig(EvaluationOperatorModule.name);

  constructor() {
    this.logger.debug(
      `${EvaluationOperatorModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
