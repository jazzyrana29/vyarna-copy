import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateFilterSubsetItemDto,
  mockDeleteFilterSubsetItemDto,
  mockFilterSubsetItemCase001,
  mockGetOneFilterSubsetItemDto,
  mockTraceIdForFilterSubsetItem as mockTraceId,
  mockUpdateFilterSubsetItemDto,
} from '../test-values.spec';
import { FilterSubsetItemService } from './filter-subset-item.service';
import { FilterSubsetItem } from '../../../entities/filter-subset-item.entity';
import { ZtrackingFilterSubsetItemService } from './ztracking-filter-subset-item.service';

describe('FilterSubsetItemService', () => {
  let service: FilterSubsetItemService;
  let repository: Repository<FilterSubsetItem>;
  let ztrackingService: ZtrackingFilterSubsetItemService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilterSubsetItemService,
        {
          provide: getRepositoryToken(FilterSubsetItem),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingFilterSubsetItemService,
          useValue: {
            createZtrackingForFilterSubsetItem: jest
              .fn()
              .mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<FilterSubsetItemService>(FilterSubsetItemService);
    repository = module.get<Repository<FilterSubsetItem>>(
      getRepositoryToken(FilterSubsetItem),
    );
    ztrackingService = module.get<ZtrackingFilterSubsetItemService>(
      ZtrackingFilterSubsetItemService,
    );
  });

  describe('createFilterSubsetItem', () => {
    it('should create and return a new filterSubsetItem and call the ztracking service', async () => {
      // Mock the repository save call to return the created entity
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockFilterSubsetItemCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFilterSubsetItem')
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.createFilterSubsetItem(
        mockCreateFilterSubsetItemDto,
        mockTraceId,
      );

      // Assertions
      expect(result).toEqual(mockFilterSubsetItemCase001);

      // Ensure repository save is called with the correct data
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockCreateFilterSubsetItemDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateFilterSubsetItem', () => {
    it('should update and return the updated filterSubsetItem and called the ztracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockFilterSubsetItemCase001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockFilterSubsetItemCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFilterSubsetItem')
        .mockResolvedValue(true);

      const result = await service.updateFilterSubsetItem(
        mockUpdateFilterSubsetItemDto,
        mockTraceId,
      );

      expect(result).toEqual(mockFilterSubsetItemCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockUpdateFilterSubsetItemDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the filterSubsetItem is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateFilterSubsetItem(
          mockUpdateFilterSubsetItemDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFilterSubsetItem', () => {
    it('should mark the filterSubsetItem as deleted and call the zTracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockFilterSubsetItemCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockFilterSubsetItemCase001,
        isDeleted: true,
      } as FilterSubsetItem);

      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFilterSubsetItem')
        .mockResolvedValue(true);

      const result = await service.deleteFilterSubsetItem(
        mockDeleteFilterSubsetItemDto,
        mockTraceId,
      );

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteFilterSubsetItem(
          {
            filterSubsetItemId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the filterSubsetItem is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteFilterSubsetItem(
          mockDeleteFilterSubsetItemDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneFilterSubsetItem', () => {
    it('should return an evaluation variable group', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockFilterSubsetItemCase001);

      const result = await service.getOneFilterSubsetItem(
        mockGetOneFilterSubsetItemDto,
        mockTraceId,
      );

      expect(result).toEqual(mockFilterSubsetItemCase001);
    });

    it('should throw NotFoundException if the filterSubsetItem is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneFilterSubsetItem(
          mockGetOneFilterSubsetItemDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneFilterSubsetItem(
          { filterSubsetItemId: '', isDeleted: true },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
