import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Action } from '../../../entities/action.entity';
import { Node } from '../../../entities/node.entity';
import { ActionVariable } from '../../../entities/action-variable.entity';

import {
  CreateActionDto,
  DeleteActionDto,
  GetOneActionDto,
  UpdateActionDto,
  FuzzySearchActionTypesDto,
  PaginatedActionTypesResponseDto,
  FuzzySearchActionVariablesDto,
  PaginatedActionVariablesResponseDto,
} from 'ez-utils';

import { ZtrackingActionService } from './ztracking-action.service';
import { AddToReturnVariables } from '../../../entities/actions/add-to-return-variables.action';
import { ACTION_OUTPUTS } from '../../../utils/actionsTypes.data';

@Injectable()
export class ActionService {
  private logger = getLoggerConfig(ActionService.name);

  constructor(
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    @InjectRepository(ActionVariable)
    private readonly actionVariableRepository: Repository<ActionVariable>,
    private readonly dataSource: DataSource,
    private readonly ztrackingActionService: ZtrackingActionService,
  ) {
    this.logger.debug(
      `${ActionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createAction(
    createActionDto: CreateActionDto,
    traceId: string,
  ): Promise<Action> {
    if (!createActionDto.actionType) {
      this.logger.error(
        'actionType is required',
        traceId,
        'createAction',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('actionType is required');
    }

    const node = await this.nodeRepository.findOneBy({
      nodeId: createActionDto.nodeId,
    });
    if (!node) {
      this.logger.error(
        'Node not found',
        traceId,
        'createAction',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException('Node not found');
    }

    const createdAction = await this.actionRepository.save(
      this.actionRepository.create(createActionDto),
    );

    node.action = createdAction;
    await this.nodeRepository.save(node);

    this.logger.info(
      `Action created with ID: ${createdAction.actionId}`,
      traceId,
      'createAction',
      LogStreamLevel.ProdStandard,
    );

    const refreshedAction = await this.actionRepository.findOne({
      where: { actionId: createdAction.actionId },
      relations: ['actionVariables'],
    });
    if (refreshedAction) {
      await this.processTemplateProperties(refreshedAction, traceId);
    }

    if (
      await this.ztrackingActionService.createZtrackingForAction(
        refreshedAction || createdAction,
        traceId,
      )
    )
      return refreshedAction || createdAction;
  }

  async updateAction(
    updateActionDto: UpdateActionDto,
    traceId: string,
  ): Promise<Action> {
    if (!updateActionDto.actionId) {
      this.logger.error(
        'actionId is required to update action',
        traceId,
        'updateAction',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('actionId is required to update action');
    }

    // Retrieve the action including its actionVariables, associated node, and the node's flow.
    const action = await this.actionRepository.findOne({
      where: { actionId: updateActionDto.actionId },
      relations: ['actionVariables', 'node', 'node.flow'],
    });
    if (!action) {
      this.logger.error(
        `No active Action found with ID: ${updateActionDto.actionId}`,
        traceId,
        'updateAction',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No active Action found with ID: ${updateActionDto.actionId}`,
      );
    }

    // If the Action belongs to a Node whose Flow is published, restrict updates.
    if (action.node && action.node.flow && action.node.flow.isPublished) {
      const allowedFields = [];
      const updateKeys = Object.keys(updateActionDto);
      const invalidFields = updateKeys.filter(
        (key) => !allowedFields.includes(key) && key !== 'actionId',
      );
      if (invalidFields.length > 0) {
        this.logger.error(
          `Cannot update fields [${invalidFields.join(', ')}] on an action whose flow is published.`,
          traceId,
          'updateAction',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on an action whose flow is published.`,
        );
      }
    }

    // Proceed with updating the action.
    const updatedAction = await this.actionRepository.save({
      ...action,
      ...updateActionDto,
    });

    this.logger.info(
      `Action updated with ID: ${updatedAction.actionId}`,
      traceId,
      'updateAction',
      LogStreamLevel.DebugHeavy,
    );

    const refreshedAction = await this.actionRepository.findOne({
      where: { actionId: updatedAction.actionId },
      relations: ['actionVariables', 'node', 'node.flow'],
    });
    if (refreshedAction) {
      await this.processTemplateProperties(refreshedAction, traceId);
    }

    if (
      await this.ztrackingActionService.createZtrackingForAction(
        refreshedAction || updatedAction,
        traceId,
      )
    ) {
      return refreshedAction || updatedAction;
    }
  }

  async deleteAction(
    deleteActionDto: DeleteActionDto,
    traceId: string,
  ): Promise<Action> {
    if (!deleteActionDto.actionId) {
      this.logger.error(
        'actionId is required to delete action',
        traceId,
        'deleteAction',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('actionId is required to delete action');
    }

    const action = await this.actionRepository.findOne({
      where: { actionId: deleteActionDto.actionId, isDeleted: false },
    });
    if (!action) {
      this.logger.error(
        `No active Action found with ID: ${deleteActionDto.actionId}`,
        traceId,
        'deleteAction',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No active Action found with ID: ${deleteActionDto.actionId}`,
      );
    }

    action.isDeleted = true;
    if (deleteActionDto.updatedBy) action.updatedBy = deleteActionDto.updatedBy;
    const deletedAction = await this.actionRepository.save(action);

    this.logger.info(
      `Action deleted with ID: ${deletedAction.actionId}`,
      traceId,
      'deleteAction',
      LogStreamLevel.DebugHeavy,
    );

    await this.ztrackingActionService.createZtrackingForAction(
      deletedAction,
      traceId,
    );

    return deletedAction;
  }

  async getOneAction(
    getOneActionDto: GetOneActionDto,
    traceId: string,
  ): Promise<Action> {
    const { actionId, name, isDeleted = false } = getOneActionDto;
    if (!actionId && !name) {
      this.logger.error(
        'Either actionId or name must be provided',
        traceId,
        'getOneAction',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Either actionId or name must be provided');
    }

    const where: any = { isDeleted };
    if (actionId) where.actionId = actionId;
    if (name) where.name = name;

    const action = await this.actionRepository.findOne({
      where,
      // relations: ['actionVariables'],
      relations: ['actionVariables', 'node', 'node.flow'],
    });
    if (!action) {
      this.logger.error(
        `Action not found with ID: ${actionId} or name: ${name}`,
        traceId,
        'getOneAction',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `Action not found with ID: ${actionId} or name: ${name}`,
      );
    }

    this.logger.info(
      `Action retrieved with ID: ${action.actionId}`,
      traceId,
      'getOneAction',
      LogStreamLevel.DebugHeavy,
    );
    return action;
  }

  async fuzzySearchActionTypes(
    fuzzySearchActionTypesDto: FuzzySearchActionTypesDto,
    traceId: string,
  ): Promise<PaginatedActionTypesResponseDto> {
    const {
      actionType,
      fuzzyActionType,
      pagination,
      sort = [],
    } = fuzzySearchActionTypesDto;

    // Retrieve metadata for the base Action entity
    const actionMetadata = this.dataSource.getMetadata(Action);
    const childMetadatas = actionMetadata.childEntityMetadatas;

    // Build the list of action types with their metadata properties
    let childrenProperties = childMetadatas.map((child) => {
      const typeKey = child.discriminatorValue as keyof typeof ACTION_OUTPUTS;

      // Input columsns
      const inputColumn = child.columns
        .filter(
          (col) =>
            ![
              'actionId',
              'nodeId',
              'isDeleted',
              'updatedBy',
              'createdAt',
              'updatedAt',
              'actionType',
            ].includes(col.propertyName),
        )
        .map((col) => ({
          propertyName: col.propertyName,
          type: col.type,
        }));

      // Output Columns
      const outputColumn =
        ACTION_OUTPUTS[typeKey]?.map((o) => ({
          propertyName: o.propertyName,
          type: o.type,
        })) ?? [];

      return {
        actionType: child.discriminatorValue,
        inputColumn,
        outputColumn,
      };
    });

    // Apply fuzzy match filter if provided; otherwise, apply exact match filter if provided
    if (fuzzyActionType) {
      childrenProperties = childrenProperties.filter((child) =>
        child.actionType.toLowerCase().includes(fuzzyActionType.toLowerCase()),
      );
    } else if (actionType) {
      childrenProperties = childrenProperties.filter(
        (child) => child.actionType.toLowerCase() === actionType.toLowerCase(),
      );
    }

    // Apply in-memory sorting based on actionType if specified
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s) => {
        if (s.by === 'actionType') {
          childrenProperties.sort((a, b) => {
            const comparison = a.actionType.localeCompare(b.actionType);
            return s.order === 'ASC' ? comparison : -comparison;
          });
        }
        // Additional sort criteria can be added here if needed.
      });
    } else {
      // Default sorting by actionType in ascending order
      childrenProperties.sort((a, b) =>
        a.actionType.localeCompare(b.actionType),
      );
    }

    // In-memory pagination
    let isPaginated = false;
    let maxPages: number | null = null;
    let currentPage: number | null = null;
    let usedPageSize: number | null = null;
    let paginatedData = childrenProperties;

    if (pagination) {
      isPaginated = true;
      const { page = 1, pageSize = 25 } = pagination;
      const skip = (page - 1) * pageSize;
      paginatedData = childrenProperties.slice(skip, skip + pageSize);
      maxPages = Math.ceil(childrenProperties.length / pageSize);
      currentPage = page;
      usedPageSize = pageSize;
    }

    // Return the structured paginated response
    return {
      data: paginatedData,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  async fuzzySearchActionVariables(
    fuzzySearchActionVariablesDto: FuzzySearchActionVariablesDto,
    traceId: string,
  ): Promise<PaginatedActionVariablesResponseDto> {
    const {
      // Fuzzy search parameters (higher priority)
      fuzzyActionId,
      fuzzyActionType,
      fuzzyActionName,
      fuzzyActionVariableName,
      fuzzyActionVariableDataType,
      fuzzyActionVariableId,
      // Exact match parameters (fallback if fuzzy not provided)
      actionId,
      actionType,
      actionName,
      actionVariableName,
      actionVariableDataType,
      actionVariableId,
      pagination,
      sort = [],
    } = fuzzySearchActionVariablesDto;

    // Build a query with a left join to include Action fields.
    const qb = this.actionVariableRepository
      .createQueryBuilder('actionVariable')
      .leftJoinAndSelect('actionVariable.actions', 'action');

    // --- ActionVariable fields ---
    // actionVariableId
    if (fuzzyActionVariableId) {
      qb.andWhere(
        'actionVariable.actionVariableId ILIKE :fuzzyActionVariableId',
        { fuzzyActionVariableId: `%${fuzzyActionVariableId}%` },
      );
    } else if (actionVariableId) {
      qb.andWhere('actionVariable.actionVariableId = :actionVariableId', {
        actionVariableId,
      });
    }

    // actionVariable.name
    if (fuzzyActionVariableName) {
      qb.andWhere('actionVariable.name ILIKE :fuzzyActionVariableName', {
        fuzzyActionVariableName: `%${fuzzyActionVariableName}%`,
      });
    } else if (actionVariableName) {
      qb.andWhere('actionVariable.name = :actionVariableName', {
        actionVariableName,
      });
    }

    // actionVariable.dataType
    if (fuzzyActionVariableDataType) {
      qb.andWhere(
        'actionVariable.dataType ILIKE :fuzzyActionVariableDataType',
        { fuzzyActionVariableDataType: `%${fuzzyActionVariableDataType}%` },
      );
    } else if (actionVariableDataType) {
      qb.andWhere('actionVariable.dataType = :actionVariableDataType', {
        actionVariableDataType,
      });
    }

    // --- Action fields ---
    // actionId
    if (fuzzyActionId) {
      qb.andWhere('action.actionId ILIKE :fuzzyActionId', {
        fuzzyActionId: `%${fuzzyActionId}%`,
      });
    } else if (actionId) {
      qb.andWhere('action.actionId = :actionId', { actionId });
    }

    // actionType
    if (fuzzyActionType) {
      qb.andWhere('action.actionType ILIKE :fuzzyActionType', {
        fuzzyActionType: `%${fuzzyActionType}%`,
      });
    } else if (actionType) {
      qb.andWhere('action.actionType = :actionType', { actionType });
    }

    // action.name
    if (fuzzyActionName) {
      qb.andWhere('action.name ILIKE :fuzzyActionName', {
        fuzzyActionName: `%${fuzzyActionName}%`,
      });
    } else if (actionName) {
      qb.andWhere('action.name = :actionName', { actionName });
    }

    // --- Sorting ---
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s) => {
        let orderByField: string;
        switch (s.by) {
          case 'actionId':
            orderByField = 'action.actionId';
            break;
          case 'actionType':
            orderByField = 'action.actionType';
            break;
          case 'action.name':
            orderByField = 'action.name';
            break;
          case 'actionVariable.name':
            orderByField = 'actionVariable.name';
            break;
          case 'actionVariable.dataType':
            orderByField = 'actionVariable.dataType';
            break;
          case 'actionVariableId':
            orderByField = 'actionVariable.actionVariableId';
            break;
          default:
            orderByField = 'actionVariable.name';
        }
        qb.addOrderBy(orderByField, s.order === 'DESC' ? 'DESC' : 'ASC');
      });
    } else {
      // Default sort by actionVariable.name in ascending order.
      qb.orderBy('actionVariable.name', 'ASC');
    }

    // --- Pagination ---
    let isPaginated = false;
    let maxPages: number | null = null;
    let currentPage: number | null = null;
    let usedPageSize: number | null = null;
    if (pagination) {
      isPaginated = true;
      const { page = 1, pageSize = 25 } = pagination;
      qb.skip((page - 1) * pageSize).take(pageSize);
    }

    // Execute query and count total matching rows.
    const [data, total] = await qb.getManyAndCount();

    if (pagination) {
      const { page = 1, pageSize = 25 } = pagination;
      maxPages = Math.ceil(total / pageSize);
      currentPage = page;
      usedPageSize = pageSize;
    }

    return {
      data,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  private async processTemplateProperties(
    action: Action,
    traceId: string,
  ): Promise<void> {
    this.logger.debug(
      `Processing template properties for action with ID: ${action.actionId}`,
      traceId,
      'processTemplateProperties',
      LogStreamLevel.DebugLight,
    );

    // Regular expression to detect template strings in the format {{variableName}}
    const templateRegex = /{{\s*(\w+)\s*}}/g;

    // Base fields from the Action entity that are not processed for template parsing.
    const baseFields = new Set([
      'actionId',
      'actionType',
      'name',
      'description',
      'node',
      'nodeId',
      'actionVariables',
      'isDeleted',
      'updatedBy',
      'createdAt',
      'updatedAt',
    ]);

    // Create a set of all variable names that are currently referenced in the action.
    const newTemplateVariables = new Set<string>();
    for (const key in action) {
      if (baseFields.has(key)) continue;

      const value = action[key];
      if (typeof value === 'string') {
        let match;
        while ((match = templateRegex.exec(value)) !== null) {
          // Add the extracted variable name to the set.
          newTemplateVariables.add(match[1]);
        }
      }
    }

    if (action instanceof AddToReturnVariables) {
      const rv: Record<string, any> =
        (action as AddToReturnVariables).returnVariables || {};
      for (const rawValue of Object.values(rv)) {
        if (typeof rawValue === 'string') {
          let match: RegExpExecArray | null;
          while ((match = templateRegex.exec(rawValue)) !== null) {
            newTemplateVariables.add(match[1]);
          }
        }
      }
      this.logger.debug(
        `Also extracted from returnVariables: ${Array.from(newTemplateVariables).join(', ')}`,
        traceId,
        'processTemplateProperties',
        LogStreamLevel.DebugLight,
      );
    }

    this.logger.debug(
      `New template variables extracted: ${Array.from(newTemplateVariables).join(', ')}`,
      traceId,
      'processTemplateProperties',
      LogStreamLevel.DebugLight,
    );

    // Ensure the action has a defined collection of actionVariables.
    action.actionVariables = action.actionVariables || [];

    // Build a lookup map for the variables that currently exist in the action.
    const existingVariables = new Map<string, ActionVariable>();
    for (const av of action.actionVariables) {
      existingVariables.set(av.name, av);
    }

    // Identify and remove ActionVariables that are no longer referenced.
    const toDelete: ActionVariable[] = [];
    for (const [varName, actionVar] of existingVariables.entries()) {
      if (!newTemplateVariables.has(varName)) {
        toDelete.push(actionVar);
      }
    }
    if (toDelete.length > 0) {
      for (const variable of toDelete) {
        await this.actionVariableRepository.remove(variable);
      }
      // Update the action's list by filtering out the removed variables.
      action.actionVariables = action.actionVariables.filter((av) =>
        newTemplateVariables.has(av.name),
      );
      this.logger.info(
        `Removed ${toDelete.length} unused ActionVariable(s) from action with ID: ${action.actionId}`,
        traceId,
        'processTemplateProperties',
        LogStreamLevel.DebugLight,
      );
    }

    // Identify variables that need to be added (referenced in the action but not in the existing variables).
    const newActionVariables: ActionVariable[] = [];
    for (const variableName of newTemplateVariables) {
      if (!existingVariables.has(variableName)) {
        const newVariable = new ActionVariable();
        newVariable.name = variableName;
        newVariable.defaultValue = ''; // Set default value as needed
        newVariable.dataType = 'Text'; // Default dataType
        newVariable.isDeleted = false;
        newActionVariables.push(newVariable);
        this.logger.debug(
          `Adding new ActionVariable with name "${variableName}" for action with ID: ${action.actionId}`,
          traceId,
          'processTemplateProperties',
          LogStreamLevel.DebugLight,
        );
      }
    }
    if (newActionVariables.length > 0) {
      await this.actionVariableRepository.save(newActionVariables);
      action.actionVariables =
        action.actionVariables.concat(newActionVariables);
      this.logger.info(
        `Added ${newActionVariables.length} new ActionVariable(s) to action with ID: ${action.actionId}`,
        traceId,
        'processTemplateProperties',
        LogStreamLevel.DebugLight,
      );
    } else {
      this.logger.debug(
        `No new template variables found for action with ID: ${action.actionId}`,
        traceId,
        'processTemplateProperties',
        LogStreamLevel.DebugLight,
      );
    }

    // Save the updated action with its modified actionVariables.
    await this.actionRepository.save(action);
  }
}
