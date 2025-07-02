import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUnitService } from './business-unit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessUnit } from '../../../entities/business-unit.entity';
import { ZtrackingBusinessUnitService } from './ztracking-business-unit.service';
import { LogStreamLevel } from 'ez-logger';
import {
  CreateBusinessUnitDto,
  MockType,
  repositoryMockFactory,
  UpdateBusinessUnitDto,
} from 'ez-utils';
import {
  mockCreateBusinessUnitDtoCase001,
  mockSavedBusinessUnitCase001,
  mockSavedBusinessUnitCase002,
  mockTraceId,
  mockUpdateBusinessUnitDtoCase002,
} from '../test-values.spec';
import { NotFoundException } from '@nestjs/common';

describe('BusinessUnitService', () => {
  let businessUnitService: BusinessUnitService;
  let ztrackingBusinessUnitService: ZtrackingBusinessUnitService;
  let businessUnitRepository: MockType<Repository<BusinessUnit>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessUnitService,
        {
          provide: getRepositoryToken(BusinessUnit),
          useFactory: repositoryMockFactory,
        },
        {
          provide: ZtrackingBusinessUnitService,
          useValue: {
            createZtrackingBusinessUnitEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    businessUnitService = module.get<BusinessUnitService>(BusinessUnitService);
    businessUnitRepository = module.get(getRepositoryToken(BusinessUnit));
    ztrackingBusinessUnitService = module.get<ZtrackingBusinessUnitService>(
      ZtrackingBusinessUnitService,
    );
  });

  describe('createBusinessUnit', () => {
    it('should successfully create a business unit with valid data', async () => {
      const createBusinessUnitDto: CreateBusinessUnitDto =
        mockCreateBusinessUnitDtoCase001;
      const traceId = mockTraceId;
      const savedBusinessUnit = mockSavedBusinessUnitCase001;

      jest
        .spyOn(businessUnitRepository, 'save')
        .mockResolvedValue(savedBusinessUnit as any);
      jest
        .spyOn(businessUnitRepository, 'create')
        .mockReturnValue(savedBusinessUnit as any);
      jest
        .spyOn(
          ztrackingBusinessUnitService,
          'createZtrackingBusinessUnitEntity',
        )
        .mockResolvedValue(true);

      const result = await businessUnitService.createBusinessUnit(
        createBusinessUnitDto,
        traceId,
      );

      expect(businessUnitRepository.save).toHaveBeenCalledWith(
        savedBusinessUnit,
      );
      expect(businessUnitRepository.create).toHaveBeenCalledWith(
        createBusinessUnitDto,
      );
      expect(
        ztrackingBusinessUnitService.createZtrackingBusinessUnitEntity,
      ).toHaveBeenCalledWith(savedBusinessUnit, traceId);
      expect(result).toEqual(savedBusinessUnit);
    });

    it('should log the creation process with the correct traceId and log level', async () => {
      const createBusinessUnitDto: CreateBusinessUnitDto =
        mockCreateBusinessUnitDtoCase001;
      const traceId = mockTraceId;
      const savedBusinessUnit = mockSavedBusinessUnitCase001;

      jest
        .spyOn(businessUnitRepository, 'save')
        .mockResolvedValue(savedBusinessUnit as any);
      jest
        .spyOn(businessUnitRepository, 'create')
        .mockReturnValue(savedBusinessUnit as any);
      jest
        .spyOn(
          ztrackingBusinessUnitService,
          'createZtrackingBusinessUnitEntity',
        )
        .mockResolvedValue(true);

      const logSpy = jest.spyOn(businessUnitService['logger'], 'log');
      const infoSpy = jest.spyOn(businessUnitService['logger'], 'info');

      await businessUnitService.createBusinessUnit(
        createBusinessUnitDto,
        traceId,
      );

      expect(logSpy).toHaveBeenCalledWith(
        `createBusinessUnitDto : ${JSON.stringify(createBusinessUnitDto)}`,
        traceId,
        'createBusinessUnit',
        LogStreamLevel.ProdStandard,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `business unit entity saved in database`,
        traceId,
        'createBusinessUnit',
        LogStreamLevel.ProdStandard,
      );
    });

    it('should handle the scenario where createBusinessUnitDto is missing required fields', async () => {
      const createBusinessUnitDto: CreateBusinessUnitDto =
        mockCreateBusinessUnitDtoCase001;
      const traceId = mockTraceId;

      jest
        .spyOn(businessUnitRepository, 'save')
        .mockRejectedValue(new Error('Missing required fields'));

      await expect(
        businessUnitService.createBusinessUnit(createBusinessUnitDto, traceId),
      ).rejects.toThrow('Missing required fields');
    });

    it('should manage the case where the business unit repository save operation fails', async () => {
      const createBusinessUnitDto: CreateBusinessUnitDto =
        mockCreateBusinessUnitDtoCase001;
      const traceId = mockTraceId;

      jest
        .spyOn(businessUnitRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        businessUnitService.createBusinessUnit(createBusinessUnitDto, traceId),
      ).rejects.toThrow('Database error');
    });

    it('should deal with the situation where ztrackingBusinessUnitService fails to create a Ztracking entity', async () => {
      const createBusinessUnitDto: CreateBusinessUnitDto =
        mockCreateBusinessUnitDtoCase001;
      const traceId = mockTraceId;
      const savedBusinessUnit = mockSavedBusinessUnitCase001;

      jest
        .spyOn(businessUnitRepository, 'save')
        .mockResolvedValue(savedBusinessUnit as any);
      jest
        .spyOn(businessUnitRepository, 'create')
        .mockReturnValue(savedBusinessUnit as any);
      jest
        .spyOn(
          ztrackingBusinessUnitService,
          'createZtrackingBusinessUnitEntity',
        )
        .mockResolvedValue(false);

      await expect(
        businessUnitService.createBusinessUnit(createBusinessUnitDto, traceId),
      ).resolves.toBeUndefined();
    });

    it('should handle the case where traceId is null or undefined', async () => {
      const createBusinessUnitDto: CreateBusinessUnitDto =
        mockCreateBusinessUnitDtoCase001;
      const traceId = null;
      const savedBusinessUnit = mockSavedBusinessUnitCase001;

      jest
        .spyOn(businessUnitRepository, 'save')
        .mockResolvedValue(savedBusinessUnit as any);
      jest
        .spyOn(businessUnitRepository, 'create')
        .mockReturnValue(savedBusinessUnit as any);
      jest
        .spyOn(
          ztrackingBusinessUnitService,
          'createZtrackingBusinessUnitEntity',
        )
        .mockResolvedValue(true);

      const result = await businessUnitService.createBusinessUnit(
        createBusinessUnitDto,
        traceId,
      );

      expect(result).toEqual(savedBusinessUnit);
    });
  });

  describe('updateBusinessUnit', () => {
    it('should successfully update a business unit with valid data', async () => {
      const updateBusinessUnitDto: UpdateBusinessUnitDto =
        mockUpdateBusinessUnitDtoCase002;
      const traceId = mockTraceId;
      const existingBusinessUnit = mockSavedBusinessUnitCase001;
      const updatedBusinessUnit = mockSavedBusinessUnitCase002;

      jest
        .spyOn(businessUnitRepository, 'findOne')
        .mockResolvedValue(existingBusinessUnit as any);
      jest
        .spyOn(businessUnitRepository, 'save')
        .mockResolvedValue(updatedBusinessUnit as any);
      jest
        .spyOn(
          ztrackingBusinessUnitService,
          'createZtrackingBusinessUnitEntity',
        )
        .mockResolvedValue(true);

      const result = await businessUnitService.updateBusinessUnit(
        updateBusinessUnitDto,
        traceId,
      );

      expect(businessUnitRepository.findOne).toHaveBeenCalledWith({
        where: { businessUnitId: updateBusinessUnitDto.businessUnitId },
      });
      expect(businessUnitRepository.save).toHaveBeenCalledWith(
        updateBusinessUnitDto,
      );
      expect(
        ztrackingBusinessUnitService.createZtrackingBusinessUnitEntity,
      ).toHaveBeenCalledWith(updatedBusinessUnit, traceId);
      expect(result).toEqual(updatedBusinessUnit);
    });

    it('should throw NotFoundException if business unit is not found', async () => {
      const updateBusinessUnitDto: UpdateBusinessUnitDto =
        mockUpdateBusinessUnitDtoCase002;
      const traceId = mockTraceId;

      jest.spyOn(businessUnitRepository, 'findOne').mockResolvedValue(null);

      await expect(
        businessUnitService.updateBusinessUnit(updateBusinessUnitDto, traceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should log the update process with the correct traceId and log level', async () => {
      const updateBusinessUnitDto: UpdateBusinessUnitDto =
        mockUpdateBusinessUnitDtoCase002;
      const traceId = mockTraceId;
      const existingBusinessUnit = mockSavedBusinessUnitCase001;
      const updatedBusinessUnit = mockSavedBusinessUnitCase002;

      jest
        .spyOn(businessUnitRepository, 'findOne')
        .mockResolvedValue(existingBusinessUnit as any);
      jest
        .spyOn(businessUnitRepository, 'save')
        .mockResolvedValue(updatedBusinessUnit as any);
      jest
        .spyOn(
          ztrackingBusinessUnitService,
          'createZtrackingBusinessUnitEntity',
        )
        .mockResolvedValue(true);

      const infoSpy = jest.spyOn(businessUnitService['logger'], 'info');

      await businessUnitService.updateBusinessUnit(
        updateBusinessUnitDto,
        traceId,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `business unit entity updated in database`,
        traceId,
        'createBusinessUnit',
        LogStreamLevel.ProdStandard,
      );
    });

    it('should handle the scenario where updateBusinessUnitDto is missing required fields', async () => {
      const updateBusinessUnitDto: UpdateBusinessUnitDto =
        mockUpdateBusinessUnitDtoCase002;
      const traceId = mockTraceId;

      jest
        .spyOn(businessUnitRepository, 'save')
        .mockRejectedValue(new Error('Missing required fields'));

      await expect(
        businessUnitService.updateBusinessUnit(updateBusinessUnitDto, traceId),
      ).rejects.toThrow('Missing required fields');
    });

    it('should manage the case where the business unit repository save operation fails', async () => {
      const updateBusinessUnitDto: UpdateBusinessUnitDto =
        mockUpdateBusinessUnitDtoCase002;
      const traceId = mockTraceId;
      const existingBusinessUnit = mockSavedBusinessUnitCase001;

      jest
        .spyOn(businessUnitRepository, 'findOne')
        .mockResolvedValue(existingBusinessUnit as any);
      jest
        .spyOn(businessUnitRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        businessUnitService.updateBusinessUnit(updateBusinessUnitDto, traceId),
      ).rejects.toThrow('Database error');
    });

    it('should deal with the situation where ztrackingBusinessUnitService fails to create a Ztracking entity', async () => {
      const updateBusinessUnitDto: UpdateBusinessUnitDto =
        mockUpdateBusinessUnitDtoCase002;
      const traceId = mockTraceId;
      const existingBusinessUnit = mockSavedBusinessUnitCase001;
      const updatedBusinessUnit = mockSavedBusinessUnitCase002;

      jest
        .spyOn(businessUnitRepository, 'findOne')
        .mockResolvedValue(existingBusinessUnit as any);
      jest
        .spyOn(businessUnitRepository, 'save')
        .mockResolvedValue(updatedBusinessUnit as any);
      jest
        .spyOn(
          ztrackingBusinessUnitService,
          'createZtrackingBusinessUnitEntity',
        )
        .mockResolvedValue(false);

      await expect(
        businessUnitService.updateBusinessUnit(updateBusinessUnitDto, traceId),
      ).resolves.toBeUndefined();
    });

    it('should handle the case where traceId is null or undefined', async () => {
      const updateBusinessUnitDto: UpdateBusinessUnitDto =
        mockUpdateBusinessUnitDtoCase002;
      const traceId = mockTraceId;
      const existingBusinessUnit = mockSavedBusinessUnitCase001;
      const updatedBusinessUnit = mockSavedBusinessUnitCase002;

      jest
        .spyOn(businessUnitRepository, 'findOne')
        .mockResolvedValue(existingBusinessUnit as any);
      jest
        .spyOn(businessUnitRepository, 'save')
        .mockResolvedValue(updatedBusinessUnit as any);
      jest
        .spyOn(
          ztrackingBusinessUnitService,
          'createZtrackingBusinessUnitEntity',
        )
        .mockResolvedValue(true);

      const result = await businessUnitService.updateBusinessUnit(
        updateBusinessUnitDto,
        traceId,
      );

      expect(result).toEqual(updatedBusinessUnit);
    });
  });

  describe('findBusinessUnit', () => {
    it('should find a business unit by businessUnitId', async () => {
      const traceId = mockTraceId;
      const businessUnitId = mockSavedBusinessUnitCase001.businessUnitId;
      const name = mockSavedBusinessUnitCase001.name;
      const isDeleted = false;
      const mockBusinessUnit = mockSavedBusinessUnitCase001;

      businessUnitRepository.findOne.mockResolvedValue(mockBusinessUnit);

      const infoSpy = jest.spyOn(businessUnitService['logger'], 'info');
      const debugSpy = jest.spyOn(businessUnitService['logger'], 'debug');

      const result = await businessUnitService.findBusinessUnit(
        {
          businessUnitId,
          name,
          isDeleted,
        },
        traceId,
      );

      expect(result).toEqual(mockBusinessUnit);
      expect(businessUnitRepository.findOne).toHaveBeenCalledWith({
        where: {
          businessUnitId,
          isDeleted,
          name,
        },
      });
      expect(infoSpy).toHaveBeenCalled();
      expect(debugSpy).toHaveBeenCalled();
    });

    it('should find a business unit by name', async () => {
      const traceId = mockTraceId;
      const name = mockSavedBusinessUnitCase001.name;
      const isDeleted = false;
      const mockBusinessUnit = mockSavedBusinessUnitCase001;
      const businessUnitId = mockSavedBusinessUnitCase001.businessUnitId;

      businessUnitRepository.findOne.mockResolvedValue(mockBusinessUnit);
      const infoSpy = jest.spyOn(businessUnitService['logger'], 'info');
      const debugSpy = jest.spyOn(businessUnitService['logger'], 'debug');

      const result = await businessUnitService.findBusinessUnit(
        {
          businessUnitId,
          name,
          isDeleted,
        },
        traceId,
      );

      expect(result).toEqual(mockBusinessUnit);
      expect(businessUnitRepository.findOne).toHaveBeenCalledWith({
        where: {
          businessUnitId,
          name,
          isDeleted,
        },
      });
      expect(infoSpy).toHaveBeenCalled();
      expect(debugSpy).toHaveBeenCalled();
    });
  });
});
