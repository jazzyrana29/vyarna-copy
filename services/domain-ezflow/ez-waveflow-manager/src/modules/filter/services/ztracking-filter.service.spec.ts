import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockFilterCase001,
  mockGetZtrackingFilterDto,
  mockTraceIdForFilter,
  mockZtrackingFilterCase001,
} from '../test-values.spec';
import { ZtrackingFilterService } from './ztracking-filter.service';
import { ZtrackingFilter } from '../../../entities/ztracking-filter.entity';

describe('ZtrackingFilterService', () => {
  let service: ZtrackingFilterService;
  let repository: Repository<ZtrackingFilter>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingFilterService,
        {
          provide: getRepositoryToken(ZtrackingFilter),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingFilterService>(ZtrackingFilterService);
    repository = module.get<Repository<ZtrackingFilter>>(
      getRepositoryToken(ZtrackingFilter),
    );
  });

  describe('createZtrackingForFilter', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest.fn().mockResolvedValue(mockZtrackingFilterCase001);

      const result = await service.createZtrackingForFilter(
        mockFilterCase001,
        mockTraceIdForFilter,
      );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForFilter', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValue([mockZtrackingFilterCase001]);

      const result = await service.getZtrackingForFilter(
        mockGetZtrackingFilterDto,
        mockTraceIdForFilter,
      );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          filterId: mockGetZtrackingFilterDto.filterId,
        },
      });
      expect(result).toEqual([mockZtrackingFilterCase001]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForFilter(
          mockGetZtrackingFilterDto,
          mockTraceIdForFilter,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
