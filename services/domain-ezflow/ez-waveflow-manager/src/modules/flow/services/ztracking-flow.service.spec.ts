import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockFlowCase001,
  mockGetZtrackingFlowDto,
  mockTraceIdForFlow,
  mockZtrackingFlowCase001,
} from '../test-values.spec';
import { ZtrackingFlowService } from './ztracking-flow.service';
import { ZtrackingFlow } from '../../../entities/ztracking-flow.entity';

describe('ZtrackingFlowService', () => {
  let service: ZtrackingFlowService;
  let repository: Repository<ZtrackingFlow>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingFlowService,
        {
          provide: getRepositoryToken(ZtrackingFlow),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingFlowService>(ZtrackingFlowService);
    repository = module.get<Repository<ZtrackingFlow>>(
      getRepositoryToken(ZtrackingFlow),
    );
  });

  describe('createZtrackingForFlow', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest.fn().mockResolvedValue(mockZtrackingFlowCase001);

      const result = await service.createZtrackingForFlow(
        mockFlowCase001,
        mockTraceIdForFlow,
      );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForFlow', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest.fn().mockResolvedValue([mockZtrackingFlowCase001]);

      const result = await service.getZtrackingForFlow(
        mockGetZtrackingFlowDto,
        mockTraceIdForFlow,
      );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          flowId: mockGetZtrackingFlowDto.flowId,
        },
      });
      expect(result).toEqual([mockZtrackingFlowCase001]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForFlow(
          mockGetZtrackingFlowDto,
          mockTraceIdForFlow,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
