import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockGetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
  mockTaskTypeHaveAccessToBusinessUnitCase001,
  mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
  mockZtrackingTaskTypeHaveAccessToBusinessUnitCase001,
} from '../test-values.spec';
import { ZtrackingTaskTypeHaveAccessToBusinessUnitService } from './ztracking-task-type-have-access-to-business-unit.service';
import { ZtrackingTaskTypeHaveAccessToBusinessUnit } from '../../../entities/ztracking-task-type-have-access-to-business-unit.entity';

describe('ZtrackingTaskTypeHaveAccessToBusinessUnitService', () => {
  let service: ZtrackingTaskTypeHaveAccessToBusinessUnitService;
  let repository: Repository<ZtrackingTaskTypeHaveAccessToBusinessUnit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingTaskTypeHaveAccessToBusinessUnitService,
        {
          provide: getRepositoryToken(
            ZtrackingTaskTypeHaveAccessToBusinessUnit,
          ),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingTaskTypeHaveAccessToBusinessUnitService>(
      ZtrackingTaskTypeHaveAccessToBusinessUnitService,
    );
    repository = module.get<
      Repository<ZtrackingTaskTypeHaveAccessToBusinessUnit>
    >(getRepositoryToken(ZtrackingTaskTypeHaveAccessToBusinessUnit));
  });

  describe('createZtrackingForTaskTypeHaveAccessToBusinessUnit', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest
        .fn()
        .mockResolvedValue(
          mockZtrackingTaskTypeHaveAccessToBusinessUnitCase001,
        );

      const result =
        await service.createZtrackingForTaskTypeHaveAccessToBusinessUnit(
          mockTaskTypeHaveAccessToBusinessUnitCase001,
          mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
        );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForTaskTypeHaveAccessToBusinessUnit', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValue([
          mockZtrackingTaskTypeHaveAccessToBusinessUnitCase001,
        ]);

      const result =
        await service.getZtrackingForTaskTypeHaveAccessToBusinessUnit(
          mockGetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
          mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
        );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          businessUnitId:
            mockGetZtrackingTaskTypeHaveAccessToBusinessUnitDto.businessUnitId,
          taskTypeId:
            mockGetZtrackingTaskTypeHaveAccessToBusinessUnitDto.taskTypeId,
        },
      });
      expect(result).toEqual([
        mockZtrackingTaskTypeHaveAccessToBusinessUnitCase001,
      ]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForTaskTypeHaveAccessToBusinessUnit(
          mockGetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
          mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
