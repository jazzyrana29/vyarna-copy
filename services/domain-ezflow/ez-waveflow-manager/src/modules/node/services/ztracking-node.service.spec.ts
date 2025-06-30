import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockGetZtrackingNodeDto,
  mockNodeCase001,
  mockTraceIdForNode,
  mockZtrackingNodeCase001,
} from '../test-values.spec';
import { ZtrackingNodeService } from './ztracking-node.service';
import { ZtrackingNode } from '../../../entities/ztracking-node.entity';

describe('ZtrackingNodeService', () => {
  let service: ZtrackingNodeService;
  let repository: Repository<ZtrackingNode>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingNodeService,
        {
          provide: getRepositoryToken(ZtrackingNode),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingNodeService>(ZtrackingNodeService);
    repository = module.get<Repository<ZtrackingNode>>(
      getRepositoryToken(ZtrackingNode),
    );
  });

  describe('createZtrackingForNode', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest.fn().mockResolvedValue(mockZtrackingNodeCase001);

      const result = await service.createZtrackingForNode(
        mockNodeCase001,
        mockTraceIdForNode,
      );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForNode', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest.fn().mockResolvedValue([mockZtrackingNodeCase001]);

      const result = await service.getZtrackingForNode(
        mockGetZtrackingNodeDto,
        mockTraceIdForNode,
      );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          nodeId: mockGetZtrackingNodeDto.nodeId,
        },
      });
      expect(result).toEqual([mockZtrackingNodeCase001]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForNode(
          mockGetZtrackingNodeDto,
          mockTraceIdForNode,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
