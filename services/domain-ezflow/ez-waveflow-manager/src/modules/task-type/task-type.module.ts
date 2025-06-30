import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskType } from '../../entities/task-type.entity';

import { TaskTypeService } from './services/task-type.service';
import { TaskTypeKafkaService } from './services/task-type-kafka.service';

import { TaskTypeController } from './task-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskType])],
  providers: [TaskTypeKafkaService, TaskTypeService],
  controllers: [TaskTypeController],
})
export class TaskTypeModule {
  private logger = getLoggerConfig(TaskTypeModule.name);

  constructor() {
    this.logger.debug(
      `${TaskTypeModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
