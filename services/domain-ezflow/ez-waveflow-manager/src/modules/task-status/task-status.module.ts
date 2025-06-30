import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskStatus } from '../../entities/task-status.entity';

import { TaskStatusesService } from './services/task-status.service';
import { TaskStatusKafkaService } from './services/task-status-kafka.service';

import { TaskStatusController } from './task-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus])],
  controllers: [TaskStatusController],
  providers: [TaskStatusesService, TaskStatusKafkaService],
})
export class TaskStatusesModule {
  private logger = getLoggerConfig(TaskStatusesModule.name);

  constructor() {
    this.logger.debug(
      `${TaskStatusesModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
