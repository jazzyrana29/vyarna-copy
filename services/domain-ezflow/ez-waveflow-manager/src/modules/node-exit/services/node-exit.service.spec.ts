import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateNodeExitDto,
  mockDeleteNodeExitDto,
  mockGetOneNodeExitDto,
  mockNodeExitCase001,
  mockTraceIdForNodeExit as mockTraceId,
  mockUpdateNodeExitDto,
} from '../test-values.spec';
import { NodeExitService } from './node-exit.service';
import { NodeExit } from '../../../entities/node-exit.entity';
import { ZtrackingNodeExitService } from './ztracking-node-exit.service';

describe('NodeExitService', () => {
  let service: NodeExitService;
  let repository: Repository<NodeExit>;
  let ztrackingService: ZtrackingNodeExitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeExitService,
        {
          provide: getRepositoryToken(NodeExit),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingNodeExitService,
          useValue: {
            createZtrackingForNodeExit: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<NodeExitService>(NodeExitService);
    repository = module.get<Repository<NodeExit>>(getRepositoryToken(NodeExit));
    ztrackingService = module.get<ZtrackingNodeExitService>(
      ZtrackingNodeExitService,
    );
  });

  describe('createNodeExit', () => {
    it('should create and return a new node exit and call the ztracking service', async () => {
      // Mock the repository save call to return the created entity
      jest.spyOn(repository, 'save').mockResolvedValue(mockNodeExitCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForNodeExit')
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.createNodeExit(
        mockCreateNodeExitDto,
        mockTraceId,
      );

      // Assertions
      expect(result).toEqual(mockNodeExitCase001);

      // Ensure repository save is called with the correct data
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockCreateNodeExitDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateNodeExit', () => {
    it('should update and return the updated node exit and call the ztracking service', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockNodeExitCase001);
      jest.spyOn(repository, 'save').mockResolvedValue(mockNodeExitCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForNodeExit')
        .mockResolvedValue(true);

      const result = await service.updateNodeExit(
        mockUpdateNodeExitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockNodeExitCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockUpdateNodeExitDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the node exit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateNodeExit(mockUpdateNodeExitDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteNodeExit', () => {
    it('should mark the node exit as deleted and call the zTracking service', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockNodeExitCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockNodeExitCase001,
        isDeleted: true,
      } as NodeExit);

      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForNodeExit')
        .mockResolvedValue(true);

      const result = await service.deleteNodeExit(
        mockDeleteNodeExitDto,
        mockTraceId,
      );

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteNodeExit(
          {
            nodeExitId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the node exit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteNodeExit(mockDeleteNodeExitDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneNodeExit', () => {
    it('should return a node exit', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockNodeExitCase001);

      const result = await service.getOneNodeExit(
        mockGetOneNodeExitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockNodeExitCase001);
    });

    it('should throw NotFoundException if the node exit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneNodeExit(mockGetOneNodeExitDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneNodeExit(
          { nodeExitId: '', isDeleted: true },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
