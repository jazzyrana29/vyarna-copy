import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockGetManyWaveTypeGenresDto,
  mockGetOneWaveTypeGenreDto,
  mockTraceIdForWaveTypeGenre as mockTraceId,
  mockWaveTypeGenreCase001,
} from '../test-values.spec';
import { WaveTypeGenreService } from './wave-type-genre.service';
import { WaveTypeGenre } from '../../../entities/wave-type-genre.entity';

describe('WaveTypeGenreService', () => {
  let service: WaveTypeGenreService;
  let repository: Repository<WaveTypeGenre>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaveTypeGenreService,
        {
          provide: getRepositoryToken(WaveTypeGenre),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WaveTypeGenreService>(WaveTypeGenreService);
    repository = module.get<Repository<WaveTypeGenre>>(
      getRepositoryToken(WaveTypeGenre),
    );
  });

  describe('getOneWaveTypeGenre', () => {
    it('should return a wave type genre', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockWaveTypeGenreCase001);

      const result = await service.getOneWaveTypeGenre(
        mockGetOneWaveTypeGenreDto,
        mockTraceId,
      );

      expect(result).toEqual(mockWaveTypeGenreCase001);
    });

    it('should throw NotFoundException if the wave type genre is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneWaveTypeGenre(mockGetOneWaveTypeGenreDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneWaveTypeGenre(
          { waveTypeGenreId: '', name: '' },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getManyWaveTypeGenres', () => {
    it('should return an array of wave type genres', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockWaveTypeGenreCase001]);

      const result = await service.getManyWaveTypeGenres(
        mockGetManyWaveTypeGenresDto,
        mockTraceId,
      );

      expect(result).toEqual([mockWaveTypeGenreCase001]);
    });

    it('should throw NotFoundException if no wave type genres are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyWaveTypeGenres(
          mockGetManyWaveTypeGenresDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if request is invalid', async () => {
      await expect(
        service.getManyWaveTypeGenres({}, mockTraceId),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
