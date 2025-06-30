import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockGetZtrackingNodeExitDto,
  mockNodeExitCase001,
  mockTraceIdForNodeExit,
  mockZtrackingNodeExitCase001,
} from '../test-values.spec';
import { ZtrackingNodeExitService } from './ztracking-node-exit.service';
import { ZtrackingNodeExit } from '../../../entities/ztracking-node-exit.entity';

describe('ZtrackingNodeExitService', () => {
  let service: ZtrackingNodeExitService;
  let repository: Repository<ZtrackingNodeExit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingNodeExitService,
        {
          provide: getRepositoryToken(ZtrackingNodeExit),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingNodeExitService>(ZtrackingNodeExitService);
    repository = module.get<Repository<ZtrackingNodeExit>>(
      getRepositoryToken(ZtrackingNodeExit),
    );
  });

  describe('createZtrackingForNodeExit', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest
        .fn()
        .mockResolvedValue(mockZtrackingNodeExitCase001);

      const result = await service.createZtrackingForNodeExit(
        mockNodeExitCase001,
        mockTraceIdForNodeExit,
      );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForNodeExit', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValue([mockZtrackingNodeExitCase001]);

      const result = await service.getZtrackingForNodeExit(
        mockGetZtrackingNodeExitDto,
        mockTraceIdForNodeExit,
      );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          nodeExitId: mockGetZtrackingNodeExitDto.nodeExitId,
        },
      });
      expect(result).toEqual([mockZtrackingNodeExitCase001]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForNodeExit(
          mockGetZtrackingNodeExitDto,
          mockTraceIdForNodeExit,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
