import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariableService } from './evaluation-variable.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluationVariable } from '../../../entities/evaluation-variable.entity';
import { Repository } from 'typeorm';
import { ZtrackingEvaluationVariableService } from './ztracking-evaluation-variable.service';
import {
  mockCreateEvaluationVariableDto,
  mockSavedEvaluationVariable001,
  mockUpdateEvaluationVariableDto,
  mockDeleteEvaluationVariableDto,
  mockGetOneEvaluationVariableDto,
  mockGetManyEvaluationVariablesDto,
} from '../test-values.spec';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('EvaluationVariableService', () => {
  let service: EvaluationVariableService;
  let repository: Repository<EvaluationVariable>;
  let ztrackingService: ZtrackingEvaluationVariableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableService,
        {
          provide: getRepositoryToken(EvaluationVariable),
          useClass: Repository,
        },
        {
          provide: ZtrackingEvaluationVariableService,
          useValue: {
            createZtrackingEvaluationVariableEntity: jest
              .fn()
              .mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<EvaluationVariableService>(EvaluationVariableService);
    repository = module.get<Repository<EvaluationVariable>>(
      getRepositoryToken(EvaluationVariable),
    );
    ztrackingService = module.get<ZtrackingEvaluationVariableService>(
      ZtrackingEvaluationVariableService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(ztrackingService).toBeDefined();
  });

  describe('createEvaluationVariable', () => {
    it('should successfully create an evaluation variable and track changes', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(mockSavedEvaluationVariable001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedEvaluationVariable001);

      const result = await service.createEvaluationVariable(
        mockCreateEvaluationVariableDto,
        'traceId1',
      );

      expect(repository.create).toHaveBeenCalledWith(
        mockCreateEvaluationVariableDto,
      );
      expect(repository.save).toHaveBeenCalledWith(
        mockSavedEvaluationVariable001,
      );
      expect(
        ztrackingService.createZtrackingEvaluationVariableEntity,
      ).toHaveBeenCalledWith(mockSavedEvaluationVariable001, 'traceId1');
      expect(result).toEqual(mockSavedEvaluationVariable001);
    });
  });

  describe('updateEvaluationVariable', () => {
    it('should throw NotFoundException if variable does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateEvaluationVariable(
          mockUpdateEvaluationVariableDto,
          'traceId2',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully update an evaluation variable and track changes', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedEvaluationVariable001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedEvaluationVariable001);

      const result = await service.updateEvaluationVariable(
        mockUpdateEvaluationVariableDto,
        'traceId2',
      );

      expect(repository.save).toHaveBeenCalled();
      expect(
        ztrackingService.createZtrackingEvaluationVariableEntity,
      ).toHaveBeenCalled();
      expect(result).toEqual(mockSavedEvaluationVariable001);
    });
  });

  describe('deleteEvaluationVariable', () => {
    it('should throw NotFoundException if variable does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteEvaluationVariable(
          mockDeleteEvaluationVariableDto,
          'traceId3',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully mark an evaluation variable as deleted', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedEvaluationVariable001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedEvaluationVariable001);

      await service.deleteEvaluationVariable(
        mockDeleteEvaluationVariableDto,
        'traceId3',
      );

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
      );
    });
  });

  describe('getOneEvaluationVariable', () => {
    it('should throw BadRequestException if neither ID nor name is provided', async () => {
      await expect(
        service.getOneEvaluationVariable(
          { evaluationVariableId: '', name: '' },
          'traceId4',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if no variable is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.getOneEvaluationVariable(
          mockGetOneEvaluationVariableDto,
          'traceId4',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a found evaluation variable', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedEvaluationVariable001);

      const result = await service.getOneEvaluationVariable(
        mockGetOneEvaluationVariableDto,
        'traceId4',
      );

      expect(result).toEqual(mockSavedEvaluationVariable001);
    });
  });

  describe('getManyEvaluationVariables', () => {
    it('should throw NotFoundException if no variables match the criteria', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyEvaluationVariables(
          mockGetManyEvaluationVariablesDto,
          'traceId5',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a list of evaluation variables', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockSavedEvaluationVariable001]);

      const result = await service.getManyEvaluationVariables(
        mockGetManyEvaluationVariablesDto,
        'traceId5',
      );

      expect(result).toEqual([mockSavedEvaluationVariable001]);
    });
  });
});
