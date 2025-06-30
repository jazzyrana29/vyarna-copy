import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariableDataTypeService } from './evaluation-variable-data-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluationVariableDataType } from '../../../entities/evaluation-variable-data-type.entity';
import { LogStreamLevel } from 'ez-logger';
import {
  mockTraceId,
  mockGetEvaluationVariableDataTypeDtoCase001,
  mockGetManyEvaluationVariableDataTypesDtoCase002,
  mockSavedEvaluationVariableDataTypeCase001,
  mockSavedEvaluationVariableDataTypeCase002,
} from '../test-values.spec';
import { NotFoundException } from '@nestjs/common';
import { MockType, repositoryMockFactory } from 'ez-utils';

describe('EvaluationVariableDataTypeService', () => {
  let evaluationVariableDataTypeService: EvaluationVariableDataTypeService;
  let evaluationVariableDataTypeRepository: MockType<
    Repository<EvaluationVariableDataType>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableDataTypeService,
        {
          provide: getRepositoryToken(EvaluationVariableDataType),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    evaluationVariableDataTypeService =
      module.get<EvaluationVariableDataTypeService>(
        EvaluationVariableDataTypeService,
      );
    evaluationVariableDataTypeRepository = module.get(
      getRepositoryToken(EvaluationVariableDataType),
    );
  });

  describe('findEvaluationVariableDataType', () => {
    it('should successfully find an evaluation variable data type with valid data', async () => {
      const traceId = mockTraceId;
      const findEvaluationVariableDataTypeDto =
        mockGetEvaluationVariableDataTypeDtoCase001;
      const savedEvaluationVariableDataType =
        mockSavedEvaluationVariableDataTypeCase001;

      jest
        .spyOn(evaluationVariableDataTypeRepository, 'findOne')
        .mockResolvedValue(savedEvaluationVariableDataType as any);

      const result =
        await evaluationVariableDataTypeService.findEvaluationVariableDataType(
          findEvaluationVariableDataTypeDto,
          traceId,
        );

      expect(evaluationVariableDataTypeRepository.findOne).toHaveBeenCalledWith(
        {
          where: {
            name: findEvaluationVariableDataTypeDto.name,
            isDeleted: false,
          },
        },
      );
      expect(result).toEqual(savedEvaluationVariableDataType);
    });

    it('should throw NotFoundException if no evaluation variable data type is found', async () => {
      const traceId = mockTraceId;
      const findEvaluationVariableDataTypeDto =
        mockGetEvaluationVariableDataTypeDtoCase001;

      jest
        .spyOn(evaluationVariableDataTypeRepository, 'findOne')
        .mockResolvedValue(null);

      await expect(
        evaluationVariableDataTypeService.findEvaluationVariableDataType(
          findEvaluationVariableDataTypeDto,
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should log the search process with the correct traceId and log level', async () => {
      const traceId = mockTraceId;
      const findEvaluationVariableDataTypeDto =
        mockGetEvaluationVariableDataTypeDtoCase001;
      const savedEvaluationVariableDataType =
        mockSavedEvaluationVariableDataTypeCase001;

      jest
        .spyOn(evaluationVariableDataTypeRepository, 'findOne')
        .mockResolvedValue(savedEvaluationVariableDataType as any);
      const debugSpy = jest.spyOn(
        evaluationVariableDataTypeService['logger'],
        'debug',
      );
      const infoSpy = jest.spyOn(
        evaluationVariableDataTypeService['logger'],
        'info',
      );

      await evaluationVariableDataTypeService.findEvaluationVariableDataType(
        findEvaluationVariableDataTypeDto,
        traceId,
      );

      expect(debugSpy).toHaveBeenCalledWith(
        `Conditions Filters for search : {"name":"nameForMyEvaluationVariableDataTypeCase001","isDeleted":false}`,
        traceId,
        'getOne',
        LogStreamLevel.ProdStandard,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `Evaluation variable data type found in database`,
        traceId,
        'getOne',
        LogStreamLevel.ProdStandard,
      );
    });
  });

  describe('getManyEvaluationVariableDataType', () => {
    it('should successfully get many evaluation variable data types with valid data', async () => {
      const traceId = mockTraceId;
      const getManyEvaluationVariableDataTypeDto =
        mockGetManyEvaluationVariableDataTypesDtoCase002;
      const savedEvaluationVariableDataTypes = [
        mockSavedEvaluationVariableDataTypeCase001,
        mockSavedEvaluationVariableDataTypeCase002,
      ];

      jest
        .spyOn(evaluationVariableDataTypeRepository, 'find')
        .mockResolvedValue(savedEvaluationVariableDataTypes as any);

      const result =
        await evaluationVariableDataTypeService.getManyEvaluationVariableDataType(
          getManyEvaluationVariableDataTypeDto,
          traceId,
        );

      expect(evaluationVariableDataTypeRepository.find).toHaveBeenCalledWith({
        where: {
          name: getManyEvaluationVariableDataTypeDto.name,
          isDeleted: false,
        },
      });
      expect(result).toEqual(savedEvaluationVariableDataTypes);
    });

    it('should throw NotFoundException if no evaluation variable data types are found', async () => {
      const traceId = mockTraceId;
      const getManyEvaluationVariableDataTypeDto =
        mockGetManyEvaluationVariableDataTypesDtoCase002;

      jest
        .spyOn(evaluationVariableDataTypeRepository, 'find')
        .mockResolvedValue([]);

      await expect(
        evaluationVariableDataTypeService.getManyEvaluationVariableDataType(
          getManyEvaluationVariableDataTypeDto,
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should log the search process for many entities with the correct traceId and log level', async () => {
      const traceId = mockTraceId;
      const getManyEvaluationVariableDataTypeDto =
        mockGetManyEvaluationVariableDataTypesDtoCase002;
      const savedEvaluationVariableDataTypes = [
        mockSavedEvaluationVariableDataTypeCase001,
        mockSavedEvaluationVariableDataTypeCase002,
      ];

      jest
        .spyOn(evaluationVariableDataTypeRepository, 'find')
        .mockResolvedValue(savedEvaluationVariableDataTypes as any);
      const debugSpy = jest.spyOn(
        evaluationVariableDataTypeService['logger'],
        'debug',
      );
      const infoSpy = jest.spyOn(
        evaluationVariableDataTypeService['logger'],
        'info',
      );

      await evaluationVariableDataTypeService.getManyEvaluationVariableDataType(
        getManyEvaluationVariableDataTypeDto,
        traceId,
      );

      expect(debugSpy).toHaveBeenCalledWith(
        `Conditions Filters for search : {"name":"nameForMyEvaluationVariableDataTypeCase002","isDeleted":false}`,
        traceId,
        'getMany',
        LogStreamLevel.ProdStandard,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `Evaluation variable data types found by matching criteria`,
        traceId,
        'getMany',
        LogStreamLevel.ProdStandard,
      );
    });
  });
});
