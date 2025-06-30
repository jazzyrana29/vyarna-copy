import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskHasReceiveInputValueOfType } from '../../entities/task-has-received-input-value-of-type.entity';
import { ZtrackingTaskHasReceiveInputValueOfType } from '../../entities/ztracking-task-has-received-input-value-of-type.entity';

import { TaskHasReceiveInputValueOfTypeService } from './services/task-has-received-input-value-of-type.service';
import { TaskHasReceiveInputValueOfTypeKafkaService } from './services/task-has-received-input-value-of-type-kafka.service';
import { ZtrackingTaskHasReceiveInputValueOfTypeService } from './services/ztracking-task-has-received-input-value-of-type.service';

import { TaskHasReceiveInputValueOfTypeController } from './task-has-received-input-value-of-type.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskHasReceiveInputValueOfType,
      ZtrackingTaskHasReceiveInputValueOfType,
    ]),
  ],
  controllers: [TaskHasReceiveInputValueOfTypeController],
  providers: [
    TaskHasReceiveInputValueOfTypeService,
    TaskHasReceiveInputValueOfTypeKafkaService,
    ZtrackingTaskHasReceiveInputValueOfTypeService,
  ],
})
export class TaskHasReceiveInputValueOfTypeModule {
  private logger = getLoggerConfig(TaskHasReceiveInputValueOfTypeModule.name);

  constructor() {
    this.logger.debug(
      `${TaskHasReceiveInputValueOfTypeModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
