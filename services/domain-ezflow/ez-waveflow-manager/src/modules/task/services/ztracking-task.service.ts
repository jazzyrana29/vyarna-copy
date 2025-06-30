import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Task } from '../../../entities/task.entity';
import { ZtrackingTask } from '../../../entities/ztracking-task.entity';

import { GetHistoryTaskDto, ZtrackingTaskDto } from 'ez-utils';

@Injectable()
export class ZtrackingTaskService {
  private logger = getLoggerConfig(ZtrackingTaskService.name);

  constructor(
    @InjectRepository(ZtrackingTask)
    private ztrackingRepository: Repository<ZtrackingTask>,
  ) {
    this.logger.debug(
      `${ZtrackingTaskService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingTaskEntity(
    task: Task,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingRepository.save(
      this.ztrackingRepository.create({
        taskId: task.taskId,
        dateStart: task.dateStart,
        dateEnd: task.dateEnd,
        isDeleted: task.isDeleted,
        updatedBy: task.updatedBy,
        createdAt: task.createdAt,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `Ztracking entry for Task with ID: ${task.taskId} saved in database`,
      traceId,
      'createZtrackingTaskEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async findZtrackingTaskEntity(
    { taskId }: GetHistoryTaskDto,
    traceId: string,
  ): Promise<ZtrackingTaskDto[]> {
    const ztrackingEntities = await this.ztrackingRepository.find({
      where: { taskId },
      order: { versionDate: 'DESC' },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entries found for Task with ID: ${taskId}`,
        traceId,
        'findZtrackingTaskEntity',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entries found for Task with ID: ${taskId}`,
      );
    }

    this.logger.info(
      `Ztracking entries for Task with ID: ${taskId} found in database`,
      traceId,
      'findZtrackingTaskEntity',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
