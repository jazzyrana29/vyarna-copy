import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateFilterDto,
  mockDeleteFilterDto,
  mockFilterCase001,
  mockGetOneFilterDto,
  mockTraceIdForFilter as mockTraceId,
  mockUpdateFilterDto,
} from '../test-values.spec';
import { FilterService } from './filter.service';
import { Filter } from '../../../entities/filter.entity';
import { ZtrackingFilterService } from './ztracking-filter.service';

describe('FilterService', () => {
  let service: FilterService;
  let repository: Repository<Filter>;
  let ztrackingService: ZtrackingFilterService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilterService,
        {
          provide: getRepositoryToken(Filter),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingFilterService,
          useValue: {
            createZtrackingForFilter: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<FilterService>(FilterService);
    repository = module.get<Repository<Filter>>(getRepositoryToken(Filter));
    ztrackingService = module.get<ZtrackingFilterService>(
      ZtrackingFilterService,
    );
  });

  describe('createFilter', () => {
    it('should create and return a new filter and call the ztracking service', async () => {
      // Mock the repository save call to return the created entity
      jest.spyOn(repository, 'save').mockResolvedValue(mockFilterCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFilter')
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.createFilter(
        mockCreateFilterDto,
        mockTraceId,
      );

      // Assertions
      expect(result).toEqual(mockFilterCase001);

      // Ensure repository save is called with the correct data
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockCreateFilterDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateFilter', () => {
    it('should update and return the updated filter and called the ztracking service', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockFilterCase001);
      jest.spyOn(repository, 'save').mockResolvedValue(mockFilterCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFilter')
        .mockResolvedValue(true);

      const result = await service.updateFilter(
        mockUpdateFilterDto,
        mockTraceId,
      );

      expect(result).toEqual(mockFilterCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockUpdateFilterDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the filter is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateFilter(mockUpdateFilterDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFilter', () => {
    it('should mark the filter as deleted and call the zTracking service', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockFilterCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockFilterCase001,
        isDeleted: true,
      } as Filter);

      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFilter')
        .mockResolvedValue(true);

      const result = await service.deleteFilter(
        mockDeleteFilterDto,
        mockTraceId,
      );

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteFilter(
          {
            filterId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the filter is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteFilter(mockDeleteFilterDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneFilter', () => {
    it('should return an evaluation variable group', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockFilterCase001);

      const result = await service.getOneFilter(
        mockGetOneFilterDto,
        mockTraceId,
      );

      expect(result).toEqual(mockFilterCase001);
    });

    it('should throw NotFoundException if the filter is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneFilter(mockGetOneFilterDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneFilter(
          { filterId: '', filterName: '', isDeleted: true },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
