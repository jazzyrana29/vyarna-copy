import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariableCollectionService } from './evaluation-variable-collection.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluationVariableCollection } from '../../../entities/evaluation-variable-collection.entity';
import { Repository } from 'typeorm';
import { ZtrackingEvaluationVariableCollectionService } from './ztracking-evaluation-variable-collection.service';
import {
  mockCreateEvaluationVariableCollectionDto,
  mockSavedEvaluationVariableCollection001,
  mockUpdateEvaluationVariableCollectionDto,
  mockDeleteEvaluationVariableCollectionDto,
  mockGetOneEvaluationVariableCollectionDto,
  mockGetManyEvaluationVariableCollectionsDto,
} from '../test-values.spec';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('EvaluationVariableCollectionService', () => {
  let service: EvaluationVariableCollectionService;
  let repository: Repository<EvaluationVariableCollection>;
  let ztrackingService: ZtrackingEvaluationVariableCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableCollectionService,
        {
          provide: getRepositoryToken(EvaluationVariableCollection),
          useClass: Repository,
        },
        {
          provide: ZtrackingEvaluationVariableCollectionService,
          useValue: {
            createZtrackingEvaluationVariableCollectionEntity: jest
              .fn()
              .mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<EvaluationVariableCollectionService>(
      EvaluationVariableCollectionService,
    );
    repository = module.get<Repository<EvaluationVariableCollection>>(
      getRepositoryToken(EvaluationVariableCollection),
    );
    ztrackingService = module.get<ZtrackingEvaluationVariableCollectionService>(
      ZtrackingEvaluationVariableCollectionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(ztrackingService).toBeDefined();
  });

  describe('createEvaluationVariableCollection', () => {
    it('should successfully create an evaluation variable collection and track changes', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(mockSavedEvaluationVariableCollection001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedEvaluationVariableCollection001);

      const result = await service.createEvaluationVariableCollection(
        mockCreateEvaluationVariableCollectionDto,
        'traceId1',
      );

      expect(repository.create).toHaveBeenCalledWith(
        mockCreateEvaluationVariableCollectionDto,
      );
      expect(repository.save).toHaveBeenCalledWith(
        mockSavedEvaluationVariableCollection001,
      );
      expect(
        ztrackingService.createZtrackingEvaluationVariableCollectionEntity,
      ).toHaveBeenCalledWith(
        mockSavedEvaluationVariableCollection001,
        'traceId1',
      );
      expect(result).toEqual(mockSavedEvaluationVariableCollection001);
    });
  });

  describe('updateEvaluationVariableCollection', () => {
    it('should throw NotFoundException if collection does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateEvaluationVariableCollection(
          mockUpdateEvaluationVariableCollectionDto,
          'traceId2',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully update an evaluation variable collection and track changes', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedEvaluationVariableCollection001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedEvaluationVariableCollection001);

      const result = await service.updateEvaluationVariableCollection(
        mockUpdateEvaluationVariableCollectionDto,
        'traceId2',
      );

      expect(repository.save).toHaveBeenCalled();
      expect(
        ztrackingService.createZtrackingEvaluationVariableCollectionEntity,
      ).toHaveBeenCalled();
      expect(result).toEqual(mockSavedEvaluationVariableCollection001);
    });
  });

  describe('deleteEvaluationVariableCollection', () => {
    it('should throw NotFoundException if collection does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteEvaluationVariableCollection(
          mockDeleteEvaluationVariableCollectionDto,
          'traceId3',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully mark an evaluation variable collection as deleted', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedEvaluationVariableCollection001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedEvaluationVariableCollection001);

      await service.deleteEvaluationVariableCollection(
        mockDeleteEvaluationVariableCollectionDto,
        'traceId3',
      );

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
      );
    });
  });

  describe('getOneEvaluationVariableCollection', () => {
    it('should throw BadRequestException if neither ID nor name is provided', async () => {
      await expect(
        service.getOneEvaluationVariableCollection(
          { evaluationVariableCollectionId: '', name: '' },
          'traceId4',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if no collection is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.getOneEvaluationVariableCollection(
          mockGetOneEvaluationVariableCollectionDto,
          'traceId4',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a found evaluation variable collection', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedEvaluationVariableCollection001);

      const result = await service.getOneEvaluationVariableCollection(
        mockGetOneEvaluationVariableCollectionDto,
        'traceId4',
      );

      expect(result).toEqual(mockSavedEvaluationVariableCollection001);
    });
  });

  describe('getManyEvaluationVariableCollections', () => {
    it('should throw NotFoundException if no collections match the criteria', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyEvaluationVariableCollections(
          mockGetManyEvaluationVariableCollectionsDto,
          'traceId5',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a list of evaluation variable collections', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockSavedEvaluationVariableCollection001]);

      const result = await service.getManyEvaluationVariableCollections(
        mockGetManyEvaluationVariableCollectionsDto,
        'traceId5',
      );

      expect(result).toEqual([mockSavedEvaluationVariableCollection001]);
    });
  });
});
