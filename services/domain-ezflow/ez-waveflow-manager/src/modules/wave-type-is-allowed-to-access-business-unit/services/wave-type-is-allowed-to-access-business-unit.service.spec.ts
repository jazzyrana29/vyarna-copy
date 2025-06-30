import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateWaveTypeIsAllowedToAccessBusinessUnitDto,
  mockDeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
  mockGetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
  mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit as mockTraceId,
  mockUpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
  mockWaveTypeIsAllowedToAccessBusinessUnitCase001,
} from '../test-values.spec';
import { WaveTypeIsAllowedToAccessBusinessUnitService } from './wave-type-is-allowed-to-access-business-unit.service';
import { WaveTypeIsAllowedToAccessBusinessUnit } from '../../../entities/wave-type-is-allowed-to-access-business-unit.entity';
import { ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService } from './ztracking-wave-type-is-allowed-to-access-business-unit.service';

describe('WaveTypeIsAllowedToAccessBusinessUnitService', () => {
  let service: WaveTypeIsAllowedToAccessBusinessUnitService;
  let repository: Repository<WaveTypeIsAllowedToAccessBusinessUnit>;
  let ztrackingService: ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaveTypeIsAllowedToAccessBusinessUnitService,
        {
          provide: getRepositoryToken(WaveTypeIsAllowedToAccessBusinessUnit),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService,
          useValue: {
            createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit: jest
              .fn()
              .mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<WaveTypeIsAllowedToAccessBusinessUnitService>(
      WaveTypeIsAllowedToAccessBusinessUnitService,
    );
    repository = module.get<Repository<WaveTypeIsAllowedToAccessBusinessUnit>>(
      getRepositoryToken(WaveTypeIsAllowedToAccessBusinessUnit),
    );
    ztrackingService =
      module.get<ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService>(
        ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService,
      );
  });

  describe('createWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should create and return a new wave-type-is-allowed-to-access-business-unit and call the ztracking service', async () => {
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockWaveTypeIsAllowedToAccessBusinessUnitCase001);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.createWaveTypeIsAllowedToAccessBusinessUnit(
        mockCreateWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockWaveTypeIsAllowedToAccessBusinessUnitCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(
          mockCreateWaveTypeIsAllowedToAccessBusinessUnitDto,
        ),
      );
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should update and return the updated wave-type-is-allowed-to-access-business-unit and call the ztracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockWaveTypeIsAllowedToAccessBusinessUnitCase001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockWaveTypeIsAllowedToAccessBusinessUnitCase001);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.updateWaveTypeIsAllowedToAccessBusinessUnit(
        mockUpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockWaveTypeIsAllowedToAccessBusinessUnitCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(
          mockUpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
        ),
      );
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the wave-type-is-allowed-to-access-business-unit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateWaveTypeIsAllowedToAccessBusinessUnit(
          mockUpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should mark the wave-type-is-allowed-to-access-business-unit as deleted and call the zTracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockWaveTypeIsAllowedToAccessBusinessUnitCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockWaveTypeIsAllowedToAccessBusinessUnitCase001,
        isDeleted: true,
      } as WaveTypeIsAllowedToAccessBusinessUnit);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.deleteWaveTypeIsAllowedToAccessBusinessUnit(
        mockDeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceId,
      );

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteWaveTypeIsAllowedToAccessBusinessUnit(
          {
            businessUnitId: '',
            waveTypeId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the wave-type-is-allowed-to-access-business-unit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteWaveTypeIsAllowedToAccessBusinessUnit(
          mockDeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should return the wave-type-is-allowed-to-access-business-unit', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockWaveTypeIsAllowedToAccessBusinessUnitCase001);

      const result = await service.getOneWaveTypeIsAllowedToAccessBusinessUnit(
        mockGetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockWaveTypeIsAllowedToAccessBusinessUnitCase001);
    });

    it('should throw NotFoundException if the wave-type-is-allowed-to-access-business-unit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneWaveTypeIsAllowedToAccessBusinessUnit(
          mockGetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneWaveTypeIsAllowedToAccessBusinessUnit(
          {
            businessUnitId: '',
            waveTypeId: '',
            isDeleted: true,
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
