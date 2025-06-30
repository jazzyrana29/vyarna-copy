import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockEvaluationOperatorCase001,
  mockGetManyEvaluationOperatorsDto,
  mockGetOneEvaluationOperatorDto,
  mockTraceIdForEvaluationOperator as mockTraceId,
} from '../test-values.spec';
import { EvaluationOperatorService } from './evaluation-operator.service';
import { EvaluationOperator } from '../../../entities/evaluation-operator.entity';

describe('EvaluationOperatorService', () => {
  let service: EvaluationOperatorService;
  let repository: Repository<EvaluationOperator>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationOperatorService,
        {
          provide: getRepositoryToken(EvaluationOperator),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EvaluationOperatorService>(EvaluationOperatorService);
    repository = module.get<Repository<EvaluationOperator>>(
      getRepositoryToken(EvaluationOperator),
    );
  });

  describe('getOneEvaluationOperator', () => {
    it('should return an evaluation variable group', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockEvaluationOperatorCase001);

      const result = await service.getOneEvaluationOperator(
        mockGetOneEvaluationOperatorDto,
        mockTraceId,
      );

      expect(result).toEqual(mockEvaluationOperatorCase001);
    });

    it('should throw NotFoundException if the evaluationOperator is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneEvaluationOperator(
          mockGetOneEvaluationOperatorDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneEvaluationOperator(
          { evaluationOperatorId: '', name: '' },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getManyEvaluationOperators', () => {
    it('should return an evaluation variable group', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockEvaluationOperatorCase001]);

      const result = await service.getManyEvaluationOperators(
        mockGetManyEvaluationOperatorsDto,
        mockTraceId,
      );

      expect(result).toEqual([mockEvaluationOperatorCase001]);
    });

    it('should throw NotFoundException if the evaluationOperator is not found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyEvaluationOperators(
          mockGetManyEvaluationOperatorsDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
    //TODO: as no details provide will update later

    // it('should throw BadRequestException if ID is missing', async () => {
    //   await expect(
    //     service.getManyEvaluationOperators({}, mockTraceId),
    //   ).rejects.toThrow(BadRequestException);
    // });
  });
});
