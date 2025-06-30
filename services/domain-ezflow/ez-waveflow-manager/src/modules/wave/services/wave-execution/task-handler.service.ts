import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Wave } from '../../../../entities/wave.entity';
import { Task } from '../../../../entities/task.entity';
import { TaskStatus } from '../../../../entities/task-status.entity';
import { NodeExit } from '../../../../entities/node-exit.entity';

import { NodeDto, WaveDto, TaskDto } from 'ez-utils';

@Injectable()
export class TaskHandlerService {
  private logger = getLoggerConfig(TaskHandlerService.name);

  constructor(
    @InjectRepository(Wave)
    private readonly waveRepository: Repository<Wave>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(TaskStatus)
    private readonly taskStatusRepository: Repository<TaskStatus>,

    @InjectRepository(NodeExit)
    private readonly nodeExitRepository: Repository<NodeExit>,
  ) {
    this.logger.debug(
      `${TaskHandlerService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  /**
   * Creates and saves a Task that references the Node and Wave.
   * Records how we arrived here (previousTask), etc.
   */
  public async createTask(
    nodeDto: NodeDto,
    waveDto: WaveDto,
    previousTaskDto: TaskDto | null,
    waveContext: any,
    traceId: string,
  ): Promise<Task> {
    // 1) Fetch the wave to ensure it exists and is not deleted
    const wave = await this.waveRepository.findOne({
      where: { waveId: waveDto.waveId, isDeleted: false },
    });
    if (!wave) {
      this.logger.error(
        `Wave [${waveDto.waveId}] not found or is deleted`,
        traceId,
        'createTask',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(`Wave [${waveDto.waveId}] not found or deleted`);
    }

    // 2) Fetch a default TaskStatus named "CREATED" (if you have one)
    const defaultStatus = await this.taskStatusRepository.findOne({
      where: { name: 'CREATED', isDeleted: false },
    });
    if (!defaultStatus) {
      this.logger.warn(
        `Default TaskStatus "CREATED" not found.`,
        traceId,
        'createTask',
        LogStreamLevel.DebugHeavy,
      );
      // Fallback to another status logic if needed
    }

    // 3) Determine isExecutedFromId from previous task
    let isExecutedFromId: string | null = null;
    if (previousTaskDto?.isExecutedFromId) {
      const previousExit = await this.nodeExitRepository.findOne({
        where: {
          nodeExitId: previousTaskDto.isExecutedFromId,
          isDeleted: false,
        },
      });

      if (previousExit) {
        isExecutedFromId = previousExit.nodeExitId;
      } else {
        this.logger.warn(
          `NodeExit [${previousTaskDto.isExecutedFromId}] from previous task not found.`,
          traceId,
          'createTask',
          LogStreamLevel.DebugLight,
        );
      }
    }

    // 4) Create new Task entity
    const newTask = this.taskRepository.create({
      waveId: waveDto.waveId,
      nodeId: nodeDto.nodeId,
      taskStatus: defaultStatus || undefined,
      isExecutedFromId: isExecutedFromId || undefined,
      initialInputVariables: waveContext.inputVariables,
      dateStart: new Date(),
    });

    // 5) Save the new Task
    const savedTask = await this.taskRepository.save(newTask);

    this.logger.info(
      `Created Task [${savedTask.taskId}] for Node [${nodeDto.nodeId}] in Wave [${waveDto.waveId}]`,
      traceId,
      'createTask',
      LogStreamLevel.ProdStandard,
    );

    return savedTask;
  }

  /**
   * Set the Task status to "IN_PROGRESS" (executed at the start of the node).
   */
  public async markTaskAsInProgress(
    taskDto: TaskDto,
    traceId: string,
  ): Promise<TaskDto> {
    // 1) Find the existing Task
    const taskEntity = await this.taskRepository.findOne({
      where: { taskId: taskDto.taskId, isDeleted: false },
      relations: ['taskStatus'], // so we can see the current status
    });
    if (!taskEntity) {
      this.logger.error(
        `Task [${taskDto.taskId}] not found or is deleted`,
        traceId,
        'markTaskAsInProgress',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(`Task [${taskDto.taskId}] not found or deleted`);
    }

    // 2) Fetch "IN_PROGRESS" TaskStatus
    const inProgressStatus = await this.taskStatusRepository.findOne({
      where: { name: 'IN_PROGRESS', isDeleted: false },
    });
    if (!inProgressStatus) {
      this.logger.error(
        `TaskStatus "IN_PROGRESS" not found`,
        traceId,
        'markTaskAsInProgress',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(`TaskStatus "IN_PROGRESS" not found in DB`);
    }

    // Log the status transition
    const oldStatusName = taskEntity.taskStatus?.name || 'UNKNOWN';
    this.logger.info(
      `Changing Task [${taskEntity.taskId}] status from [${oldStatusName}] to [IN_PROGRESS]`,
      traceId,
      'markTaskAsInProgress',
      LogStreamLevel.ProdStandard,
    );

    // 3) Update Task entity
    taskEntity.taskStatus = inProgressStatus;

    // 4) Save changes
    const updatedEntity = await this.taskRepository.save(taskEntity);

    // 5) Return updated TaskDto
    const updatedDto: TaskDto = {
      ...taskDto,
      taskStatusId: inProgressStatus.taskStatusId,
      updatedAt: updatedEntity.updatedAt,
    };
    return updatedDto;
  }

  /**
   * Set the Task status to "COMPLETED" (executed at the end of the node).
   */
  public async markTaskAsCompleted(
    taskDto: TaskDto,
    waveContext: any,
    traceId: string,
  ): Promise<TaskDto> {
    // 1) Find the existing Task
    const taskEntity = await this.taskRepository.findOne({
      where: { taskId: taskDto.taskId, isDeleted: false },
      relations: ['taskStatus'],
    });
    if (!taskEntity) {
      this.logger.error(
        `Task [${taskDto.taskId}] not found or is deleted`,
        traceId,
        'markTaskAsCompleted',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(`Task [${taskDto.taskId}] not found or deleted`);
    }

    // 2) Fetch "COMPLETED" TaskStatus
    const completedStatus = await this.taskStatusRepository.findOne({
      where: { name: 'COMPLETED', isDeleted: false },
    });
    if (!completedStatus) {
      this.logger.error(
        `TaskStatus "COMPLETED" not found`,
        traceId,
        'markTaskAsCompleted',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error(`TaskStatus "COMPLETED" not found in DB`);
    }

    // Log the status transition
    const oldStatusName = taskEntity.taskStatus?.name || 'UNKNOWN';
    this.logger.info(
      `Changing Task [${taskEntity.taskId}] status from [${oldStatusName}] to [COMPLETED]`,
      traceId,
      'markTaskAsCompleted',
      LogStreamLevel.ProdStandard,
    );

    // 3) Update Task entity
    taskEntity.taskStatus = completedStatus;
    taskEntity.finalInputVariables = waveContext.inputVariables;
    taskEntity.dateEnd = new Date();

    // 4) Save changes
    const updatedEntity = await this.taskRepository.save(taskEntity);

    // 5) Return updated TaskDto
    const updatedDto: TaskDto = {
      ...taskDto,
      taskStatusId: completedStatus.taskStatusId,
      dateEnd: updatedEntity.dateEnd,
      updatedAt: updatedEntity.updatedAt,
      // keep other original fields as needed
    };
    return updatedDto;
  }
}
