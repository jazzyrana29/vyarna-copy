import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Task } from '../../entities/task.entity';
import { Node } from '../../entities/node.entity';
import { NodeExit } from '../../entities/node-exit.entity';
import { TaskStatus } from '../../entities/task-status.entity';
import { ZtrackingTask } from '../../entities/ztracking-task.entity';

import { TaskService } from './services/task.service';
import { TaskKafkaService } from './services/task-kafka.service';
import { ZtrackingTaskService } from './services/ztracking-task.service';

import { TaskController } from './task.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Node, NodeExit, TaskStatus, ZtrackingTask]),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskKafkaService, ZtrackingTaskService],
})
export class TaskModule {
  private logger = getLoggerConfig(TaskModule.name);

  constructor() {
    this.logger.debug(
      `${TaskModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
