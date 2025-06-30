import { Test, TestingModule } from '@nestjs/testing';
import { MechanismPermitService } from './mechanism-permit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MechanismPermit } from '../../../entities/mechanism-permit.entity';
import { LogStreamLevel } from 'ez-logger';
import { MockType, repositoryMockFactory } from 'ez-utils';
import { NotFoundException } from '@nestjs/common';

describe('MechanismPermitService', () => {
  let mechanismPermitService: MechanismPermitService;
  let mechanismPermitRepository: MockType<Repository<MechanismPermit>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MechanismPermitService,
        {
          provide: getRepositoryToken(MechanismPermit),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    mechanismPermitService = module.get<MechanismPermitService>(
      MechanismPermitService,
    );
    mechanismPermitRepository = module.get(getRepositoryToken(MechanismPermit));
  });

  describe('findMechanismPermit', () => {
    it('should find a mechanism permit by id or name', async () => {
      const permitId = 'some-uuid';
      const name = 'Permit A';
      const isDeleted = false;
      const traceId = 'trace-123';
      const mockPermit = { permitId, name, isDeleted };

      mechanismPermitRepository.findOne.mockResolvedValue(mockPermit);

      const debugSpy = jest.spyOn(mechanismPermitService['logger'], 'debug');
      const infoSpy = jest.spyOn(mechanismPermitService['logger'], 'info');

      const result = await mechanismPermitService.getMechanismPermitEntity(
        traceId,
        {
          permitId,
          name,
          isDeleted,
        },
      );

      expect(result).toEqual(mockPermit);
      expect(mechanismPermitRepository.findOne).toHaveBeenCalledWith({
        where: [permitId, name, isDeleted],
      });
      expect(debugSpy).toHaveBeenCalled();
      expect(infoSpy).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no permit is found', async () => {
      const permitId = 'some-uuid';
      const name = 'Permit A';
      const isDeleted = false;
      const traceId = 'trace-123';

      mechanismPermitRepository.findOne.mockResolvedValue(null);

      await expect(
        mechanismPermitService.getMechanismPermitEntity(traceId, {
          permitId,
          name,
          isDeleted,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should log the search conditions', async () => {
      const permitId = 'some-uuid';
      const name = 'Permit A';
      const isDeleted = false;
      const traceId = 'trace-123';

      mechanismPermitRepository.findOne.mockResolvedValue({
        permitId,
        name,
        isDeleted,
      });

      const debugSpy = jest.spyOn(mechanismPermitService['logger'], 'debug');

      await mechanismPermitService.getMechanismPermitEntity(traceId, {
        permitId,
        name,
        isDeleted,
      });

      expect(debugSpy).toHaveBeenCalledWith(
        `Conditions Filters for search : ${JSON.stringify([permitId, name, isDeleted])}`,
        traceId,
        'findMechanismPermit',
        LogStreamLevel.ProdStandard,
      );
    });

    it('should throw NotFoundException if no search parameters are provided', async () => {
      const traceId = 'trace-123';

      await expect(
        mechanismPermitService.getMechanismPermitEntity(traceId, {
          isDeleted: false,
        }),
      ).rejects.toThrow(
        'At least one parameter (permitId or name) must be provided',
      );
    });
  });

  describe('findHistoricalData', () => {
    it('should find historical data with valid filters', async () => {
      const filter = { permitId: 'some-uuid', isDeleted: false };
      const traceId = 'trace-456';
      const mockHistoricalData = [{ permitId: 'some-uuid', isDeleted: false }];

      mechanismPermitRepository.find.mockResolvedValue(mockHistoricalData);

      const debugSpy = jest.spyOn(mechanismPermitService['logger'], 'debug');
      const infoSpy = jest.spyOn(mechanismPermitService['logger'], 'info');

      const result = await mechanismPermitService.findHistoricalData(
        filter,
        traceId,
      );

      expect(result).toEqual(mockHistoricalData);
      expect(mechanismPermitRepository.find).toHaveBeenCalledWith({
        where: filter,
      });
      expect(debugSpy).toHaveBeenCalled();
      expect(infoSpy).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no historical data is found', async () => {
      const filter = { permitId: 'some-uuid', isDeleted: false };
      const traceId = 'trace-456';

      mechanismPermitRepository.find.mockResolvedValue([]);

      await expect(
        mechanismPermitService.findHistoricalData(filter, traceId),
      ).rejects.toThrow('No historical data found with the provided criteria');
    });

    it('should log the search conditions for historical data', async () => {
      const filter = { permitId: 'some-uuid', isDeleted: false };
      const traceId = 'trace-456';

      mechanismPermitRepository.find.mockResolvedValue([
        { permitId: 'some-uuid', isDeleted: false },
      ]);

      const debugSpy = jest.spyOn(mechanismPermitService['logger'], 'debug');

      await mechanismPermitService.findHistoricalData(filter, traceId);

      expect(debugSpy).toHaveBeenCalledWith(
        `Conditions Filters for historical search : ${JSON.stringify(filter)}`,
        traceId,
        'findHistoricalData',
        LogStreamLevel.DebugLight,
      );
    });
  });

  describe('getMechanismPermitsForSystemMechanism', () => {
    it('should fetch mechanism permits for a given systemMechanismId', async () => {
      const systemMechanismId = 'system-uuid';
      const traceId = 'trace-789';
      const mockPermits = [{ permitId: 'permit-001' }];

      mechanismPermitRepository.find.mockResolvedValue(mockPermits);

      const debugSpy = jest.spyOn(mechanismPermitService['logger'], 'debug');
      const infoSpy = jest.spyOn(mechanismPermitService['logger'], 'info');

      const result =
        await mechanismPermitService.getMechanismPermitsForSystemMechanism(
          systemMechanismId,
          traceId,
        );

      expect(result).toEqual(mockPermits);
      expect(mechanismPermitRepository.find).toHaveBeenCalledWith({
        where: { systemMechanismId },
      });
      expect(debugSpy).toHaveBeenCalled();
      expect(infoSpy).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no permits are found for given systemMechanismId', async () => {
      const systemMechanismId = 'system-uuid';
      const traceId = 'trace-789';

      mechanismPermitRepository.find.mockResolvedValue([]);

      await expect(
        mechanismPermitService.getMechanismPermitsForSystemMechanism(
          systemMechanismId,
          traceId,
        ),
      ).rejects.toThrow(
        `No mechanism permits found for systemMechanismId: ${systemMechanismId}`,
      );
    });

    it('should handle the case where systemMechanismId is null', async () => {
      const systemMechanismId = null;
      const traceId = 'trace-789';
      const mockPermits = [{ permitId: 'permit-001' }];

      mechanismPermitRepository.find.mockResolvedValue(mockPermits);

      const debugSpy = jest.spyOn(mechanismPermitService['logger'], 'debug');
      const infoSpy = jest.spyOn(mechanismPermitService['logger'], 'info');

      const result =
        await mechanismPermitService.getMechanismPermitsForSystemMechanism(
          systemMechanismId,
          traceId,
        );

      expect(result).toEqual(mockPermits);
      expect(mechanismPermitRepository.find).toHaveBeenCalledWith({
        where: {},
      });
      expect(debugSpy).toHaveBeenCalled();
      expect(infoSpy).toHaveBeenCalled();
    });
  });
});
