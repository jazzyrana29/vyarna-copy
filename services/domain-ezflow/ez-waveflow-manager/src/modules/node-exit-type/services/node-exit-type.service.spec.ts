import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NodeExitTypeService } from './node-exit-type.service';
import { NodeExitType } from '../../../entities/node-exit-type.entity';
import { GetNodeExitTypeDto, GetManyNodeExitTypesDto } from 'ez-utils';
import {
  mockSavedNodeExitTypeCase001,
  mockSavedNodeExitTypeCase002,
  mockGetNodeExitTypeDtoCase001,
  mockGetManyNodeExitTypesDtoCase002,
  mockTraceId,
} from '../test-values.spec';
import { NotFoundException } from '@nestjs/common';

const mockNodeExitTypeRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
};

describe('NodeExitTypeService', () => {
  let service: NodeExitTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeExitTypeService,
        {
          provide: getRepositoryToken(NodeExitType),
          useValue: mockNodeExitTypeRepository,
        },
      ],
    }).compile();

    service = module.get<NodeExitTypeService>(NodeExitTypeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findNodeExitType', () => {
    it('should find a node exit type by name', async () => {
      const mockDto: GetNodeExitTypeDto = mockGetNodeExitTypeDtoCase001;
      mockNodeExitTypeRepository.findOne.mockResolvedValueOnce(
        mockSavedNodeExitTypeCase001,
      );

      const result = await service.findNodeExitType(mockDto, mockTraceId);
      expect(result).toEqual(mockSavedNodeExitTypeCase001);
      expect(mockNodeExitTypeRepository.findOne).toHaveBeenCalledWith({
        where: { name: mockDto.name, isDeleted: false },
      });
    });

    it('should throw NotFoundException if no node exit type is found', async () => {
      const mockDto: GetNodeExitTypeDto = mockGetNodeExitTypeDtoCase001;
      mockNodeExitTypeRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.findNodeExitType(mockDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getManyNodeExitType', () => {
    it('should find multiple node exit type by name', async () => {
      const mockDto: GetManyNodeExitTypesDto =
        mockGetManyNodeExitTypesDtoCase002;
      mockNodeExitTypeRepository.find.mockResolvedValueOnce([
        mockSavedNodeExitTypeCase001,
        mockSavedNodeExitTypeCase002,
      ]);

      const result = await service.getManyNodeExitType(mockDto, mockTraceId);
      expect(result).toEqual([
        mockSavedNodeExitTypeCase001,
        mockSavedNodeExitTypeCase002,
      ]);
      expect(mockNodeExitTypeRepository.find).toHaveBeenCalledWith({
        where: { name: mockDto.name, isDeleted: false },
      });
    });

    it('should throw NotFoundException if no node exit type are found', async () => {
      const mockDto: GetManyNodeExitTypesDto =
        mockGetManyNodeExitTypesDtoCase002;
      mockNodeExitTypeRepository.find.mockResolvedValueOnce([]);

      await expect(
        service.getManyNodeExitType(mockDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
