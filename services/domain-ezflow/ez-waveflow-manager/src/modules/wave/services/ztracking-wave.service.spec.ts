import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingWaveService } from './ztracking-wave.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingWave } from '../../../entities/ztracking-wave.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockSavedWave001,
  mockSavedZtrackingWave001,
  mockTraceId,
} from '../test-values.spec';
import { MockType, repositoryMockFactory } from 'ez-utils';

describe('ZtrackingWaveService', () => {
  let service: ZtrackingWaveService;
  let repository: MockType<Repository<ZtrackingWave>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingWaveService,
        {
          provide: getRepositoryToken(ZtrackingWave),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ZtrackingWaveService>(ZtrackingWaveService);
    repository = module.get(getRepositoryToken(ZtrackingWave));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createZtrackingWaveEntity', () => {
    it('should create a ztracking wave entity successfully', async () => {
      const traceId = mockTraceId;
      const wave = mockSavedWave001;
      const mockZtrackingWave = mockSavedZtrackingWave001;

      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockZtrackingWave as any);

      const result = await service.createZtrackingWaveEntity(wave, traceId);

      expect(result).toEqual(true);
    });

    it('should handle errors gracefully when creating a ztracking wave entity', async () => {
      const traceId = mockTraceId;
      const wave = mockSavedWave001;

      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.createZtrackingWaveEntity(wave, traceId),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingWaveEntity', () => {
    it('should find ztracking wave entities based on criteria', async () => {
      const traceId = mockTraceId;
      const waveId = mockSavedZtrackingWave001.waveId;
      const mockZtrackingWaves = [mockSavedZtrackingWave001];

      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockZtrackingWaves as any);

      const result = await service.findZtrackingWaveEntity({ waveId }, traceId);

      expect(result).toEqual(mockZtrackingWaves);
    });

    it('should handle errors gracefully when finding ztracking wave entities', async () => {
      const traceId = mockTraceId;
      const waveId = mockSavedWave001.waveId;

      jest
        .spyOn(repository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.findZtrackingWaveEntity({ waveId }, traceId),
      ).rejects.toThrow('Database error');
    });

    it('should throw NotFoundException if no entities are found', async () => {
      const traceId = mockTraceId;
      const waveId = mockSavedWave001.waveId;

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.findZtrackingWaveEntity({ waveId }, traceId),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
