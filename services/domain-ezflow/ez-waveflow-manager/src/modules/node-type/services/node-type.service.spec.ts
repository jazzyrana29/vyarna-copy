import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockGetManyNodeTypesDto,
  mockGetOneNodeTypeDto,
  mockNodeTypeCase001,
  mockTraceIdForNodeType as mockTraceId,
} from '../test-values.spec';
import { NodeTypeService } from './node-type.service';
import { NodeType } from '../../../entities/node-type.entity';

describe('NodeTypeService', () => {
  let service: NodeTypeService;
  let repository: Repository<NodeType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeTypeService,
        {
          provide: getRepositoryToken(NodeType),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NodeTypeService>(NodeTypeService);
    repository = module.get<Repository<NodeType>>(getRepositoryToken(NodeType));
  });

  describe('getOneNodeType', () => {
    it('should return a node type', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockNodeTypeCase001);

      const result = await service.getOneNodeType(
        mockGetOneNodeTypeDto,
        mockTraceId,
      );

      expect(result).toEqual(mockNodeTypeCase001);
    });

    it('should throw NotFoundException if the node type is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneNodeType(mockGetOneNodeTypeDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneNodeType({ nodeTypeId: '', name: '' }, mockTraceId),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getManyNodeTypes', () => {
    it('should return an array of node types', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockNodeTypeCase001]);

      const result = await service.getManyNodeTypes(
        mockGetManyNodeTypesDto,
        mockTraceId,
      );

      expect(result).toEqual([mockNodeTypeCase001]);
    });

    it('should throw NotFoundException if no node types are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyNodeTypes(mockGetManyNodeTypesDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    // Uncomment and implement when details are available
    // it('should throw BadRequestException if request is invalid', async () => {
    //   await expect(service.getManyNodeTypes({}, mockTraceId)).rejects.toThrow(BadRequestException);
    // });
  });
});
