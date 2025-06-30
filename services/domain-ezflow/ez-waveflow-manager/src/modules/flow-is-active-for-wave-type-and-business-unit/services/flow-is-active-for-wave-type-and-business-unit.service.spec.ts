import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
  mockDeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
  mockFlowIsActiveForWaveTypeAndBusinessUnitCase001,
  mockGetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
  mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit as mockTraceId,
  mockUpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
} from '../test-values.spec';
import { FlowIsActiveForWaveTypeAndBusinessUnitService } from './flow-is-active-for-wave-type-and-business-unit.service';
import { FlowIsActiveForWaveTypeAndBusinessUnit } from '../../../entities/flow-is-active-for-wave-type-and-business-unit.entity';
import { ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService } from './ztracking-flow-is-active-for-wave-type-and-business-unit.service';

describe('FlowIsActiveForWaveTypeAndBusinessUnitService', () => {
  let service: FlowIsActiveForWaveTypeAndBusinessUnitService;
  let repository: Repository<FlowIsActiveForWaveTypeAndBusinessUnit>;
  let ztrackingService: ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowIsActiveForWaveTypeAndBusinessUnitService,
        {
          provide: getRepositoryToken(FlowIsActiveForWaveTypeAndBusinessUnit),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService,
          useValue: {
            createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit: jest
              .fn()
              .mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<FlowIsActiveForWaveTypeAndBusinessUnitService>(
      FlowIsActiveForWaveTypeAndBusinessUnitService,
    );
    repository = module.get<Repository<FlowIsActiveForWaveTypeAndBusinessUnit>>(
      getRepositoryToken(FlowIsActiveForWaveTypeAndBusinessUnit),
    );
    ztrackingService =
      module.get<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService>(
        ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService,
      );
  });

  describe('createFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should create and return a new flow and call the ztracking service', async () => {
      // Mock the repository save call to return the created entity
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockFlowIsActiveForWaveTypeAndBusinessUnitCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit',
        )
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.createFlowIsActiveForWaveTypeAndBusinessUnit(
        mockCreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceId,
      );

      // Assertions
      expect(result).toEqual(mockFlowIsActiveForWaveTypeAndBusinessUnitCase001);

      // Ensure repository save is called with the correct data
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(
          mockCreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
        ),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should update and return the updated flow and call the ztracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockFlowIsActiveForWaveTypeAndBusinessUnitCase001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockFlowIsActiveForWaveTypeAndBusinessUnitCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.updateFlowIsActiveForWaveTypeAndBusinessUnit(
        mockUpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockFlowIsActiveForWaveTypeAndBusinessUnitCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(
          mockUpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
        ),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the flow is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateFlowIsActiveForWaveTypeAndBusinessUnit(
          mockUpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should mark the flow as deleted and call the zTracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockFlowIsActiveForWaveTypeAndBusinessUnitCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockFlowIsActiveForWaveTypeAndBusinessUnitCase001,
        isDeleted: true,
      } as FlowIsActiveForWaveTypeAndBusinessUnit);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.deleteFlowIsActiveForWaveTypeAndBusinessUnit(
        mockDeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceId,
      );

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteFlowIsActiveForWaveTypeAndBusinessUnit(
          {
            businessUnitId: '',
            waveTypeId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the flow is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteFlowIsActiveForWaveTypeAndBusinessUnit(
          mockDeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should return a flow', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockFlowIsActiveForWaveTypeAndBusinessUnitCase001);

      const result = await service.getOneFlowIsActiveForWaveTypeAndBusinessUnit(
        mockGetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockFlowIsActiveForWaveTypeAndBusinessUnitCase001);
    });

    it('should throw NotFoundException if the flow is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneFlowIsActiveForWaveTypeAndBusinessUnit(
          mockGetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneFlowIsActiveForWaveTypeAndBusinessUnit(
          {
            businessUnitId: '',
            waveTypeId: '',
            isDeleted: true,
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
