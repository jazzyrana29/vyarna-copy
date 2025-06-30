import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockFlowIsActiveForWaveTypeAndBusinessUnitCase001,
  mockGetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
  mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
  mockZtrackingFlowIsActiveForWaveTypeAndBusinessUnitCase001,
} from '../test-values.spec';
import { ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService } from './ztracking-flow-is-active-for-wave-type-and-business-unit.service';
import { ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit } from '../../../entities/ztracking-flow-is-active-for-wave-type-and-business-unit.entity';

describe('ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService', () => {
  let service: ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService;
  let repository: Repository<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService,
        {
          provide: getRepositoryToken(
            ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit,
          ),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service =
      module.get<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService>(
        ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService,
      );
    repository = module.get<
      Repository<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit>
    >(getRepositoryToken(ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit));
  });

  describe('createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest
        .fn()
        .mockResolvedValue(
          mockZtrackingFlowIsActiveForWaveTypeAndBusinessUnitCase001,
        );

      const result =
        await service.createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit(
          mockFlowIsActiveForWaveTypeAndBusinessUnitCase001,
          mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
        );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValue([
          mockZtrackingFlowIsActiveForWaveTypeAndBusinessUnitCase001,
        ]);

      const result =
        await service.getZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit(
          mockGetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
          mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
        );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          businessUnitId:
            mockGetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto.businessUnitId,
          waveTypeId:
            mockGetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto.waveTypeId,
        },
      });
      expect(result).toEqual([
        mockZtrackingFlowIsActiveForWaveTypeAndBusinessUnitCase001,
      ]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit(
          mockGetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
          mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
