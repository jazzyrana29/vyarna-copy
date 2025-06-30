import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockGetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
  mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
  mockWaveTypeIsAllowedToAccessBusinessUnitCase001,
  mockZtrackingWaveTypeIsAllowedToAccessBusinessUnitCase001,
} from '../test-values.spec';
import { ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService } from './ztracking-wave-type-is-allowed-to-access-business-unit.service';
import { ZtrackingWaveTypeIsAllowedToAccessBusinessUnit } from '../../../entities/ztracking-wave-type-is-allowed-to-access-business-unit.entity';

describe('ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService', () => {
  let service: ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService;
  let repository: Repository<ZtrackingWaveTypeIsAllowedToAccessBusinessUnit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService,
        {
          provide: getRepositoryToken(
            ZtrackingWaveTypeIsAllowedToAccessBusinessUnit,
          ),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService>(
      ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService,
    );
    repository = module.get<
      Repository<ZtrackingWaveTypeIsAllowedToAccessBusinessUnit>
    >(getRepositoryToken(ZtrackingWaveTypeIsAllowedToAccessBusinessUnit));
  });

  describe('createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest
        .fn()
        .mockResolvedValue(
          mockZtrackingWaveTypeIsAllowedToAccessBusinessUnitCase001,
        );

      const result =
        await service.createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit(
          mockWaveTypeIsAllowedToAccessBusinessUnitCase001,
          mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
        );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValue([
          mockZtrackingWaveTypeIsAllowedToAccessBusinessUnitCase001,
        ]);

      const result =
        await service.getZtrackingForWaveTypeIsAllowedToAccessBusinessUnit(
          mockGetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
          mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
        );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          businessUnitId:
            mockGetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto.businessUnitId,
          waveTypeId:
            mockGetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto.waveTypeId,
        },
      });
      expect(result).toEqual([
        mockZtrackingWaveTypeIsAllowedToAccessBusinessUnitCase001,
      ]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForWaveTypeIsAllowedToAccessBusinessUnit(
          mockGetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
          mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
