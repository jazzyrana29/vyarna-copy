import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockFilterSubsetItemCase001,
  mockGetZtrackingFilterSubsetItemDto,
  mockTraceIdForFilterSubsetItem,
  mockZtrackingFilterSubsetItemCase001,
} from '../test-values.spec';
import { ZtrackingFilterSubsetItemService } from './ztracking-filter-subset-item.service';
import { ZtrackingFilterSubsetItem } from '../../../entities/ztracking-filter-subset-item.entity';

describe('ZtrackingFilterSubsetItemService', () => {
  let service: ZtrackingFilterSubsetItemService;
  let repository: Repository<ZtrackingFilterSubsetItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingFilterSubsetItemService,
        {
          provide: getRepositoryToken(ZtrackingFilterSubsetItem),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingFilterSubsetItemService>(
      ZtrackingFilterSubsetItemService,
    );
    repository = module.get<Repository<ZtrackingFilterSubsetItem>>(
      getRepositoryToken(ZtrackingFilterSubsetItem),
    );
  });

  describe('createZtrackingForFilterSubsetItem', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest
        .fn()
        .mockResolvedValue(mockZtrackingFilterSubsetItemCase001);

      const result = await service.createZtrackingForFilterSubsetItem(
        mockFilterSubsetItemCase001,
        mockTraceIdForFilterSubsetItem,
      );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForFilterSubsetItem', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValue([mockZtrackingFilterSubsetItemCase001]);

      const result = await service.getZtrackingForFilterSubsetItem(
        mockGetZtrackingFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
      );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          filterSubsetItemId:
            mockGetZtrackingFilterSubsetItemDto.filterSubsetItemId,
        },
      });
      expect(result).toEqual([mockZtrackingFilterSubsetItemCase001]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForFilterSubsetItem(
          mockGetZtrackingFilterSubsetItemDto,
          mockTraceIdForFilterSubsetItem,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
