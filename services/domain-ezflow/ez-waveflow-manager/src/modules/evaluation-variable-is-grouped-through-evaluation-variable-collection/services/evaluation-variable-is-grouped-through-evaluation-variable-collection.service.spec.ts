import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService } from './evaluation-variable-is-grouped-through-evaluation-variable-collection.service';
import { ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService } from './ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.service';

// Import mocks from the shared file
import {
  mockAddEvaluationVariableToCollectionDto,
  mockCreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  mockDeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
  mockGetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  mockRemoveEvaluationVariableToCollectionDto,
  mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection as mockTraceId,
  mockUpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
} from '../test-values.spec';
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollection } from '../../../entities/evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';

describe('EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService', () => {
  let service: EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService;
  let repository: Repository<EvaluationVariableIsGroupedThroughEvaluationVariableCollection>;
  let ztrackingService: ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
        {
          provide: getRepositoryToken(
            EvaluationVariableIsGroupedThroughEvaluationVariableCollection,
          ),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide:
            ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
          useValue: {
            createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection:
              jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service =
      module.get<EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService>(
        EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
      );
    repository = module.get<
      Repository<EvaluationVariableIsGroupedThroughEvaluationVariableCollection>
    >(
      getRepositoryToken(
        EvaluationVariableIsGroupedThroughEvaluationVariableCollection,
      ),
    );
    ztrackingService =
      module.get<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService>(
        ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
      );
  });

  describe('createEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should create and return a new evaluationVariableIsGroupedThroughEvaluationVariableCollection and call the ztracking service', async () => {
      // Mock the repository save call to return the created entity
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        );

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        )
        .mockResolvedValue(true);

      // Call the service method
      const result =
        await service.createEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          mockCreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
          mockTraceId,
        );

      // Assertions
      expect(result).toEqual(
        mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
      );

      // Ensure repository save is called with the correct data
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(
          mockCreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        ),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should update and return the updated evaluationVariableIsGroupedThroughEvaluationVariableCollection and called the ztracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        );
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        );

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        )
        .mockResolvedValue(true);

      const result =
        await service.updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          mockUpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
          mockTraceId,
        );

      expect(result).toEqual(
        mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
      );
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(
          mockUpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        ),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the evaluationVariableIsGroupedThroughEvaluationVariableCollection is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          mockUpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should mark the evaluationVariableIsGroupedThroughEvaluationVariableCollection as deleted and call the zTracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        );
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        isDeleted: true,
      } as EvaluationVariableIsGroupedThroughEvaluationVariableCollection);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        )
        .mockResolvedValue(true);

      const result =
        await service.deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          mockDeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
          mockTraceId,
        );

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          {
            evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
              '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the evaluationVariableIsGroupedThroughEvaluationVariableCollection is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          mockDeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should return an evaluation variable group', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        );

      const result =
        await service.getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          mockGetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
          mockTraceId,
        );

      expect(result).toEqual(
        mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
      );
    });

    it('should throw NotFoundException if the evaluationVariableIsGroupedThroughEvaluationVariableCollection is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          mockGetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          {
            evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
              '',
            isDeleted: false,
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('addEvaluationVariableToCollection', () => {
    it('should create a new relationship if not exists and call ztracking service', async () => {
      // Mock the repository to return undefined, simulating the relationship doesn't exist
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      // Mock the repository save call to return the created entity
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(
          mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        );

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        )
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.addEvaluationVariableToCollection(
        mockAddEvaluationVariableToCollectionDto,
        mockTraceId,
      );

      // Assertions
      expect(result).toEqual(
        mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
      );
      expect(repository.save).toHaveBeenCalled();
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should update the existing relationship and mark it as not deleted', async () => {
      // Mock the repository to return an existing deleted relationship
      jest.spyOn(repository, 'findOne').mockResolvedValue({
        ...mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        isDeleted: true,
      } as EvaluationVariableIsGroupedThroughEvaluationVariableCollection);

      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        isDeleted: false,
      } as EvaluationVariableIsGroupedThroughEvaluationVariableCollection);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        )
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.addEvaluationVariableToCollection(
        mockAddEvaluationVariableToCollectionDto,
        mockTraceId,
      );

      // Assertions
      expect(result.isDeleted).toBe(false);
      expect(repository.save).toHaveBeenCalled();
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if any of the required parameters are missing', async () => {
      await expect(
        service.addEvaluationVariableToCollection(
          {
            evaluationVariableId: '',
            evaluationVariableCollectionId: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('removeEvaluationVariableToCollection', () => {
    it('should mark the relationship as deleted and call ztracking service', async () => {
      // Mock the repository to return an active relationship
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(
          mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        );

      // Mock the repository save call to return the updated entity with isDeleted set to true
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        isDeleted: true,
      } as EvaluationVariableIsGroupedThroughEvaluationVariableCollection);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        )
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.removeEvaluationVariableToCollection(
        mockRemoveEvaluationVariableToCollectionDto,
        mockTraceId,
      );

      // Assertions
      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the active relationship is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.removeEvaluationVariableToCollection(
          mockRemoveEvaluationVariableToCollectionDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if any of the required parameters are missing', async () => {
      await expect(
        service.removeEvaluationVariableToCollection(
          {
            evaluationVariableId: '',
            evaluationVariableCollectionId: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
