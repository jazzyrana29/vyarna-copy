import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateNodeDto,
  mockDeleteNodeDto,
  mockGetOneNodeDto,
  mockNodeCase001,
  mockTraceIdForNode as mockTraceId,
  mockUpdateNodeDto,
} from '../test-values.spec';
import { NodeService } from './node.service';
import { Node } from '../../../entities/node.entity';
import { ZtrackingNodeService } from './ztracking-node.service';

describe('NodeService', () => {
  let service: NodeService;
  let repository: Repository<Node>;
  let ztrackingService: ZtrackingNodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeService,
        {
          provide: getRepositoryToken(Node),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingNodeService,
          useValue: {
            createZtrackingForNode: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<NodeService>(NodeService);
    repository = module.get<Repository<Node>>(getRepositoryToken(Node));
    ztrackingService = module.get<ZtrackingNodeService>(ZtrackingNodeService);
  });

  describe('createNode', () => {
    it('should create and return a new node and call the ztracking service', async () => {
      // Mock the repository save call to return the created entity
      jest.spyOn(repository, 'save').mockResolvedValue(mockNodeCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForNode')
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.createNode(mockCreateNodeDto, mockTraceId);

      // Assertions
      expect(result).toEqual(mockNodeCase001);

      // Ensure repository save is called with the correct data
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockCreateNodeDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateNode', () => {
    it('should update and return the updated node and call the ztracking service', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockNodeCase001);
      jest.spyOn(repository, 'save').mockResolvedValue(mockNodeCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForNode')
        .mockResolvedValue(true);

      const result = await service.updateNode(mockUpdateNodeDto, mockTraceId);

      expect(result).toEqual(mockNodeCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockUpdateNodeDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the node is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateNode(mockUpdateNodeDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteNode', () => {
    it('should mark the node as deleted and call the zTracking service', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockNodeCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockNodeCase001,
        isDeleted: true,
      } as Node);

      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForNode')
        .mockResolvedValue(true);

      const result = await service.deleteNode(mockDeleteNodeDto, mockTraceId);

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteNode(
          {
            nodeId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the node is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteNode(mockDeleteNodeDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneNode', () => {
    it('should return a node', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockNodeCase001);

      const result = await service.getOneNode(mockGetOneNodeDto, mockTraceId);

      expect(result).toEqual(mockNodeCase001);
    });

    it('should throw NotFoundException if the node is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneNode(mockGetOneNodeDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneNode(
          { nodeId: '', name: '', isDeleted: true },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
