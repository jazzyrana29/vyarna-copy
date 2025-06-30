import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskTypeHaveAccessToBusinessUnit } from '../../entities/task-type-have-access-to-business-unit.entity';
import { ZtrackingTaskTypeHaveAccessToBusinessUnit } from '../../entities/ztracking-task-type-have-access-to-business-unit.entity';

import { TaskTypeHaveAccessToBusinessUnitService } from './services/task-type-have-access-to-business-unit.service';
import { TaskTypeHaveAccessToBusinessUnitKafkaService } from './services/task-type-have-access-to-business-unit-kafka.service';
import { ZtrackingTaskTypeHaveAccessToBusinessUnitService } from './services/ztracking-task-type-have-access-to-business-unit.service';

import { TaskTypeHaveAccessToBusinessUnitController } from './task-type-have-access-to-business-unit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskTypeHaveAccessToBusinessUnit,
      ZtrackingTaskTypeHaveAccessToBusinessUnit,
    ]),
  ],
  controllers: [TaskTypeHaveAccessToBusinessUnitController],
  providers: [
    TaskTypeHaveAccessToBusinessUnitService,
    TaskTypeHaveAccessToBusinessUnitKafkaService,
    ZtrackingTaskTypeHaveAccessToBusinessUnitService,
  ],
})
export class TaskTypeHaveAccessToBusinessUnitModule {
  private logger = getLoggerConfig(TaskTypeHaveAccessToBusinessUnitModule.name);

  constructor() {
    this.logger.debug(
      `${TaskTypeHaveAccessToBusinessUnitModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
