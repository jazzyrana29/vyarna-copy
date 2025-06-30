import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariablesAreAvailableForWaveTypesService } from './evaluation-variables-are-available-for-wave-types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ZtrackingEvaluationVariablesAreAvailableForWaveTypesService } from './ztracking-evaluation-variables-are-available-for-wave-types.service';
import {
  mockCreateEvaluationVariablesAreAvailableForWaveTypesDto,
  mockUpdateEvaluationVariablesAreAvailableForWaveTypesDto,
  mockDeleteEvaluationVariablesAreAvailableForWaveTypesDto,
  mockGetOneEvaluationVariablesAreAvailableForWaveTypesDto,
  mockGetManyEvaluationVariablesAreAvailableForWaveTypesDto,
  mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
} from '../test-values.spec';
import { EvaluationVariablesAreAvailableForWaveTypes } from '../../../entities/evaluation-variables-are-available-for-wave-types.entity';

describe('EvaluationVariablesAreAvailableForWaveTypesService', () => {
  let service: EvaluationVariablesAreAvailableForWaveTypesService;
  let repository: Repository<EvaluationVariablesAreAvailableForWaveTypes>;
  let ztrackingService: ZtrackingEvaluationVariablesAreAvailableForWaveTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariablesAreAvailableForWaveTypesService,
        {
          provide: getRepositoryToken(
            EvaluationVariablesAreAvailableForWaveTypes,
          ),
          useClass: Repository,
        },
        {
          provide: ZtrackingEvaluationVariablesAreAvailableForWaveTypesService,
          useValue: {
            createZtrackingEntity: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<EvaluationVariablesAreAvailableForWaveTypesService>(
      EvaluationVariablesAreAvailableForWaveTypesService,
    );
    repository = module.get<
      Repository<EvaluationVariablesAreAvailableForWaveTypes>
    >(getRepositoryToken(EvaluationVariablesAreAvailableForWaveTypes));
    ztrackingService =
      module.get<ZtrackingEvaluationVariablesAreAvailableForWaveTypesService>(
        ZtrackingEvaluationVariablesAreAvailableForWaveTypesService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(ztrackingService).toBeDefined();
  });

  describe('createEvaluationVariablesAreAvailableForWaveTypesEntity', () => {
    it('should successfully create an entity and track changes', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(
          mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
        );
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
        );

      const result =
        await service.createEvaluationVariablesAreAvailableForWaveTypesEntity(
          mockCreateEvaluationVariablesAreAvailableForWaveTypesDto,
          'traceId1',
        );

      expect(repository.create).toHaveBeenCalledWith(
        mockCreateEvaluationVariablesAreAvailableForWaveTypesDto,
      );
      expect(repository.save).toHaveBeenCalledWith(
        mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
      );
      expect(ztrackingService.createZtrackingEntity).toHaveBeenCalledWith(
        mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
        'traceId1',
      );
      expect(result).toEqual(
        mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
      );
    });
  });

  describe('updateEvaluationVariablesAreAvailableForWaveTypesEntity', () => {
    it('should throw NotFoundException if entity does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateEvaluationVariablesAreAvailableForWaveTypesEntity(
          mockUpdateEvaluationVariablesAreAvailableForWaveTypesDto,
          'traceId2',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully update an entity and track changes', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
        );
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
        );

      const result =
        await service.updateEvaluationVariablesAreAvailableForWaveTypesEntity(
          mockUpdateEvaluationVariablesAreAvailableForWaveTypesDto,
          'traceId2',
        );

      expect(repository.save).toHaveBeenCalled();
      expect(ztrackingService.createZtrackingEntity).toHaveBeenCalled();
      expect(result).toEqual(
        mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
      );
    });
  });

  describe('deleteEvaluationVariablesAreAvailableForWaveTypesEntity', () => {
    it('should throw NotFoundException if entity does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteEvaluationVariablesAreAvailableForWaveTypesEntity(
          mockDeleteEvaluationVariablesAreAvailableForWaveTypesDto,
          'traceId3',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully mark an entity as deleted', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
        );
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
        );

      await service.deleteEvaluationVariablesAreAvailableForWaveTypesEntity(
        mockDeleteEvaluationVariablesAreAvailableForWaveTypesDto,
        'traceId3',
      );

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
      );
    });
  });

  describe('getOneEvaluationVariablesAreAvailableForWaveTypesEntity', () => {
    it('should throw BadRequestException if neither IDs provided', async () => {
      await expect(
        service.getOneEvaluationVariablesAreAvailableForWaveTypesEntity(
          {
            waveTypeId: '',
            environmentalVariableId: '',
            isAvailable: false,
          },
          'traceId4',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if no entity is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.getOneEvaluationVariablesAreAvailableForWaveTypesEntity(
          mockGetOneEvaluationVariablesAreAvailableForWaveTypesDto,
          'traceId4',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a found entity', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
        );

      const result =
        await service.getOneEvaluationVariablesAreAvailableForWaveTypesEntity(
          mockGetOneEvaluationVariablesAreAvailableForWaveTypesDto,
          'traceId4',
        );

      expect(result).toEqual(
        mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
      );
    });
  });

  describe('getManyEvaluationVariablesAreAvailableForWaveTypesEntities', () => {
    it('should throw NotFoundException if no entities match criteria', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyEvaluationVariablesAreAvailableForWaveTypesEntities(
          mockGetManyEvaluationVariablesAreAvailableForWaveTypesDto,
          'traceId5',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a list of entities', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([
          mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
        ]);

      const result =
        await service.getManyEvaluationVariablesAreAvailableForWaveTypesEntities(
          mockGetManyEvaluationVariablesAreAvailableForWaveTypesDto,
          'traceId5',
        );

      expect(result).toEqual([
        mockSavedEvaluationVariablesAreAvailableForWaveTypes001,
      ]);
    });
  });
});
