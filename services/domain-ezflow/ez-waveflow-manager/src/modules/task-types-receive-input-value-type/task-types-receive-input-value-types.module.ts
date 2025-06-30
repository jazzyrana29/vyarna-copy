import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskTypesReceiveInputValueType } from '../../entities/task-types-receive-input-value-type.entity';
import { ZtrackingTaskTypesReceiveInputValueType } from '../../entities/ztracking-task-type-receives-input-value-type.entity';

import { TaskTypesReceiveInputValueTypeService } from './services/task-types-receive-input-value-types.service';
import { TaskTypesReceiveInputValueTypeKafkaService } from './services/task-types-receive-input-value-types-kafka.service';
import { ZtrackingTaskTypesReceiveInputValueTypeService } from './services/ztracking-task-types-receive-input-value-types.service';

import { TaskTypesReceiveInputValueTypeController } from './task-types-receive-input-value-types.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskTypesReceiveInputValueType,
      ZtrackingTaskTypesReceiveInputValueType,
    ]),
  ],
  controllers: [TaskTypesReceiveInputValueTypeController],
  providers: [
    TaskTypesReceiveInputValueTypeService,
    TaskTypesReceiveInputValueTypeKafkaService,
    ZtrackingTaskTypesReceiveInputValueTypeService,
  ],
})
export class TaskTypesReceiveInputValueTypeModule {
  private logger = getLoggerConfig(TaskTypesReceiveInputValueTypeModule.name);

  constructor() {
    this.logger.debug(
      `${TaskTypesReceiveInputValueTypeModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
