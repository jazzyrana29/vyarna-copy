import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InputValueTypeService } from './input-value-type.service';
import { InputValueType } from '../../../entities/input-value-type.entity';
import { GetInputValueTypeDto, GetManyInputValueTypesDto } from 'ez-utils';
import {
  mockSavedInputValueTypeCase001,
  mockSavedInputValueTypeCase002,
  mockGetInputValueTypeDtoCase001,
  mockGetManyInputValueTypesDtoCase002,
  mockTraceId,
} from '../test-values.spec';
import { NotFoundException } from '@nestjs/common';

const mockInputValueTypeRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
};

describe('InputValueTypeService', () => {
  let service: InputValueTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InputValueTypeService,
        {
          provide: getRepositoryToken(InputValueType),
          useValue: mockInputValueTypeRepository,
        },
      ],
    }).compile();

    service = module.get<InputValueTypeService>(InputValueTypeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findInputValueTypeService', () => {
    it('should find an input value type by name', async () => {
      const mockDto: GetInputValueTypeDto = mockGetInputValueTypeDtoCase001;
      mockInputValueTypeRepository.findOne.mockResolvedValueOnce(
        mockSavedInputValueTypeCase001,
      );

      const result = await service.findInputValueTypeService(
        mockDto,
        mockTraceId,
      );
      expect(result).toEqual(mockSavedInputValueTypeCase001);
      expect(mockInputValueTypeRepository.findOne).toHaveBeenCalledWith({
        where: { name: mockDto.name, isDeleted: false },
      });
    });

    it('should throw NotFoundException if no input value type is found', async () => {
      const mockDto: GetInputValueTypeDto = mockGetInputValueTypeDtoCase001;
      mockInputValueTypeRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.findInputValueTypeService(mockDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getManyInputValueTypeService', () => {
    it('should find multiple input value type by name', async () => {
      const mockDto: GetManyInputValueTypesDto =
        mockGetManyInputValueTypesDtoCase002;
      mockInputValueTypeRepository.find.mockResolvedValueOnce([
        mockSavedInputValueTypeCase001,
        mockSavedInputValueTypeCase002,
      ]);

      const result = await service.getManyInputValueTypeService(
        mockDto,
        mockTraceId,
      );
      expect(result).toEqual([
        mockSavedInputValueTypeCase001,
        mockSavedInputValueTypeCase002,
      ]);
      expect(mockInputValueTypeRepository.find).toHaveBeenCalledWith({
        where: { name: mockDto.name, isDeleted: false },
      });
    });

    it('should throw NotFoundException if no input value type are found', async () => {
      const mockDto: GetManyInputValueTypesDto =
        mockGetManyInputValueTypesDtoCase002;
      mockInputValueTypeRepository.find.mockResolvedValueOnce([]);

      await expect(
        service.getManyInputValueTypeService(mockDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
