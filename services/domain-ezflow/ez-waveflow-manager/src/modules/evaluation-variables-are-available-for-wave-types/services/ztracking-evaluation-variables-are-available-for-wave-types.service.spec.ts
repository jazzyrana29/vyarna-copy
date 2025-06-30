import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingEvaluationVariablesAreAvailableForWaveTypesService } from './ztracking-evaluation-variables-are-available-for-wave-types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingEvaluationVariablesAreAvailableForWaveTypes } from '../../../entities/ztracking-evaluation-variables-are-available-for-wave-types.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { MockType, repositoryMockFactory } from 'ez-utils';
import { GetHistoryEvaluationVariablesAreAvailableForWaveTypesDto } from 'ez-utils';

describe('ZtrackingEvaluationVariablesAreAvailableForWaveTypesService', () => {
  let service: ZtrackingEvaluationVariablesAreAvailableForWaveTypesService;
  let repository: MockType<
    Repository<ZtrackingEvaluationVariablesAreAvailableForWaveTypes>
  >;

  // Mock data
  const mockWaveTypeId = 'uuidWaveType';
  const mockEnvVariableId = 'uuidEnvVar';
  const mockTraceId = 'traceIdForMockTest';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingEvaluationVariablesAreAvailableForWaveTypesService,
        {
          provide: getRepositoryToken(
            ZtrackingEvaluationVariablesAreAvailableForWaveTypes,
          ),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service =
      module.get<ZtrackingEvaluationVariablesAreAvailableForWaveTypesService>(
        ZtrackingEvaluationVariablesAreAvailableForWaveTypesService,
      );
    repository = module.get(
      getRepositoryToken(ZtrackingEvaluationVariablesAreAvailableForWaveTypes),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createZtrackingEntity', () => {
    it('should create a ztracking entity successfully', async () => {
      const entity = {
        waveTypeId: mockWaveTypeId,
        environmentalVariableId: mockEnvVariableId,
        isAvailable: true,
      } as any;

      const mockZtrackingEntity = {
        ztrackingVersion: 'version',
        waveTypeId: mockWaveTypeId,
        environmentalVariableId: mockEnvVariableId,
        versionDate: new Date(),
      };

      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockZtrackingEntity as any);

      const result = await service.createZtrackingEntity(entity, mockTraceId);

      expect(result).toEqual(true);
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const entity = {
        waveTypeId: mockWaveTypeId,
        environmentalVariableId: mockEnvVariableId,
      } as any;

      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.createZtrackingEntity(entity, mockTraceId),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingEntities', () => {
    it('should find ztracking entities based on criteria', async () => {
      const dto: GetHistoryEvaluationVariablesAreAvailableForWaveTypesDto = {
        waveTypeId: mockWaveTypeId,
        environmentalVariableId: mockEnvVariableId,
      };

      const mockZtrackingEntity = {
        ztrackingVersion: 'version',
        waveTypeId: mockWaveTypeId,
        environmentalVariableId: mockEnvVariableId,
        versionDate: new Date(),
      };

      jest.spyOn(repository, 'find').mockResolvedValue([mockZtrackingEntity]);

      const result = await service.findZtrackingEntities(dto, mockTraceId);

      expect(result).toEqual([mockZtrackingEntity]);
    });

    it('should throw NotFoundException if no entities are found', async () => {
      const dto: GetHistoryEvaluationVariablesAreAvailableForWaveTypesDto = {
        waveTypeId: mockWaveTypeId,
        environmentalVariableId: mockEnvVariableId,
      };

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.findZtrackingEntities(dto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException on invalid input', async () => {
      const dto: GetHistoryEvaluationVariablesAreAvailableForWaveTypesDto = {
        waveTypeId: undefined,
        environmentalVariableId: mockEnvVariableId,
      };

      await expect(
        service.findZtrackingEntities(dto, mockTraceId),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
