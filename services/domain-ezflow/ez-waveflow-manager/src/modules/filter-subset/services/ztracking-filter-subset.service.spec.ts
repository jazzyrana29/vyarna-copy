import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockFilterSubsetCase001,
  mockGetZtrackingFilterSubsetDto,
  mockTraceIdForFilterSubset,
  mockZtrackingFilterSubsetCase001,
} from '../test-values.spec';
import { ZtrackingFilterSubsetService } from './ztracking-filter-subset.service';
import { ZtrackingFilterSubset } from '../../../entities/ztracking-filter-subset.entity';

describe('ZtrackingFilterSubsetService', () => {
  let service: ZtrackingFilterSubsetService;
  let repository: Repository<ZtrackingFilterSubset>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingFilterSubsetService,
        {
          provide: getRepositoryToken(ZtrackingFilterSubset),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingFilterSubsetService>(
      ZtrackingFilterSubsetService,
    );
    repository = module.get<Repository<ZtrackingFilterSubset>>(
      getRepositoryToken(ZtrackingFilterSubset),
    );
  });

  describe('createZtrackingForFilterSubset', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest
        .fn()
        .mockResolvedValue(mockZtrackingFilterSubsetCase001);

      const result = await service.createZtrackingForFilterSubset(
        mockFilterSubsetCase001,
        mockTraceIdForFilterSubset,
      );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForFilterSubset', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValue([mockZtrackingFilterSubsetCase001]);

      const result = await service.getZtrackingForFilterSubset(
        mockGetZtrackingFilterSubsetDto,
        mockTraceIdForFilterSubset,
      );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          filterSubsetId: mockGetZtrackingFilterSubsetDto.filterSubsetId,
        },
      });
      expect(result).toEqual([mockZtrackingFilterSubsetCase001]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForFilterSubset(
          mockGetZtrackingFilterSubsetDto,
          mockTraceIdForFilterSubset,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
