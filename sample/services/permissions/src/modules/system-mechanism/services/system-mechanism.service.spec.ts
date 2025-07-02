import { Test, TestingModule } from '@nestjs/testing';
import { SystemMechanismService } from './system-mechanism.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemMechanism } from '../../../entities/system-mechanism.entity';
import { LogStreamLevel } from 'ez-logger';
import { MockType, repositoryMockFactory } from 'ez-utils';
import { NotFoundException } from '@nestjs/common';
import {
  mockFindParams,
  mockHistoricalParams,
  mockHistoricalResults,
  mockName,
  mockSystemMechanism,
  mockSystemMechanismId001,
  mockTraceId,
} from '../test-values.spec';

describe('SystemMechanismService', () => {
  let systemMechanismService: SystemMechanismService;
  let systemMechanismRepository: MockType<Repository<SystemMechanism>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemMechanismService,
        {
          provide: getRepositoryToken(SystemMechanism),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    systemMechanismService = module.get<SystemMechanismService>(
      SystemMechanismService,
    );
    systemMechanismRepository = module.get(getRepositoryToken(SystemMechanism));
  });

  describe('findSystemMechanism', () => {
    it('should find a system mechanism by systemMechanismId', async () => {
      const traceId = mockTraceId;
      const findParams = mockFindParams;

      systemMechanismRepository.findOne.mockResolvedValue(mockSystemMechanism);

      const infoSpy = jest.spyOn(systemMechanismService['logger'], 'info');
      const debugSpy = jest.spyOn(systemMechanismService['logger'], 'debug');

      const result = await systemMechanismService.findSystemMechanism(
        findParams,
        traceId,
      );

      expect(result).toEqual(mockSystemMechanism);
      expect(systemMechanismRepository.findOne).toHaveBeenCalledWith({
        where: findParams,
      });
      expect(infoSpy).toHaveBeenCalledWith(
        `System mechanism entity found in database`,
        traceId,
        'findSystemMechanism',
        LogStreamLevel.ProdStandard,
      );
      expect(debugSpy).toHaveBeenCalled();
    });

    it('should throw NotFoundException if system mechanism is not found', async () => {
      const traceId = mockTraceId;
      const findParams: any = {
        ...mockFindParams,
        systemMechanismId: 'nonexistent-id',
      };

      systemMechanismRepository.findOne.mockResolvedValue(null);

      await expect(
        systemMechanismService.findSystemMechanism(findParams, traceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if no id or name is provided', async () => {
      const traceId = mockTraceId;

      await expect(
        systemMechanismService.findSystemMechanism(
          {
            isDeleted: false,
            name: mockName,
            systemMechanismId: mockSystemMechanismId001,
          },
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findHistoricalData', () => {
    it('should find historical data with given criteria', async () => {
      const traceId = mockTraceId;
      const historicalParams = mockHistoricalParams;

      systemMechanismRepository.find.mockResolvedValue(mockHistoricalResults);

      const infoSpy = jest.spyOn(systemMechanismService['logger'], 'info');
      const debugSpy = jest.spyOn(systemMechanismService['logger'], 'debug');

      const result = await systemMechanismService.findHistoricalData(
        historicalParams,
        traceId,
      );

      expect(result).toEqual(mockHistoricalResults);
      expect(systemMechanismRepository.find).toHaveBeenCalledWith({
        where: historicalParams,
      });
      expect(infoSpy).toHaveBeenCalledWith(
        `Historical data entity found in database`,
        traceId,
        'findHistoricalData',
        LogStreamLevel.ProdStandard,
      );
      expect(debugSpy).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no historical data found', async () => {
      const traceId = mockTraceId;
      const historicalParams = mockHistoricalParams;

      systemMechanismRepository.find.mockResolvedValue([]);

      await expect(
        systemMechanismService.findHistoricalData(historicalParams, traceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should handle errors and log them', async () => {
      const traceId = mockTraceId;
      const historicalParams = mockHistoricalParams;

      const error = new Error('Database error');
      systemMechanismRepository.find.mockRejectedValue(error);

      const errorSpy = jest.spyOn(systemMechanismService['logger'], 'error');

      await expect(
        systemMechanismService.findHistoricalData(historicalParams, traceId),
      ).rejects.toThrow(Error);

      expect(errorSpy).toHaveBeenCalledWith(
        `Error while fetching historical data: ${error.message}`,
        traceId,
        'findHistoricalData',
        LogStreamLevel.ProdStandard,
      );
    });
  });

  describe('getManySystemMechanisms', () => {
    it('should retrieve multiple system mechanisms that are not deleted', async () => {
      const traceId = mockTraceId;
      const systemMechanisms = [mockSystemMechanism];

      systemMechanismRepository.find.mockResolvedValue(systemMechanisms);

      const infoSpy = jest.spyOn(systemMechanismService['logger'], 'info');
      const debugSpy = jest.spyOn(systemMechanismService['logger'], 'debug');

      const result = await systemMechanismService.getManySystemMechanisms(
        { isDeleted: false },
        traceId,
      );

      expect(result).toEqual(systemMechanisms);
      expect(systemMechanismRepository.find).toHaveBeenCalledWith({
        where: { isDeleted: false },
      });
      expect(infoSpy).toHaveBeenCalledWith(
        `Non-deleted system mechanisms found in database`,
        traceId,
        'getManySystemMechanisms',
        LogStreamLevel.ProdStandard,
      );
      expect(debugSpy).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no non-deleted system mechanisms found', async () => {
      const traceId = mockTraceId;

      systemMechanismRepository.find.mockResolvedValue([]);

      await expect(
        systemMechanismService.getManySystemMechanisms(
          { isDeleted: false },
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should handle errors and log them', async () => {
      const traceId = mockTraceId;
      const error = new Error('Database error');
      systemMechanismRepository.find.mockRejectedValue(error);

      const errorSpy = jest.spyOn(systemMechanismService['logger'], 'error');

      await expect(
        systemMechanismService.getManySystemMechanisms(
          { isDeleted: false },
          traceId,
        ),
      ).rejects.toThrow(Error);

      expect(errorSpy).toHaveBeenCalledWith(
        `Error while fetching non-deleted system mechanisms: ${error.message}`,
        traceId,
        'getManySystemMechanisms',
        LogStreamLevel.ProdStandard,
      );
    });
  });
});
