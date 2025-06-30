import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateManifoldDto,
  mockDeleteManifoldDto,
  mockGetOneManifoldDto,
  mockManifoldCase001,
  mockTraceIdForManifold as mockTraceId,
  mockUpdateManifoldDto,
} from '../test-values.spec';
import { ManifoldService } from './manifold.service';
import { Manifold } from '../../../entities/manifold.entity';
import { ZtrackingManifoldService } from './ztracking-manifold.service';

describe('ManifoldService', () => {
  let service: ManifoldService;
  let repository: Repository<Manifold>;
  let ztrackingService: ZtrackingManifoldService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManifoldService,
        {
          provide: getRepositoryToken(Manifold),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingManifoldService,
          useValue: {
            createZtrackingForManifold: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<ManifoldService>(ManifoldService);
    repository = module.get<Repository<Manifold>>(getRepositoryToken(Manifold));
    ztrackingService = module.get<ZtrackingManifoldService>(
      ZtrackingManifoldService,
    );
  });

  describe('createManifold', () => {
    it('should create and return a new manifold and call the ztracking service', async () => {
      // Mock the repository save call to return the created entity
      jest.spyOn(repository, 'save').mockResolvedValue(mockManifoldCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForManifold')
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.createManifold(
        mockCreateManifoldDto,
        mockTraceId,
      );

      // Assertions
      expect(result).toEqual(mockManifoldCase001);

      // Ensure repository save is called with the correct data
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockCreateManifoldDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateManifold', () => {
    it('should update and return the updated manifold and called the ztracking service', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockManifoldCase001);
      jest.spyOn(repository, 'save').mockResolvedValue(mockManifoldCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForManifold')
        .mockResolvedValue(true);

      const result = await service.updateManifold(
        mockUpdateManifoldDto,
        mockTraceId,
      );

      expect(result).toEqual(mockManifoldCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockUpdateManifoldDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the manifold is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateManifold(mockUpdateManifoldDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteManifold', () => {
    it('should mark the manifold as deleted and call the zTracking service', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockManifoldCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockManifoldCase001,
        isDeleted: true,
      } as Manifold);

      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForManifold')
        .mockResolvedValue(true);

      const result = await service.deleteManifold(
        mockDeleteManifoldDto,
        mockTraceId,
      );

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteManifold(
          {
            manifoldId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the manifold is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteManifold(mockDeleteManifoldDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneManifold', () => {
    it('should return an evaluation variable group', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockManifoldCase001);

      const result = await service.getOneManifold(
        mockGetOneManifoldDto,
        mockTraceId,
      );

      expect(result).toEqual(mockManifoldCase001);
    });

    it('should throw NotFoundException if the manifold is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneManifold(mockGetOneManifoldDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneManifold(
          { manifoldId: '', name: '', isDeleted: true },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
