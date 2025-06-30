import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateFlowDto,
  mockDeleteFlowDto,
  mockFlowCase001,
  mockGetOneFlowDto,
  mockTraceIdForFlow as mockTraceId,
  mockUpdateFlowDto,
} from '../test-values.spec';
import { FlowService } from './flow.service';
import { Flow } from '../../../entities/flow.entity';
import { ZtrackingFlowService } from './ztracking-flow.service';

describe('FlowService', () => {
  let service: FlowService;
  let repository: Repository<Flow>;
  let ztrackingService: ZtrackingFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowService,
        {
          provide: getRepositoryToken(Flow),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingFlowService,
          useValue: {
            createZtrackingForFlow: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<FlowService>(FlowService);
    repository = module.get<Repository<Flow>>(getRepositoryToken(Flow));
    ztrackingService = module.get<ZtrackingFlowService>(ZtrackingFlowService);
  });

  describe('createFlow', () => {
    it('should create and return a new flow and call the ztracking service', async () => {
      // Mock the repository save call to return the created entity
      jest.spyOn(repository, 'save').mockResolvedValue(mockFlowCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFlow')
        .mockResolvedValue(true);

      // Call the service method
      const result = await service.createFlow(mockCreateFlowDto, mockTraceId);

      // Assertions
      expect(result).toEqual(mockFlowCase001);

      // Ensure repository save is called with the correct data
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockCreateFlowDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateFlow', () => {
    it('should update and return the updated flow and call the ztracking service', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockFlowCase001);
      jest.spyOn(repository, 'save').mockResolvedValue(mockFlowCase001);

      // Mock the Ztracking service to return true when called
      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFlow')
        .mockResolvedValue(true);

      const result = await service.updateFlow(mockUpdateFlowDto, mockTraceId);

      expect(result).toEqual(mockFlowCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockUpdateFlowDto),
      );

      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the flow is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateFlow(mockUpdateFlowDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFlow', () => {
    it('should mark the flow as deleted and call the zTracking service', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockFlowCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockFlowCase001,
        isDeleted: true,
      } as Flow);

      const ztrackingSpy = jest
        .spyOn(ztrackingService, 'createZtrackingForFlow')
        .mockResolvedValue(true);

      const result = await service.deleteFlow(mockDeleteFlowDto, mockTraceId);

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      // Ensure Ztracking service is called with the correct parameters
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteFlow(
          {
            flowId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the flow is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteFlow(mockDeleteFlowDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneFlow', () => {
    it('should return a flow', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockFlowCase001);

      const result = await service.getOneFlow(mockGetOneFlowDto, mockTraceId);

      expect(result).toEqual(mockFlowCase001);
    });

    it('should throw NotFoundException if the flow is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneFlow(mockGetOneFlowDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneFlow(
          { flowId: '', name: '', isDeleted: true },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
