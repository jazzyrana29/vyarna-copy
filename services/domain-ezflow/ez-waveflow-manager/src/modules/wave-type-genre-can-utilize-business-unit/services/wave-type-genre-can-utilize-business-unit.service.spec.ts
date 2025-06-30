import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateWaveTypeGenreCanUtilizeBusinessUnitDto,
  mockDeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
  mockGetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
  mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit as mockTraceId,
  mockUpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
  mockWaveTypeGenreCanUtilizeBusinessUnitCase001,
} from '../test-values.spec';
import { WaveTypeGenreCanUtilizeBusinessUnitService } from './wave-type-genre-can-utilize-business-unit.service';
import { WaveTypeGenreCanUtilizeBusinessUnit } from '../../../entities/wave-type-genre-can-utilize-business-unit.entity';
import { ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService } from './ztracking-wave-type-genre-can-utilize-business-unit.service';

describe('WaveTypeGenreCanUtilizeBusinessUnitService', () => {
  let service: WaveTypeGenreCanUtilizeBusinessUnitService;
  let repository: Repository<WaveTypeGenreCanUtilizeBusinessUnit>;
  let ztrackingService: ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaveTypeGenreCanUtilizeBusinessUnitService,
        {
          provide: getRepositoryToken(WaveTypeGenreCanUtilizeBusinessUnit),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService,
          useValue: {
            createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit: jest
              .fn()
              .mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<WaveTypeGenreCanUtilizeBusinessUnitService>(
      WaveTypeGenreCanUtilizeBusinessUnitService,
    );
    repository = module.get<Repository<WaveTypeGenreCanUtilizeBusinessUnit>>(
      getRepositoryToken(WaveTypeGenreCanUtilizeBusinessUnit),
    );
    ztrackingService =
      module.get<ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService>(
        ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService,
      );
  });

  describe('createWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should create and return a new wave-type-genre-can-utilize-business-unit and call the ztracking service', async () => {
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockWaveTypeGenreCanUtilizeBusinessUnitCase001);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.createWaveTypeGenreCanUtilizeBusinessUnit(
        mockCreateWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockWaveTypeGenreCanUtilizeBusinessUnitCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(
          mockCreateWaveTypeGenreCanUtilizeBusinessUnitDto,
        ),
      );
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should update and return the updated wave-type-genre-can-utilize-business-unit and call the ztracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockWaveTypeGenreCanUtilizeBusinessUnitCase001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockWaveTypeGenreCanUtilizeBusinessUnitCase001);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.updateWaveTypeGenreCanUtilizeBusinessUnit(
        mockUpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockWaveTypeGenreCanUtilizeBusinessUnitCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(
          mockUpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
        ),
      );
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the wave-type-genre-can-utilize-business-unit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateWaveTypeGenreCanUtilizeBusinessUnit(
          mockUpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should mark the wave-type-genre-can-utilize-business-unit as deleted and call the zTracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockWaveTypeGenreCanUtilizeBusinessUnitCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockWaveTypeGenreCanUtilizeBusinessUnitCase001,
        isDeleted: true,
      } as WaveTypeGenreCanUtilizeBusinessUnit);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.deleteWaveTypeGenreCanUtilizeBusinessUnit(
        mockDeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceId,
      );

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteWaveTypeGenreCanUtilizeBusinessUnit(
          {
            businessUnitId: '',
            waveTypeGenreId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the wave-type-genre-can-utilize-business-unit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteWaveTypeGenreCanUtilizeBusinessUnit(
          mockDeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should return the wave-type-genre-can-utilize-business-unit', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockWaveTypeGenreCanUtilizeBusinessUnitCase001);

      const result = await service.getOneWaveTypeGenreCanUtilizeBusinessUnit(
        mockGetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockWaveTypeGenreCanUtilizeBusinessUnitCase001);
    });

    it('should throw NotFoundException if the wave-type-genre-can-utilize-business-unit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneWaveTypeGenreCanUtilizeBusinessUnit(
          mockGetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneWaveTypeGenreCanUtilizeBusinessUnit(
          {
            businessUnitId: '',
            waveTypeGenreId: '',
            isDeleted: true,
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
