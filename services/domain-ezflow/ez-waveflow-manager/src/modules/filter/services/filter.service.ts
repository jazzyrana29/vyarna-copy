import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Filter } from '../../../entities/filter.entity';
import { NodeExit } from '../../../entities/node-exit.entity';
import { Node } from '../../../entities/node.entity';
import { NodeExitType } from '../../../entities/node-exit-type.entity';

import {
  CreateFilterDto,
  DeleteFilterDto,
  FilterDto,
  GetOneFilterDto,
  UpdateFilterDto,
} from 'ez-utils';

import { ZtrackingFilterService } from './ztracking-filter.service';

@Injectable()
export class FilterService {
  private logger = getLoggerConfig(FilterService.name);

  constructor(
    @InjectRepository(Filter)
    private readonly filterRepository: Repository<Filter>,
    @InjectRepository(NodeExit)
    private readonly nodeExitRepository: Repository<NodeExit>,
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    @InjectRepository(NodeExitType)
    private readonly nodeExitTypeRepository: Repository<NodeExitType>,
    private readonly ztrackingFilterService: ZtrackingFilterService, // Injecting ZtrackingFilterService
  ) {
    this.logger.debug(
      `${FilterService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createFilter(
    createFilterDto: CreateFilterDto,
    traceId: string,
  ): Promise<FilterDto> {
    // 1) Find the Node linked to the manifold
    if (!createFilterDto.manifoldId) {
      this.logger.error(
        `manifoldId is required to create a filter.`,
        traceId,
        'createFilter',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`manifoldId is required to create a filter.`);
    }

    const node = await this.nodeRepository.findOne({
      where: { manifoldId: createFilterDto.manifoldId },
    });
    if (!node) {
      this.logger.error(
        `No Node found associated with the given manifoldId: ${createFilterDto.manifoldId}`,
        traceId,
        'createFilter',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Node found associated with the given manifoldId: ${createFilterDto.manifoldId}`,
      );
    }

    // 2) Fetch the NodeExitType "EXECUTED" from the DB
    const executedNodeExitType = await this.nodeExitTypeRepository.findOne({
      where: { name: 'EXECUTED', isDeleted: false },
    });
    if (!executedNodeExitType) {
      this.logger.error(
        `NodeExitType "EXECUTED" not found`,
        traceId,
        'createFilter',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`NodeExitType "EXECUTED" not found`);
    }

    // 3) Create a new NodeExit for that node, forced to type = EXECUTED
    const nodeExit = this.nodeExitRepository.create({
      sourceNodeId: node.nodeId,
      nodeExitTypeId: executedNodeExitType.nodeExitTypeId,
    });
    await this.nodeExitRepository.save(nodeExit);

    // 4) Calculate the new manifoldOrder based on the highest current value for this manifold.
    // It's a good idea to filter by the same manifold (if filters are manifold-specific).
    const { max } = await this.filterRepository
      .createQueryBuilder('f')
      .select('MAX(f.manifoldOrder)', 'max')
      .where('f.isDeleted = false')
      .andWhere('f.manifoldId = :manifoldId', {
        manifoldId: createFilterDto.manifoldId,
      })
      .getRawOne();

    const maxOrder = max ?? 0; // Use 0 if no filters exist yet

    const createdFilter = await this.filterRepository.save(
      this.filterRepository.create({
        ...createFilterDto,
        manifoldOrder: maxOrder + 1,
        nodeExitId: nodeExit.nodeExitId,
      }),
    );
    nodeExit.filter = createdFilter;
    await this.nodeExitRepository.save(nodeExit);

    this.logger.info(
      `Filter created with ID: ${createdFilter.filterId}`,
      traceId,
      'createFilter',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFilterService.createZtrackingForFilter(
        createdFilter,
        traceId,
      )
    )
      return createdFilter;
  }

  async updateFilter(
    updateFilterDto: UpdateFilterDto,
    traceId: string,
  ): Promise<FilterDto> {
    const filter = await this.filterRepository.findOne({
      where: { filterId: updateFilterDto.filterId },
      relations: ['manifold', 'manifold.node', 'manifold.node.flow'],
    });

    if (!filter) {
      throw new NotFoundException(
        `No Filter found with ID: ${updateFilterDto.filterId}`,
      );
    }

    if (filter.manifold?.node?.flow?.isPublished) {
      const allowedFields = [];
      const updateKeys = Object.keys(updateFilterDto);
      const invalidFields = updateKeys.filter(
        (key) => key !== 'filterId' && !allowedFields.includes(key),
      );

      if (invalidFields.length > 0) {
        this.logger.error(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on a filter of a published flow.`,
          traceId,
          'updateFilter',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on a filter of a published flow.`,
        );
      }
    }

    const oldOrder = filter.manifoldOrder;
    const newOrder = updateFilterDto.manifoldOrder;

    if (newOrder !== undefined && newOrder !== oldOrder) {
      if (newOrder < oldOrder) {
        await this.filterRepository
          .createQueryBuilder()
          .update(Filter)
          .set({ manifoldOrder: () => 'manifoldOrder + 1' })
          .where('manifoldOrder >= :newOrder', { newOrder })
          .andWhere('manifoldOrder < :oldOrder', { oldOrder })
          .andWhere('filterId != :filterId', { filterId: filter.filterId })
          .andWhere('isDeleted = false')
          .execute();
      } else {
        await this.filterRepository
          .createQueryBuilder()
          .update(Filter)
          .set({ manifoldOrder: () => 'manifoldOrder - 1' })
          .where('manifoldOrder > :oldOrder', { oldOrder })
          .andWhere('manifoldOrder <= :newOrder', { newOrder })
          .andWhere('filterId != :filterId', { filterId: filter.filterId })
          .andWhere('isDeleted = false')
          .execute();
      }

      filter.manifoldOrder = newOrder;
    }

    const updatedFilter = await this.filterRepository.save({
      ...filter,
      ...updateFilterDto,
      nodeExitId: filter.nodeExitId,
    });

    this.logger.info(
      `Filter with ID: ${updatedFilter.filterId} updated`,
      traceId,
      'updateFilter',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFilterService.createZtrackingForFilter(
        updatedFilter,
        traceId,
      )
    )
      return updatedFilter;
  }

  async deleteFilter(
    { filterId = '', updatedBy = '' }: DeleteFilterDto,
    traceId: string,
  ): Promise<FilterDto> {
    if (!filterId || !updatedBy) {
      this.logger.error(
        'You need to provide both filterId and updatedBy',
        traceId,
        'deleteFilter',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'You need to provide both filterId and updatedBy',
      );
    }

    const filter = await this.filterRepository.findOne({
      where: { filterId },
    });

    if (!filter) {
      this.logger.error(
        `No Filter found with ID: ${filterId}`,
        traceId,
        'deleteFilter',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Filter found with ID: ${filterId}`);
    }

    filter.isDeleted = true;
    filter.updatedBy = updatedBy;

    if (filter.nodeExitId) {
      const nodeExit = await this.nodeExitRepository.findOne({
        where: { nodeExitId: filter.nodeExitId },
      });
      if (nodeExit) {
        nodeExit.isDeleted = true;
        nodeExit.updatedBy = updatedBy;
        await this.nodeExitRepository.save(nodeExit);
      }
    }

    const deletedFilter = await this.filterRepository.save(filter);

    this.logger.info(
      `Filter with ID: ${filterId} marked as deleted`,
      traceId,
      'deleteFilter',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFilterService.createZtrackingForFilter(
        deletedFilter,
        traceId,
      )
    )
      return deletedFilter;
  }

  async getOneFilter(
    { filterId = '', filterName = '', isDeleted = false }: GetOneFilterDto,
    traceId: string,
  ): Promise<FilterDto> {
    if (!filterId && !filterName) {
      this.logger.error(
        'Either provide filterId or filterName',
        traceId,
        'getOneFilter',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Either provide filterId or filterName');
    }

    const where: FindOptionsWhere<Filter> = {};
    if (filterName) where.filterName = filterName;
    if (filterId) where.filterId = filterId;
    where.isDeleted = isDeleted;
    const filter = await this.filterRepository.findOne({
      where,
      relations: [
        'manifold',
        'nodeExit',
        'filterSubsets',
        'filterSubsets.filterSubsetItems',
      ],
    });

    if (!filter) {
      this.logger.error(
        `No Filter found with ID: ${filterId} or name: ${filterName}`,
        traceId,
        'getOneFilter',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Filter found with ID: ${filterId} or name: ${filterName}`,
      );
    }

    this.logger.info(
      `Filter found with ID: ${filter.filterId}`,
      traceId,
      'getOneFilter',
      LogStreamLevel.ProdStandard,
    );

    return filter;
  }
}
