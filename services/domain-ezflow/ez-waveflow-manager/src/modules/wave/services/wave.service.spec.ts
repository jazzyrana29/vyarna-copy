import { Test, TestingModule } from '@nestjs/testing';
import { WaveService } from './wave.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wave } from '../../../entities/wave.entity';
import { ZtrackingWaveService } from './ztracking-wave.service';
import {
  mockCreateWaveDto,
  mockSavedWave001,
  mockUpdateWaveDto,
  mockDeleteWaveDto,
  mockGetWaveDto,
  mockGetManyWaveDto,
} from '../test-values.spec';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('WaveService', () => {
  let service: WaveService;
  let repository: Repository<Wave>;
  let ztrackingService: ZtrackingWaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaveService,
        {
          provide: getRepositoryToken(Wave),
          useClass: Repository,
        },
        {
          provide: ZtrackingWaveService,
          useValue: {
            createZtrackingWaveEntity: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<WaveService>(WaveService);
    repository = module.get<Repository<Wave>>(getRepositoryToken(Wave));
    ztrackingService = module.get<ZtrackingWaveService>(ZtrackingWaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(ztrackingService).toBeDefined();
  });

  describe('createWave', () => {
    it('should successfully create a wave and track changes', async () => {
      jest.spyOn(repository, 'create').mockReturnValue(mockSavedWave001);
      jest.spyOn(repository, 'save').mockResolvedValue(mockSavedWave001);

      const result = await service.createWave(mockCreateWaveDto, 'traceId1');

      expect(repository.create).toHaveBeenCalledWith(mockCreateWaveDto);
      expect(repository.save).toHaveBeenCalledWith(mockSavedWave001);
      expect(ztrackingService.createZtrackingWaveEntity).toHaveBeenCalledWith(
        mockSavedWave001,
        'traceId1',
      );
      expect(result).toEqual(mockSavedWave001);
    });
  });

  describe('updateWave', () => {
    it('should throw NotFoundException if wave does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateWave(mockUpdateWaveDto, 'traceId2'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully update a wave and track changes', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockSavedWave001);
      jest.spyOn(repository, 'save').mockResolvedValue(mockSavedWave001);

      const result = await service.updateWave(mockUpdateWaveDto, 'traceId2');

      expect(repository.save).toHaveBeenCalled();
      expect(ztrackingService.createZtrackingWaveEntity).toHaveBeenCalled();
      expect(result).toEqual(mockSavedWave001);
    });
  });

  describe('deleteWave', () => {
    it('should throw NotFoundException if wave does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteWave(mockDeleteWaveDto, 'traceId3'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully mark a wave as deleted', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockSavedWave001);
      jest.spyOn(repository, 'save').mockResolvedValue(mockSavedWave001);

      await service.deleteWave(mockDeleteWaveDto, 'traceId3');

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
      );
    });
  });

  describe('getOneWave', () => {
    it('should throw NotFoundException if no wave is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.getOneWave(mockGetWaveDto, 'traceId4'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a found wave', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockSavedWave001);

      const result = await service.getOneWave(mockGetWaveDto, 'traceId4');

      expect(result).toEqual(mockSavedWave001);
    });
  });

  describe('getManyWaves', () => {
    it('should throw NotFoundException if no waves match the criteria', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyWaves(mockGetManyWaveDto, 'traceId5'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a list of waves', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockSavedWave001]);

      const result = await service.getManyWaves(mockGetManyWaveDto, 'traceId5');

      expect(result).toEqual([mockSavedWave001]);
    });
  });
});
