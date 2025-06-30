import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockGetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
  mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
  mockWaveTypeGenreCanUtilizeBusinessUnitCase001,
  mockZtrackingWaveTypeGenreCanUtilizeBusinessUnitCase001,
} from '../test-values.spec';
import { ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService } from './ztracking-wave-type-genre-can-utilize-business-unit.service';
import { ZtrackingWaveTypeGenreCanUtilizeBusinessUnit } from '../../../entities/ztracking-wave-type-genre-can-utilize-business-unit.entity';

describe('ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService', () => {
  let service: ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService;
  let repository: Repository<ZtrackingWaveTypeGenreCanUtilizeBusinessUnit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService,
        {
          provide: getRepositoryToken(
            ZtrackingWaveTypeGenreCanUtilizeBusinessUnit,
          ),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService>(
      ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService,
    );
    repository = module.get<
      Repository<ZtrackingWaveTypeGenreCanUtilizeBusinessUnit>
    >(getRepositoryToken(ZtrackingWaveTypeGenreCanUtilizeBusinessUnit));
  });

  describe('createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest
        .fn()
        .mockResolvedValue(
          mockZtrackingWaveTypeGenreCanUtilizeBusinessUnitCase001,
        );

      const result =
        await service.createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit(
          mockWaveTypeGenreCanUtilizeBusinessUnitCase001,
          mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
        );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValue([
          mockZtrackingWaveTypeGenreCanUtilizeBusinessUnitCase001,
        ]);

      const result =
        await service.getZtrackingForWaveTypeGenreCanUtilizeBusinessUnit(
          mockGetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
          mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
        );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          businessUnitId:
            mockGetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.businessUnitId,
          waveTypeGenreId:
            mockGetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto.waveTypeGenreId,
        },
      });
      expect(result).toEqual([
        mockZtrackingWaveTypeGenreCanUtilizeBusinessUnitCase001,
      ]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForWaveTypeGenreCanUtilizeBusinessUnit(
          mockGetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
          mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
