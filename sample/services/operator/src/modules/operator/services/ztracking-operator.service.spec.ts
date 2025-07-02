import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ZtrackingOperatorService } from './ztracking-operator.service';
import { ZtrackingOperator } from '../../../entities/ztracking-operator.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockGetHistoryOperatorCase001,
  mockGetHistoryOperatorCase002,
  mockSavedOperatorCase001,
  mockSavedZtrackingOperatorCase001,
  mockTraceIdForOperator,
} from '../test-values.spec';

describe('ZtrackingOperatorService', () => {
  let service: ZtrackingOperatorService;
  let repository: Repository<ZtrackingOperator>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingOperatorService,
        {
          provide: getRepositoryToken(ZtrackingOperator),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZtrackingOperatorService>(ZtrackingOperatorService);
    repository = module.get<Repository<ZtrackingOperator>>(
      getRepositoryToken(ZtrackingOperator),
    );
  });

  describe('createZtrackingOperatorEntity', () => {
    it('should save the ztracking operator entity and return true if successful', async () => {
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedZtrackingOperatorCase001);

      const result = await service.createZtrackingOperatorEntity(
        mockSavedOperatorCase001,
        mockTraceIdForOperator,
      );

      expect(result).toBe(true);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockSavedOperatorCase001,
          versionDate: expect.any(Date),
        }),
      );
    });
  });

  describe('findZtrackingOperatorEntity', () => {
    it('should return an array of ztracking operator entities if found', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockSavedZtrackingOperatorCase001]);

      const result = await service.findZtrackingOperatorEntity(
        mockGetHistoryOperatorCase001,
        mockTraceIdForOperator,
      );

      expect(result).toEqual([mockSavedZtrackingOperatorCase001]);
    });

    it('should throw NotFoundException if no ztracking operators are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.findZtrackingOperatorEntity(
          mockGetHistoryOperatorCase002,
          mockTraceIdForOperator,
        ),
      ).rejects.toThrow(
        new NotFoundException(
          `no ztracking of operators existed with this id => ${mockGetHistoryOperatorCase002.operatorId}`,
        ),
      );
    });
  });
});
