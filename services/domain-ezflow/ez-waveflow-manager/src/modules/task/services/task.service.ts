import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Task } from '../../../entities/task.entity';
import { Node } from '../../../entities/node.entity';
import { NodeExit } from '../../../entities/node-exit.entity';
import { TaskStatus } from '../../../entities/task-status.entity';

import { ZtrackingTaskService } from './ztracking-task.service';

import {
  CreateTaskDto,
  UpdateTaskDto,
  DeleteTaskDto,
  GetOneTaskDto,
  GetManyTasksDto,
  PaginatedTasksResponseDto,
  TaskDto,
} from 'ez-utils';

@Injectable()
export class TaskService {
  private logger = getLoggerConfig(TaskService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    @InjectRepository(NodeExit)
    private readonly nodeExitRepository: Repository<NodeExit>,
    @InjectRepository(TaskStatus)
    private readonly taskStatusRepository: Repository<TaskStatus>,
    private readonly ztrackingTaskService: ZtrackingTaskService,
  ) {
    this.logger.debug(
      `${TaskService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    traceId: string,
  ): Promise<TaskDto> {
    const {
      nodeId,
      isExecutedFromId,
      taskStatusId,
      dateStart,
      dateEnd,
      updatedBy,
    } = createTaskDto;

    const node = await this.nodeRepository.findOne({
      where: { nodeId, isDeleted: false },
    });
    if (!node) {
      this.logger.error(
        `No Node found with ID: ${nodeId}`,
        traceId,
        'createTask',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Node found with ID: ${nodeId}`);
    }

    const isExecutedFrom = await this.nodeExitRepository.findOne({
      where: { nodeExitId: isExecutedFromId, isDeleted: false },
    });
    if (!isExecutedFrom) {
      this.logger.error(
        `No NodeExit (isExecutedFrom) found with ID: ${isExecutedFromId}`,
        traceId,
        'createTask',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No NodeExit (isExecutedFrom) found with ID: ${isExecutedFromId}`,
      );
    }

    const taskStatus = await this.taskStatusRepository.findOne({
      where: { taskStatusId, isDeleted: false },
    });
    if (!taskStatus) {
      this.logger.error(
        `No TaskStatus found with ID: ${taskStatusId}`,
        traceId,
        'createTask',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskStatus found with ID: ${taskStatusId}`,
      );
    }

    const task = this.taskRepository.create({
      node,
      isExecutedFrom,
      taskStatus,
      dateStart,
      dateEnd,
      updatedBy,
    });

    await this.taskRepository.save(task);
    this.logger.info(
      `Task created with ID: ${task.taskId}`,
      traceId,
      'createTask',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingTaskService.createZtrackingTaskEntity(task, traceId)
    ) {
      return task;
    }
  }

  async updateTask(
    updateTaskDto: UpdateTaskDto,
    traceId: string,
  ): Promise<TaskDto> {
    const { taskId, dateStart, dateEnd, taskStatusId, updatedBy } =
      updateTaskDto;

    const task = await this.taskRepository.findOne({
      where: { taskId, isDeleted: false },
    });
    if (!task) {
      this.logger.error(
        `No Task found with ID: ${taskId}`,
        traceId,
        'updateTask',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Task found with ID: ${taskId}`);
    }

    const taskStatus = await this.taskStatusRepository.findOne({
      where: { taskStatusId, isDeleted: false },
    });
    if (!taskStatus) {
      this.logger.error(
        `No TaskStatus found with ID: ${taskStatusId}`,
        traceId,
        'updateTask',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskStatus found with ID: ${taskStatusId}`,
      );
    }

    task.dateStart = dateStart;
    task.dateEnd = dateEnd;
    task.taskStatus = taskStatus;
    task.updatedBy = updatedBy;

    await this.taskRepository.save(task);
    this.logger.info(
      `Task with ID: ${taskId} updated`,
      traceId,
      'updateTask',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingTaskService.createZtrackingTaskEntity(task, traceId)
    ) {
      return task;
    }
  }

  async deleteTask(
    deleteTaskDto: DeleteTaskDto,
    traceId: string,
  ): Promise<void> {
    const { taskId } = deleteTaskDto;
    const task = await this.taskRepository.findOne({
      where: { taskId, isDeleted: false },
    });
    if (!task) {
      this.logger.error(
        `No Task found with ID: ${taskId}`,
        traceId,
        'deleteTask',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Task found with ID: ${taskId}`);
    }

    task.isDeleted = true;
    await this.taskRepository.save(task);
    this.logger.info(
      `Task with ID: ${taskId} marked as deleted`,
      traceId,
      'deleteTask',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingTaskService.createZtrackingTaskEntity(task, traceId);
  }

  async getOneTask(
    getOneTaskDto: GetOneTaskDto,
    traceId: string,
  ): Promise<TaskDto> {
    const { taskId } = getOneTaskDto;
    if (!taskId) {
      this.logger.error(
        'Provide taskId to retrieve the task',
        traceId,
        'getOneTask',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Provide taskId to retrieve the task');
    }

    const task = await this.taskRepository.findOne({
      where: { taskId, isDeleted: false },
      relations: [
        'taskStatus',
        'node',
        'node.nodeType',
        'isExecutedFrom',
        'isExecutedFrom.nodeExitType',
      ],
    });
    if (!task) {
      this.logger.error(
        `No Task found with ID: ${taskId}`,
        traceId,
        'getOneTask',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Task found with ID: ${taskId}`);
    }

    this.logger.info(
      `Task found with ID: ${taskId}`,
      traceId,
      'getOneTask',
      LogStreamLevel.ProdStandard,
    );
    return task;
  }

  async getManyTasks(
    getManyTasksDto: GetManyTasksDto,
    traceId: string,
  ): Promise<PaginatedTasksResponseDto> {
    const {
      nodeId,
      waveId,
      isDeleted,
      updatedBy,
      taskStatusName,
      dateStartFrom,
      dateStartTo,
      dateEndFrom,
      dateEndTo,
      pagination,
      sort = [],
    } = getManyTasksDto;

    // 1) Construct the base WHERE conditions
    const where: Record<string, any> = {
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(nodeId && { nodeId }),
      ...(waveId && { waveId }),
      ...(updatedBy && { updatedBy }),
    };

    this.logger.debug(
      `Filters for getManyTasks: ${JSON.stringify({ ...where, taskStatusName })}`,
      traceId,
      'getManyTasks',
      LogStreamLevel.ProdStandard,
    );

    // 2) Build base query
    let query = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.taskStatus', 'taskStatus')
      .where(where);

    if (taskStatusName) {
      query = query.andWhere('taskStatus.name = :taskStatusName', {
        taskStatusName,
      });
    }

    // 3) Apply dateStart range filters
    if (dateStartFrom && dateStartTo) {
      const fromDate = new Date(dateStartFrom);
      const toDate = new Date(dateStartTo);
      query = query.andWhere(
        'task.dateStart BETWEEN :dateStartFrom AND :dateStartTo',
        {
          dateStartFrom: fromDate,
          dateStartTo: toDate,
        },
      );
    } else if (dateStartFrom) {
      const fromDate = new Date(dateStartFrom);
      query = query.andWhere('task.dateStart >= :dateStartFrom', {
        dateStartFrom: fromDate,
      });
    } else if (dateStartTo) {
      const toDate = new Date(dateStartTo);
      query = query.andWhere('task.dateStart <= :dateStartTo', {
        dateStartTo: toDate,
      });
    }

    // 4) Apply dateEnd range filters
    if (dateEndFrom && dateEndTo) {
      const fromDate = new Date(dateEndFrom);
      const toDate = new Date(dateEndTo);
      query = query.andWhere(
        'task.dateEnd BETWEEN :dateEndFrom AND :dateEndTo',
        {
          dateEndFrom: fromDate,
          dateEndTo: toDate,
        },
      );
    } else if (dateEndFrom) {
      const fromDate = new Date(dateEndFrom);
      query = query.andWhere('task.dateEnd >= :dateEndFrom', {
        dateEndFrom: fromDate,
      });
    } else if (dateEndTo) {
      const toDate = new Date(dateEndTo);
      query = query.andWhere('task.dateEnd <= :dateEndTo', {
        dateEndTo: toDate,
      });
    }

    // 5) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `task.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting by creation date
      query = query.orderBy('task.createdAt', 'ASC');
    }

    // 6) Get total count for pagination calculation
    const totalCount = await query.getCount();

    // 7) Apply pagination if provided
    let isPaginated = false;
    let maxPages: number | null = null;
    let currentPage: number | null = null;
    let usedPageSize: number | null = null;

    if (pagination) {
      isPaginated = true;
      const { page = 1, pageSize = 25 } = pagination;
      const skip = (page - 1) * pageSize;
      query = query.skip(skip).take(pageSize);
      maxPages = Math.ceil(totalCount / pageSize);
      currentPage = page;
      usedPageSize = pageSize;
    }

    // 8) Execute query
    const tasks = await query.getMany();

    this.logger.info(
      `${tasks.length} Task(s) found in the database`,
      traceId,
      'getManyTasks',
      LogStreamLevel.ProdStandard,
    );

    // 9) Return structured pagination response
    return {
      data: tasks,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
