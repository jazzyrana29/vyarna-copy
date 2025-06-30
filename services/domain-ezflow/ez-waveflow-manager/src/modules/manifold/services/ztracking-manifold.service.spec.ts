import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockGetZtrackingManifoldDto,
  mockManifoldCase001,
  mockTraceIdForManifold,
  mockZtrackingManifoldCase001,
} from '../test-values.spec';
import { ZtrackingManifoldService } from './ztracking-manifold.service';
import { ZtrackingManifold } from '../../../entities/ztracking-manifold.entity';

describe('ZtrackingManifoldService', () => {
  let service: ZtrackingManifoldService;
  let repository: Repository<ZtrackingManifold>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingManifoldService,
        {
          provide: getRepositoryToken(ZtrackingManifold),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingManifoldService>(ZtrackingManifoldService);
    repository = module.get<Repository<ZtrackingManifold>>(
      getRepositoryToken(ZtrackingManifold),
    );
  });

  describe('createZtrackingForManifold', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest
        .fn()
        .mockResolvedValue(mockZtrackingManifoldCase001);

      const result = await service.createZtrackingForManifold(
        mockManifoldCase001,
        mockTraceIdForManifold,
      );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForManifold', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValue([mockZtrackingManifoldCase001]);

      const result = await service.getZtrackingForManifold(
        mockGetZtrackingManifoldDto,
        mockTraceIdForManifold,
      );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          manifoldId: mockGetZtrackingManifoldDto.manifoldId,
        },
      });
      expect(result).toEqual([mockZtrackingManifoldCase001]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForManifold(
          mockGetZtrackingManifoldDto,
          mockTraceIdForManifold,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
