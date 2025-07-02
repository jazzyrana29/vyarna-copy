import { Test, TestingModule } from '@nestjs/testing';
import { DeviceSessionService } from './device-session.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceSession } from '../../../entities/device-session.entity';
import { ZtrackingDeviceSessionService } from './ztracking-device-session.service';
import { LogStreamLevel } from 'ez-logger';
import { MockType, repositoryMockFactory } from 'ez-utils';
import { NotFoundException } from '@nestjs/common';
import {
  UpdateDeviceSessionDto,
  StartDeviceSessionDto,
  CloseDeviceSessionDto,
  GetDeviceSessionHistoryDto,
} from 'ez-utils';

// Mock values (you need to define these based on your specific requirements)
import {
  mockCloseDeviceSessionDtoCase001,
  mockCreateDeviceSessionDtoCase001,
  mockGetDeviceSessionHistoryDtoCase001,
  mockSavedDeviceSessionCase001,
  mockSavedDeviceSessionCase002,
  mockStartDeviceSessionDtoCase001,
  mockTraceId,
  mockUpdateDeviceSessionDtoCase002,
} from '../test-values.spec';

describe('DeviceSessionService', () => {
  let deviceSessionService: DeviceSessionService;
  let ztrackingDeviceSessionService: ZtrackingDeviceSessionService;
  let deviceSessionRepository: MockType<Repository<DeviceSession>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceSessionService,
        {
          provide: getRepositoryToken(DeviceSession),
          useFactory: repositoryMockFactory,
        },
        {
          provide: ZtrackingDeviceSessionService,
          useValue: {
            createZtrackingDeviceSessionEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    deviceSessionService =
      module.get<DeviceSessionService>(DeviceSessionService);
    deviceSessionRepository = module.get(getRepositoryToken(DeviceSession));
    ztrackingDeviceSessionService = module.get<ZtrackingDeviceSessionService>(
      ZtrackingDeviceSessionService,
    );
  });

  describe('createDeviceSession', () => {
    it('should successfully create a device session with valid data', async () => {
      const createDeviceSessionDto = mockCreateDeviceSessionDtoCase001;
      const traceId = mockTraceId;
      const savedDeviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(savedDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'create')
        .mockReturnValue(savedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await deviceSessionService.createDeviceSession(
        createDeviceSessionDto,
        traceId,
      );

      expect(deviceSessionRepository.save).toHaveBeenCalledWith(
        savedDeviceSession,
      );
      expect(deviceSessionRepository.create).toHaveBeenCalledWith(
        createDeviceSessionDto,
      );
      expect(
        ztrackingDeviceSessionService.createZtrackingDeviceSessionEntity,
      ).toHaveBeenCalledWith(savedDeviceSession, traceId);
      expect(result).toEqual(savedDeviceSession);
    });

    it('should log the creation process with the correct traceId and log level', async () => {
      const createDeviceSessionDto = mockCreateDeviceSessionDtoCase001;
      const traceId = mockTraceId;
      const savedDeviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(savedDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'create')
        .mockReturnValue(savedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const logSpy = jest.spyOn(deviceSessionService['logger'], 'log');
      const infoSpy = jest.spyOn(deviceSessionService['logger'], 'info');

      await deviceSessionService.createDeviceSession(
        createDeviceSessionDto,
        traceId,
      );

      expect(logSpy).toHaveBeenCalledWith(
        `createDeviceSessionDto : ${JSON.stringify(createDeviceSessionDto)}`,
        traceId,
        'createDeviceSession',
        LogStreamLevel.ProdStandard,
      );
      expect(infoSpy).toHaveBeenCalledWith(
        `device session entity saved in database`,
        traceId,
        'createDeviceSession',
        LogStreamLevel.ProdStandard,
      );
    });

    it('should handle the scenario where createDeviceSessionDto is missing required fields', async () => {
      const createDeviceSessionDto = mockCreateDeviceSessionDtoCase001;
      const traceId = mockTraceId;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockRejectedValue(new Error('Missing required fields'));

      await expect(
        deviceSessionService.createDeviceSession(
          createDeviceSessionDto,
          traceId,
        ),
      ).rejects.toThrow('Missing required fields');
    });

    it('should manage the case where device session repository save operation fails', async () => {
      const createDeviceSessionDto = mockCreateDeviceSessionDtoCase001;
      const traceId = mockTraceId;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        deviceSessionService.createDeviceSession(
          createDeviceSessionDto,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should deal with the situation where ztrackingDeviceSessionService fails to create a ztracking entity', async () => {
      const createDeviceSessionDto = mockCreateDeviceSessionDtoCase001;
      const traceId = mockTraceId;
      const savedDeviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(savedDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'create')
        .mockReturnValue(savedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(false);

      await expect(
        deviceSessionService.createDeviceSession(
          createDeviceSessionDto,
          traceId,
        ),
      ).resolves.toBeUndefined();
    });

    it('should handle the case where traceId is null or undefined', async () => {
      const createDeviceSessionDto = mockCreateDeviceSessionDtoCase001;
      const traceId = null;
      const savedDeviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(savedDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'create')
        .mockReturnValue(savedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await deviceSessionService.createDeviceSession(
        createDeviceSessionDto,
        traceId,
      );

      expect(result).toEqual(savedDeviceSession);
    });
  });

  describe('updateDeviceSession', () => {
    it('should successfully update a device session with valid data', async () => {
      const updateDeviceSessionDto: UpdateDeviceSessionDto =
        mockUpdateDeviceSessionDtoCase002;
      const traceId = mockTraceId;
      const existingDeviceSession = mockSavedDeviceSessionCase001;
      const updatedDeviceSession = mockSavedDeviceSessionCase002;

      jest
        .spyOn(deviceSessionRepository, 'findOne')
        .mockResolvedValue(existingDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(updatedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await deviceSessionService.updateDeviceSession(
        updateDeviceSessionDto,
        traceId,
      );

      expect(deviceSessionRepository.findOne).toHaveBeenCalledWith({
        where: { deviceSessionId: updateDeviceSessionDto.deviceSessionId },
      });
      expect(deviceSessionRepository.save).toHaveBeenCalledWith(
        updateDeviceSessionDto,
      );
      expect(
        ztrackingDeviceSessionService.createZtrackingDeviceSessionEntity,
      ).toHaveBeenCalledWith(updatedDeviceSession, traceId);
      expect(result).toEqual(updatedDeviceSession);
    });

    it('should throw NotFoundException if device session is not found', async () => {
      const updateDeviceSessionDto: UpdateDeviceSessionDto =
        mockUpdateDeviceSessionDtoCase002;
      const traceId = mockTraceId;

      jest.spyOn(deviceSessionRepository, 'findOne').mockResolvedValue(null);

      await expect(
        deviceSessionService.updateDeviceSession(
          updateDeviceSessionDto,
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should log the update process with the correct traceId and log level', async () => {
      const updateDeviceSessionDto: UpdateDeviceSessionDto =
        mockUpdateDeviceSessionDtoCase002;
      const traceId = mockTraceId;
      const existingDeviceSession = mockSavedDeviceSessionCase001;
      const updatedDeviceSession = mockSavedDeviceSessionCase002;

      jest
        .spyOn(deviceSessionRepository, 'findOne')
        .mockResolvedValue(existingDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(updatedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const infoSpy = jest.spyOn(deviceSessionService['logger'], 'info');

      await deviceSessionService.updateDeviceSession(
        updateDeviceSessionDto,
        traceId,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `device session entity updated in database`,
        traceId,
        'updateDeviceSession',
        LogStreamLevel.ProdStandard,
      );
    });

    it('should handle the scenario where updateDeviceSessionDto is missing required fields', async () => {
      const updateDeviceSessionDto: UpdateDeviceSessionDto =
        mockUpdateDeviceSessionDtoCase002;
      const traceId = mockTraceId;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockRejectedValue(new Error('Missing required fields'));

      await expect(
        deviceSessionService.updateDeviceSession(
          updateDeviceSessionDto,
          traceId,
        ),
      ).rejects.toThrow('Missing required fields');
    });

    it('should manage the case where device session repository save operation fails', async () => {
      const updateDeviceSessionDto: UpdateDeviceSessionDto =
        mockUpdateDeviceSessionDtoCase002;
      const traceId = mockTraceId;
      const existingDeviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(deviceSessionRepository, 'findOne')
        .mockResolvedValue(existingDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        deviceSessionService.updateDeviceSession(
          updateDeviceSessionDto,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should deal with the situation where ztrackingDeviceSessionService fails to create a ztracking entity', async () => {
      const updateDeviceSessionDto: UpdateDeviceSessionDto =
        mockUpdateDeviceSessionDtoCase002;
      const traceId = mockTraceId;
      const existingDeviceSession = mockSavedDeviceSessionCase001;
      const updatedDeviceSession = mockSavedDeviceSessionCase002;

      jest
        .spyOn(deviceSessionRepository, 'findOne')
        .mockResolvedValue(existingDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(updatedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(false);

      await expect(
        deviceSessionService.updateDeviceSession(
          updateDeviceSessionDto,
          traceId,
        ),
      ).resolves.toBeUndefined();
    });

    it('should handle the case where traceId is null or undefined', async () => {
      const updateDeviceSessionDto: UpdateDeviceSessionDto =
        mockUpdateDeviceSessionDtoCase002;
      const traceId = mockTraceId;
      const existingDeviceSession = mockSavedDeviceSessionCase001;
      const updatedDeviceSession = mockSavedDeviceSessionCase002;

      jest
        .spyOn(deviceSessionRepository, 'findOne')
        .mockResolvedValue(existingDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(updatedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await deviceSessionService.updateDeviceSession(
        updateDeviceSessionDto,
        traceId,
      );

      expect(result).toEqual(updatedDeviceSession);
    });
  });

  describe('findDeviceSession', () => {
    it('should find a device session by deviceSessionId', async () => {
      const traceId = mockTraceId;
      const mockDeviceSession = mockSavedDeviceSessionCase001;
      const { name, isDeleted, deviceSessionId } = mockDeviceSession;

      deviceSessionRepository.findOne.mockResolvedValue(mockDeviceSession);

      const infoSpy = jest.spyOn(deviceSessionService['logger'], 'info');
      const debugSpy = jest.spyOn(deviceSessionService['logger'], 'debug');

      const result = await deviceSessionService.findDeviceSession(
        {
          deviceSessionId,
          isDeleted,
          name,
        },
        traceId,
      );

      expect(result).toEqual(mockDeviceSession);
      expect(deviceSessionRepository.findOne).toHaveBeenCalledWith({
        where: [deviceSessionId, isDeleted],
      });
      expect(infoSpy).toHaveBeenCalled();
      expect(debugSpy).toHaveBeenCalled();
    });

    it('should find a device session by name', async () => {
      const traceId = mockTraceId;
      const mockDeviceSession = mockSavedDeviceSessionCase001;
      const { name, isDeleted, deviceSessionId } = mockDeviceSession;

      deviceSessionRepository.findOne.mockResolvedValue(mockDeviceSession);
      const infoSpy = jest.spyOn(deviceSessionService['logger'], 'info');
      const debugSpy = jest.spyOn(deviceSessionService['logger'], 'debug');

      const result = await deviceSessionService.findDeviceSession(
        {
          deviceSessionId,
          name,
          isDeleted,
        },
        traceId,
      );

      expect(result).toEqual(mockDeviceSession);
      expect(deviceSessionRepository.findOne).toHaveBeenCalledWith({
        where: [name, isDeleted],
      });
      expect(infoSpy).toHaveBeenCalled();
      expect(debugSpy).toHaveBeenCalled();
    });
  });

  describe('startDeviceSession', () => {
    it('should successfully start a device session with valid data', async () => {
      const startDeviceSessionDto: StartDeviceSessionDto =
        mockStartDeviceSessionDtoCase001;
      const traceId = mockTraceId;
      const savedDeviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(savedDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'create')
        .mockReturnValue(savedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await deviceSessionService.startDeviceSession(
        startDeviceSessionDto,
        traceId,
      );

      expect(deviceSessionRepository.save).toHaveBeenCalledWith(
        savedDeviceSession,
      );
      expect(deviceSessionRepository.create).toHaveBeenCalledWith(
        startDeviceSessionDto,
      );
      expect(
        ztrackingDeviceSessionService.createZtrackingDeviceSessionEntity,
      ).toHaveBeenCalledWith(savedDeviceSession, traceId);
      expect(result).toEqual(savedDeviceSession);
    });

    it('should log the start process with the correct traceId and log level', async () => {
      const startDeviceSessionDto: StartDeviceSessionDto =
        mockStartDeviceSessionDtoCase001;
      const traceId = mockTraceId;
      const savedDeviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(savedDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'create')
        .mockReturnValue(savedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const logSpy = jest.spyOn(deviceSessionService['logger'], 'log');
      const infoSpy = jest.spyOn(deviceSessionService['logger'], 'info');

      await deviceSessionService.startDeviceSession(
        startDeviceSessionDto,
        traceId,
      );

      expect(logSpy).toHaveBeenCalledWith(
        `startDeviceSessionDto : ${JSON.stringify(startDeviceSessionDto)}`,
        traceId,
        'startDeviceSession',
        LogStreamLevel.ProdStandard,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `device session started and entity saved in database`,
        traceId,
        'startDeviceSession',
        LogStreamLevel.ProdStandard,
      );
    });

    it('should handle the scenario where startDeviceSessionDto is missing required fields', async () => {
      const startDeviceSessionDto: StartDeviceSessionDto =
        mockStartDeviceSessionDtoCase001;
      const traceId = mockTraceId;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockRejectedValue(new Error('Missing required fields'));

      await expect(
        deviceSessionService.startDeviceSession(startDeviceSessionDto, traceId),
      ).rejects.toThrow('Missing required fields');
    });

    it('should manage the case where device session repository save operation fails', async () => {
      const startDeviceSessionDto: StartDeviceSessionDto =
        mockStartDeviceSessionDtoCase001;
      const traceId = mockTraceId;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        deviceSessionService.startDeviceSession(startDeviceSessionDto, traceId),
      ).rejects.toThrow('Database error');
    });

    it('should deal with the situation where ztrackingDeviceSessionService fails to create a ztracking entity', async () => {
      const startDeviceSessionDto: StartDeviceSessionDto =
        mockStartDeviceSessionDtoCase001;
      const traceId = mockTraceId;
      const savedDeviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(savedDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'create')
        .mockReturnValue(savedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(false);

      await expect(
        deviceSessionService.startDeviceSession(startDeviceSessionDto, traceId),
      ).resolves.toBeUndefined();
    });

    it('should handle the case where traceId is null or undefined', async () => {
      const startDeviceSessionDto: StartDeviceSessionDto =
        mockStartDeviceSessionDtoCase001;
      const traceId = null;
      const savedDeviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(savedDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'create')
        .mockReturnValue(savedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await deviceSessionService.startDeviceSession(
        startDeviceSessionDto,
        traceId,
      );

      expect(result).toEqual(savedDeviceSession);
    });
  });

  describe('closeDeviceSession', () => {
    it('should successfully close a device session with valid data', async () => {
      const closeDeviceSessionDto: CloseDeviceSessionDto =
        mockCloseDeviceSessionDtoCase001;
      const traceId = mockTraceId;
      const existingDeviceSession = mockSavedDeviceSessionCase001;
      const updatedDeviceSession = {
        ...existingDeviceSession,
        endTime: closeDeviceSessionDto.endTime,
        updatedBy: closeDeviceSessionDto.updatedBy,
      };

      jest
        .spyOn(deviceSessionRepository, 'findOne')
        .mockResolvedValue(existingDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(updatedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await deviceSessionService.closeDeviceSession(
        closeDeviceSessionDto,
        traceId,
      );

      expect(deviceSessionRepository.findOne).toHaveBeenCalledWith({
        where: { deviceSessionId: closeDeviceSessionDto.deviceSessionId },
      });
      expect(deviceSessionRepository.save).toHaveBeenCalledWith(
        updatedDeviceSession,
      );
      expect(
        ztrackingDeviceSessionService.createZtrackingDeviceSessionEntity,
      ).toHaveBeenCalledWith(updatedDeviceSession, traceId);
      expect(result).toEqual(updatedDeviceSession);
    });

    it('should log the close process with the correct traceId and log level', async () => {
      const closeDeviceSessionDto: CloseDeviceSessionDto =
        mockCloseDeviceSessionDtoCase001;
      const traceId = mockTraceId;
      const existingDeviceSession = mockSavedDeviceSessionCase001;
      const updatedDeviceSession = {
        ...existingDeviceSession,
        endTime: closeDeviceSessionDto.endTime,
        updatedBy: closeDeviceSessionDto.updatedBy,
      };

      jest
        .spyOn(deviceSessionRepository, 'findOne')
        .mockResolvedValue(existingDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(updatedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const logSpy = jest.spyOn(deviceSessionService['logger'], 'log');
      const infoSpy = jest.spyOn(deviceSessionService['logger'], 'info');

      await deviceSessionService.closeDeviceSession(
        closeDeviceSessionDto,
        traceId,
      );

      expect(logSpy).toHaveBeenCalledWith(
        `closeDeviceSessionDto : ${JSON.stringify(closeDeviceSessionDto)}`,
        traceId,
        'closeDeviceSession',
        LogStreamLevel.ProdStandard,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `device session entity closed and saved in the database`,
        traceId,
        'closeDeviceSession',
        LogStreamLevel.ProdStandard,
      );
    });

    it('should handle the scenario where closeDeviceSessionDto is missing required fields', async () => {
      const closeDeviceSessionDto: CloseDeviceSessionDto =
        mockCloseDeviceSessionDtoCase001;
      const traceId = mockTraceId;

      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockRejectedValue(new Error('Missing required fields'));

      await expect(
        deviceSessionService.closeDeviceSession(closeDeviceSessionDto, traceId),
      ).rejects.toThrow('Missing required fields');
    });

    it('should handle the case where device session does not exist', async () => {
      const closeDeviceSessionDto: CloseDeviceSessionDto =
        mockCloseDeviceSessionDtoCase001;
      const traceId = mockTraceId;

      jest.spyOn(deviceSessionRepository, 'findOne').mockResolvedValue(null);

      await expect(
        deviceSessionService.closeDeviceSession(closeDeviceSessionDto, traceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should manage the case where device session repository save operation fails', async () => {
      const closeDeviceSessionDto: CloseDeviceSessionDto =
        mockCloseDeviceSessionDtoCase001;
      const traceId = mockTraceId;
      const existingDeviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(deviceSessionRepository, 'findOne')
        .mockResolvedValue(existingDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        deviceSessionService.closeDeviceSession(closeDeviceSessionDto, traceId),
      ).rejects.toThrow('Database error');
    });

    it('should deal with the situation where ztrackingDeviceSessionService fails to create a ztracking entity', async () => {
      const closeDeviceSessionDto: CloseDeviceSessionDto =
        mockCloseDeviceSessionDtoCase001;
      const traceId = mockTraceId;
      const existingDeviceSession = mockSavedDeviceSessionCase001;
      const updatedDeviceSession = {
        ...existingDeviceSession,
        endTime: closeDeviceSessionDto.endTime,
        updatedBy: closeDeviceSessionDto.updatedBy,
      };

      jest
        .spyOn(deviceSessionRepository, 'findOne')
        .mockResolvedValue(existingDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(updatedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(false);

      await expect(
        deviceSessionService.closeDeviceSession(closeDeviceSessionDto, traceId),
      ).resolves.toBeUndefined();
    });

    it('should handle the case where traceId is null or undefined', async () => {
      const closeDeviceSessionDto: CloseDeviceSessionDto =
        mockCloseDeviceSessionDtoCase001;
      const traceId = null;
      const existingDeviceSession = mockSavedDeviceSessionCase001;
      const updatedDeviceSession = {
        ...existingDeviceSession,
        endTime: closeDeviceSessionDto.endTime,
        updatedBy: closeDeviceSessionDto.updatedBy,
      };

      jest
        .spyOn(deviceSessionRepository, 'findOne')
        .mockResolvedValue(existingDeviceSession as any);
      jest
        .spyOn(deviceSessionRepository, 'save')
        .mockResolvedValue(updatedDeviceSession as any);
      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'createZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await deviceSessionService.closeDeviceSession(
        closeDeviceSessionDto,
        traceId,
      );

      expect(result).toEqual(updatedDeviceSession);
    });
  });

  describe('findDeviceSessionHistory', () => {
    it('should find a history of device sessions based on the provided filters', async () => {
      const getDeviceSessionHistoryDto: GetDeviceSessionHistoryDto =
        mockGetDeviceSessionHistoryDtoCase001;
      const traceId = mockTraceId;
      const mockDeviceSessions = [
        mockSavedDeviceSessionCase001,
        mockSavedDeviceSessionCase002,
      ];

      const queryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockDeviceSessions),
      };

      jest
        .spyOn(deviceSessionRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder as any);

      const result = await deviceSessionService.findDeviceSessionHistory(
        getDeviceSessionHistoryDto,
        traceId,
      );

      expect(queryBuilder.andWhere).toHaveBeenCalledTimes(
        Object.keys(getDeviceSessionHistoryDto).length,
      );
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual(mockDeviceSessions);
    });

    it('should log the search process and results with the correct traceId and log level', async () => {
      const getDeviceSessionHistoryDto: GetDeviceSessionHistoryDto =
        mockGetDeviceSessionHistoryDtoCase001;
      const traceId = mockTraceId;
      const mockDeviceSessions = [
        mockSavedDeviceSessionCase001,
        mockSavedDeviceSessionCase002,
      ];

      const queryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockDeviceSessions),
      };

      jest
        .spyOn(deviceSessionRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder as any);

      const debugSpy = jest.spyOn(deviceSessionService['logger'], 'debug');
      const infoSpy = jest.spyOn(deviceSessionService['logger'], 'info');
      const warnSpy = jest.spyOn(deviceSessionService['logger'], 'warn');

      await deviceSessionService.findDeviceSessionHistory(
        getDeviceSessionHistoryDto,
        traceId,
      );

      expect(debugSpy).toHaveBeenCalledWith(
        `Executing query for device session history with filters: ${JSON.stringify(getDeviceSessionHistoryDto)}`,
        traceId,
        'findDeviceSessionHistory',
        LogStreamLevel.ProdStandard,
      );
      expect(infoSpy).toHaveBeenCalledWith(
        `Device sessions found: ${mockDeviceSessions.length}`,
        traceId,
        'findDeviceSessionHistory',
        LogStreamLevel.ProdStandard,
      );
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should log a warning if no device sessions are found with the provided criteria', async () => {
      const getDeviceSessionHistoryDto: GetDeviceSessionHistoryDto =
        mockGetDeviceSessionHistoryDtoCase001;
      const traceId = mockTraceId;

      const queryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };

      jest
        .spyOn(deviceSessionRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder as any);

      const warnSpy = jest.spyOn(deviceSessionService['logger'], 'warn');

      await deviceSessionService.findDeviceSessionHistory(
        getDeviceSessionHistoryDto,
        traceId,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        `No device sessions found with the provided criteria`,
        traceId,
        'findDeviceSessionHistory',
        LogStreamLevel.ProdStandard,
      );
    });
  });
});
