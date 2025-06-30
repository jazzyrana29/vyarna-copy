import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockGetManyWaveTypesDto,
  mockGetOneWaveTypeDto,
  mockTraceIdForWaveType as mockTraceId,
  mockWaveTypeCase001,
} from '../test-values.spec';
import { WaveTypeService } from './wave-type.service';
import { WaveType } from '../../../entities/wave-type.entity';

describe('WaveTypeService', () => {
  let service: WaveTypeService;
  let repository: Repository<WaveType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaveTypeService,
        {
          provide: getRepositoryToken(WaveType),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WaveTypeService>(WaveTypeService);
    repository = module.get<Repository<WaveType>>(getRepositoryToken(WaveType));
  });

  describe('getOneWaveType', () => {
    it('should return a wave type', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockWaveTypeCase001);

      const result = await service.getOneWaveType(
        mockGetOneWaveTypeDto,
        mockTraceId,
      );

      expect(result).toEqual(mockWaveTypeCase001);
    });

    it('should throw NotFoundException if the wave type is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneWaveType(mockGetOneWaveTypeDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneWaveType({ waveTypeId: '', name: '' }, mockTraceId),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getManyWaveTypes', () => {
    it('should return an array of wave types', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockWaveTypeCase001]);

      const result = await service.getManyWaveTypes(
        mockGetManyWaveTypesDto,
        mockTraceId,
      );

      expect(result).toEqual([mockWaveTypeCase001]);
    });

    it('should throw NotFoundException if no wave types are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyWaveTypes(mockGetManyWaveTypesDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if request is invalid', async () => {
      await expect(service.getManyWaveTypes({}, mockTraceId)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
