import { Test, TestingModule } from '@nestjs/testing';
import { OperatorService } from './operator.service';
import { ZtrackingOperatorService } from './ztracking-operator.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operator } from '../../../entities/operator.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockCreateOperatorDtoCase001,
  mockGetManyOperatorCase001,
  mockGetManyOperatorCase002,
  mockGetOperatorCase001,
  mockGetOperatorCase002,
  mockOperatorId002,
  mockSavedOperatorCase001,
  mockSavedOperatorCase002,
  mockTraceIdForOperator,
  mockUpdateOperatorDtoCase002,
} from '../test-values.spec';
// Importing mock DTOs from test-values.spec.ts

describe('OperatorService', () => {
  let service: OperatorService;
  let repository: Repository<Operator>;
  let ztrackingOperatorService: ZtrackingOperatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorService,
        ZtrackingOperatorService,
        {
          provide: getRepositoryToken(Operator),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OperatorService>(OperatorService);
    repository = module.get<Repository<Operator>>(getRepositoryToken(Operator));
    ztrackingOperatorService = module.get<ZtrackingOperatorService>(
      ZtrackingOperatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOperator', () => {
    it('should create and return an operator', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(mockSavedOperatorCase001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedOperatorCase001);
      jest
        .spyOn(ztrackingOperatorService, 'createZtrackingOperatorEntity')
        .mockResolvedValue(true);

      const result = await service.createOperator(
        mockCreateOperatorDtoCase001,
        mockTraceIdForOperator,
      );
      expect(repository.create).toHaveBeenCalledWith(
        mockCreateOperatorDtoCase001,
      );
      expect(repository.save).toHaveBeenCalledWith(
        mockCreateOperatorDtoCase001,
      );
      expect(result).toEqual(mockSavedOperatorCase001);
    });
  });

  describe('updateOperatorUnit', () => {
    it('should throw NotFoundException if operator not found', async () => {
      // mockSavedOperatorCase002
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateOperatorUnit(
          mockUpdateOperatorDtoCase002,
          mockTraceIdForOperator,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update and return an operator', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedOperatorCase002);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedOperatorCase002);
      jest
        .spyOn(ztrackingOperatorService, 'createZtrackingOperatorEntity')
        .mockResolvedValue(true);

      const result = await service.updateOperatorUnit(
        mockUpdateOperatorDtoCase002,
        mockTraceIdForOperator,
      );
      expect(repository.save).toHaveBeenCalledWith(
        mockUpdateOperatorDtoCase002,
      );
      expect(result).toEqual(mockSavedOperatorCase002);
    });
  });

  describe('findOperator', () => {
    it('should throw NotFoundException if no criteria provided', async () => {
      await expect(
        service.findOperator(mockGetOperatorCase002, mockTraceIdForOperator),
      ).rejects.toThrow(NotFoundException);
    });

    it('should find and return an operator', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedOperatorCase001);

      const result = await service.findOperator(
        mockGetOperatorCase001,
        mockTraceIdForOperator,
      );
      expect(result).toEqual(mockSavedOperatorCase001);
    });
  });

  describe('findManyOperators', () => {
    it('should throw NotFoundException if no criteria provided', async () => {
      await expect(
        service.findManyOperators(
          mockGetManyOperatorCase002,
          mockTraceIdForOperator,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    const mockSavedOperatorCase002 = {
      ...mockSavedOperatorCase001,
      operatorId: mockOperatorId002,
    } as Operator;
    it('should find and return multiple operators', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([
          mockSavedOperatorCase001,
          mockSavedOperatorCase002,
        ]);

      const result = await service.findManyOperators(
        mockGetManyOperatorCase001,
        mockTraceIdForOperator,
      );
      expect(result).toEqual([mockSavedOperatorCase001]);
    });
  });
});
