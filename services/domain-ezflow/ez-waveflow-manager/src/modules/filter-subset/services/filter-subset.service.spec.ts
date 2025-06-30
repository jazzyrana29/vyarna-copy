import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateFilterSubsetDto,
  mockDeleteFilterSubsetDto,
  mockFilterSubsetCase001,
  mockGetOneFilterSubsetDto,
  mockTraceIdForFilterSubset as mockTraceId,
  mockUpdateFilterSubsetDto,
} from '../test-values.spec';
import { FilterSubsetService } from './filter-subset.service';
import { FilterSubset } from '../../../entities/filter-subset.entity';
import { ZtrackingFilterSubsetService } from './ztracking-filter-subset.service';

describe('FilterSubsetService', () => {
  let service: FilterSubsetService;
  let repository: Repository<FilterSubset>;
  let ztrackingService: ZtrackingFilterSubsetService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilterSubsetService,
        {
          provide: getRepositoryToken(FilterSubset),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingFilterSubsetService,
          useValue: {
            createZtrackingForFilterSubset: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<FilterSubsetService>(FilterSubsetService);
    repository = module.get<Repository<FilterSubset>>(
      getRepositoryToken(FilterSubset),
    );
    ztrackingService = module.get<ZtrackingFilterSubsetService>(
      ZtrackingFilterSubsetService,
    );
  });

  describe('createFilterSubset', () => {
    it('should create and return a new filterSubset and call the ztracking service', async () => {
      // Mock the repository save call to return the created entity
      jest.spyOn(repository, 'save').mockResolvedValue(mockFilterSubsetCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFilterSubset')
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.createFilterSubset(
        mockCreateFilterSubsetDto,
        mockTraceId,
      );

      // Assertions
      expect(result).toEqual(mockFilterSubsetCase001);

      // Ensure repository save is called with the correct data
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockCreateFilterSubsetDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateFilterSubset', () => {
    it('should update and return the updated filterSubset and called the ztracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockFilterSubsetCase001);
      jest.spyOn(repository, 'save').mockResolvedValue(mockFilterSubsetCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFilterSubset')
        .mockResolvedValue(true);

      const result = await service.updateFilterSubset(
        mockUpdateFilterSubsetDto,
        mockTraceId,
      );

      expect(result).toEqual(mockFilterSubsetCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockUpdateFilterSubsetDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the filterSubset is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateFilterSubset(mockUpdateFilterSubsetDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFilterSubset', () => {
    it('should mark the filterSubset as deleted and call the zTracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockFilterSubsetCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockFilterSubsetCase001,
        isDeleted: true,
      } as FilterSubset);

      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFilterSubset')
        .mockResolvedValue(true);

      const result = await service.deleteFilterSubset(
        mockDeleteFilterSubsetDto,
        mockTraceId,
      );

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteFilterSubset(
          {
            filterSubsetId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the filterSubset is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteFilterSubset(mockDeleteFilterSubsetDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneFilterSubset', () => {
    it('should return an evaluation variable group', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockFilterSubsetCase001);

      const result = await service.getOneFilterSubset(
        mockGetOneFilterSubsetDto,
        mockTraceId,
      );

      expect(result).toEqual(mockFilterSubsetCase001);
    });

    it('should throw NotFoundException if the filterSubset is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneFilterSubset(mockGetOneFilterSubsetDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneFilterSubset(
          { filterSubsetId: '', isDeleted: true },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
