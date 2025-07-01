import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

// Entities and Services
import { EvaluationVariableCollectionsArePresentedThroughPortfolios } from '../../../entities/evaluation-variable-collections-are-presented-through-portfolios.entity';
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosService } from './evaluation-variable-collections-are-presented-through-portfolios.service';
import { ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService } from './ztracking-evaluation-variable-collections-are-presented-through-portfolios.service';

// Mocks
import { mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001 } from '../test-values.spec';

describe('EvaluationVariableCollectionsArePresentedThroughPortfoliosService', () => {
  let service: EvaluationVariableCollectionsArePresentedThroughPortfoliosService;
  let repository: Repository<EvaluationVariableCollectionsArePresentedThroughPortfolios>;
  let ztrackingService: ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableCollectionsArePresentedThroughPortfoliosService,
        {
          provide: getRepositoryToken(
            EvaluationVariableCollectionsArePresentedThroughPortfolios,
          ),
          useClass: Repository,
        },
        {
          provide:
            ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService,
          useValue: {
            createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity:
              jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service =
      module.get<EvaluationVariableCollectionsArePresentedThroughPortfoliosService>(
        EvaluationVariableCollectionsArePresentedThroughPortfoliosService,
      );
    repository = module.get<
      Repository<EvaluationVariableCollectionsArePresentedThroughPortfolios>
    >(
      getRepositoryToken(
        EvaluationVariableCollectionsArePresentedThroughPortfolios,
      ),
    );
    ztrackingService =
      module.get<ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService>(
        ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(ztrackingService).toBeDefined();
  });

  describe('createEvaluationVariableCollectionsArePresentedThroughPortfolios', () => {
    it('should successfully create an entity and track changes', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );

      const result =
        await service.createEvaluationVariableCollectionsArePresentedThroughPortfolios(
          {
            evaluationVariableCollectionPortfolio: {
              evaluationVariableCollectionPortfolioId: 'somePortfolioId',
            },
            evaluationVariableCollection: {
              evaluationVariableCollectionId: 'someCollectionId',
            },
            updatedBy: 'userId',
          },
          'traceId1',
        );

      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
      expect(
        ztrackingService.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity,
      ).toHaveBeenCalledWith(
        mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        'traceId1',
      );
      expect(result).toEqual(
        mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
      );
    });

    it('should handle errors gracefully when creating an entity', async () => {
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.createEvaluationVariableCollectionsArePresentedThroughPortfolios(
          {
            evaluationVariableCollectionPortfolio: {
              evaluationVariableCollectionPortfolioId: 'somePortfolioId',
            },
            evaluationVariableCollection: {
              evaluationVariableCollectionId: 'someCollectionId',
            },
            updatedBy: 'userId',
          },
          'traceId1',
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('updateEvaluationVariableCollectionsArePresentedThroughPortfolios', () => {
    it('should throw NotFoundException if entity does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateEvaluationVariableCollectionsArePresentedThroughPortfolios(
          {
            evaluationVariableCollectionsArePresentedThroughPortfoliosId:
              'nonexistentId',
            evaluationVariableCollectionPortfolio: {
              evaluationVariableCollectionPortfolioId: 'somePortfolioId',
            },
            evaluationVariableCollection: {
              evaluationVariableCollectionId: 'someCollectionId',
            },
            updatedBy: 'userId',
          },
          'traceId2',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully update an entity and track changes', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );

      const result =
        await service.updateEvaluationVariableCollectionsArePresentedThroughPortfolios(
          {
            evaluationVariableCollectionsArePresentedThroughPortfoliosId:
              'someId',
            evaluationVariableCollectionPortfolio: {
              evaluationVariableCollectionPortfolioId: 'somePortfolioId',
            },
            evaluationVariableCollection: {
              evaluationVariableCollectionId: 'someCollectionId',
            },
            updatedBy: 'userId',
          },
          'traceId2',
        );

      expect(repository.save).toHaveBeenCalled();
      expect(
        ztrackingService.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity,
      ).toHaveBeenCalled();
      expect(result).toEqual(
        mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
      );
    });
  });

  describe('deleteEvaluationVariableCollectionsArePresentedThroughPortfolios', () => {
    it('should throw NotFoundException if entity does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteEvaluationVariableCollectionsArePresentedThroughPortfolios(
          {
            evaluationVariableCollectionsArePresentedThroughPortfoliosId:
              'nonexistentId',
          },
          'traceId3',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully mark an entity as deleted', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );

      await service.deleteEvaluationVariableCollectionsArePresentedThroughPortfolios(
        {
          evaluationVariableCollectionsArePresentedThroughPortfoliosId:
            'someId',
        },
        'traceId3',
      );

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
      );
    });
  });

  describe('getOneEvaluationVariableCollectionsArePresentedThroughPortfolios', () => {
    it('should throw BadRequestException if ID is not provided', async () => {
      await expect(
        service.getOneEvaluationVariableCollectionsArePresentedThroughPortfolios(
          { evaluationVariableCollectionsArePresentedThroughPortfoliosId: '' },
          'traceId4',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if no entity is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.getOneEvaluationVariableCollectionsArePresentedThroughPortfolios(
          {
            evaluationVariableCollectionsArePresentedThroughPortfoliosId:
              'someId',
          },
          'traceId4',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a found entity', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );

      const result =
        await service.getOneEvaluationVariableCollectionsArePresentedThroughPortfolios(
          {
            evaluationVariableCollectionsArePresentedThroughPortfoliosId:
              'someId',
          },
          'traceId4',
        );

      expect(result).toEqual(
        mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
      );
    });
  });

  describe('getManyEvaluationVariableCollectionsArePresentedThroughPortfolios', () => {
    it('should throw NotFoundException if no entities match the criteria', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyEvaluationVariableCollectionsArePresentedThroughPortfolios(
          {
            evaluationVariableCollectionPortfolio: {
              evaluationVariableCollectionPortfolioId: 'somePortfolioId',
            },
            isDeleted: false,
          },
          'traceId5',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a list of entities', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        ]);

      const result =
        await service.getManyEvaluationVariableCollectionsArePresentedThroughPortfolios(
          {
            evaluationVariableCollectionPortfolio: {
              evaluationVariableCollectionPortfolioId: 'somePortfolioId',
            },
            isDeleted: false,
          },
          'traceId5',
        );

      expect(result).toEqual([
        mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
      ]);
    });
  });

  describe('addEvaluationVariableCollectionToPortfolio', () => {
    it('should add a new entity if none exists and track changes', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );

      const result = await service.addEvaluationVariableCollectionToPortfolio(
        {
          evaluationVariableCollectionId: 'someCollectionId',
          evaluationVariableCollectionPortfolioId: 'somePortfolioId',
        },
        'traceId1',
      );

      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
      expect(
        ztrackingService.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity,
      ).toHaveBeenCalledWith(
        mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        'traceId1',
      );
      expect(result).toEqual(
        mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
      );
    });

    it('should update an existing marked-as-deleted entity and track changes', async () => {
      const existingEntity = {
        ...mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        isDeleted: true,
      };
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(existingEntity as any);
      jest.spyOn(repository, 'save').mockResolvedValue(existingEntity as any);

      const result = await service.addEvaluationVariableCollectionToPortfolio(
        {
          evaluationVariableCollectionId: 'someCollectionId',
          evaluationVariableCollectionPortfolioId: 'somePortfolioId',
        },
        'traceId1',
      );

      expect(existingEntity.isDeleted).toBe(false);
      expect(repository.save).toHaveBeenCalled();
      expect(
        ztrackingService.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity,
      ).toHaveBeenCalled();
      expect(result).toEqual(existingEntity);
    });

    it('should throw BadRequestException if input parameters are missing', async () => {
      await expect(
        service.addEvaluationVariableCollectionToPortfolio(
          {
            evaluationVariableCollectionId: '',
            evaluationVariableCollectionPortfolioId: '',
          },
          'traceId1',
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('removeEvaluationVariableCollectionToPortfolio', () => {
    it('should mark an existing entity as deleted and track changes', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
        );

      const result =
        await service.removeEvaluationVariableCollectionToPortfolio(
          {
            evaluationVariableCollectionId: 'someCollectionId',
            evaluationVariableCollectionPortfolioId: 'somePortfolioId',
          },
          'traceId2',
        );

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
      );
      expect(
        ztrackingService.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity,
      ).toHaveBeenCalled();
      expect(result).toEqual(
        mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
      );
    });

    it('should throw NotFoundException if no matching entity is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.removeEvaluationVariableCollectionToPortfolio(
          {
            evaluationVariableCollectionId: 'someCollectionId',
            evaluationVariableCollectionPortfolioId: 'somePortfolioId',
          },
          'traceId2',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if input parameters are missing', async () => {
      await expect(
        service.removeEvaluationVariableCollectionToPortfolio(
          {
            evaluationVariableCollectionId: '',
            evaluationVariableCollectionPortfolioId: '',
          },
          'traceId2',
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
