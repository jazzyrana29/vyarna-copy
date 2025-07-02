import { Test, TestingModule } from '@nestjs/testing';
import { DeviceSessionKafkaService } from './device-session-kafka.service';
import { DeviceSessionService } from './device-session.service';
import { ZtrackingDeviceSessionService } from './ztracking-device-session.service';

import { ZtrackingDeviceSession } from '../../../entities/ztracking-device-session.entity';
import { SaveOptions, RemoveOptions } from 'typeorm';

// Mock external dependencies
jest.mock('ez-kafka-consumer');
jest.mock('ez-kafka-producer');

describe('DeviceSessionKafkaService', () => {
  let deviceSessionKafkaService: DeviceSessionKafkaService;
  let deviceSessionService: DeviceSessionService;
  let ztrackingDeviceSessionService: ZtrackingDeviceSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceSessionKafkaService,
        {
          provide: DeviceSessionService,
          useValue: {
            createDeviceSession: jest.fn(),
            updateDeviceSession: jest.fn(),
            findDeviceSession: jest.fn(),
            startDeviceSession: jest.fn(),
            closeDeviceSession: jest.fn(),
          },
        },
        {
          provide: ZtrackingDeviceSessionService,
          useValue: {
            findZtrackingDeviceSessionEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    deviceSessionKafkaService = module.get<DeviceSessionKafkaService>(
      DeviceSessionKafkaService,
    );
    deviceSessionService =
      module.get<DeviceSessionService>(DeviceSessionService);
    ztrackingDeviceSessionService = module.get<ZtrackingDeviceSessionService>(
      ZtrackingDeviceSessionService,
    );
  });

  describe('createDeviceSessionViaKafka', () => {
    it('should be defined', () => {
      expect(deviceSessionKafkaService.createDeviceSession).toBeDefined();
    });

    it('should create device session via Kafka', async () => {
      const message = {}; // Add actual structure if needed
      const key = 'key';
      const mockDeviceSession = { deviceSessionId: '123' };
      jest
        .spyOn(deviceSessionService, 'createDeviceSession')
        .mockResolvedValue(mockDeviceSession);

      await deviceSessionKafkaService.createDeviceSession(message, key);

      expect(deviceSessionService.createDeviceSession).toHaveBeenCalled();
    });
  });

  describe('updateDeviceSessionViaKafka', () => {
    it('should be defined', () => {
      expect(deviceSessionKafkaService.updateDeviceSession).toBeDefined();
    });

    it('should update device session via Kafka', async () => {
      const message = {}; // Add actual structure if needed
      const key = 'key';
      const mockDeviceSession = { deviceSessionId: '123' };
      jest
        .spyOn(deviceSessionService, 'updateDeviceSession')
        .mockResolvedValue(mockDeviceSession);

      await deviceSessionKafkaService.updateDeviceSession(message, key);

      expect(deviceSessionService.updateDeviceSession).toHaveBeenCalled();
    });
  });

  describe('getDeviceSessionViaKafka', () => {
    it('should be defined', () => {
      expect(deviceSessionKafkaService.getDeviceSession).toBeDefined();
    });

    it('should get device session via Kafka', async () => {
      const message = {}; // Add actual structure if needed
      const key = 'key';
      const mockDeviceSession = {
        deviceSessionId: '123',
        startTime: new Date(),
        endTime: null,
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        lastUpdated: new Date(),
        operatorSessions: [],
        name: 'Test Session',
        deviceId: 'deviceIdMock001',
        isDeleted: false,
        updatedBy: 'userMock001',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(deviceSessionService, 'findDeviceSession')
        .mockResolvedValue(mockDeviceSession);

      await deviceSessionKafkaService.getDeviceSession(message, key);

      expect(deviceSessionService.findDeviceSession).toHaveBeenCalled();
    });
  });

  describe('getHistoryDeviceSessionViaKafka', () => {
    it('should be defined', () => {
      expect(deviceSessionKafkaService.getHistoryDeviceSession).toBeDefined();
    });

    it('should get device session history via Kafka', async () => {
      const message = {}; // Add actual structure if needed
      const key = 'key';
      const mockHistory = [
        {
          ztrackingVersion: 'version-123',
          deviceSessionId: '123',
          name: 'Device Session 1',
          deviceId: 'deviceId-123',
          isDeleted: false,
          createdAt: new Date(),
          updatedBy: 'user-123',
          versionDate: new Date(),
          hasId: function (): boolean {
            throw new Error('Function not implemented.');
          },
          save: function (
            options?: SaveOptions,
          ): Promise<ZtrackingDeviceSession> {
            throw new Error('Function not implemented.');
          },
          remove: function (
            options?: RemoveOptions,
          ): Promise<ZtrackingDeviceSession> {
            throw new Error('Function not implemented.');
          },
          softRemove: function (
            options?: SaveOptions,
          ): Promise<ZtrackingDeviceSession> {
            throw new Error('Function not implemented.');
          },
          recover: function (
            options?: SaveOptions,
          ): Promise<ZtrackingDeviceSession> {
            throw new Error('Function not implemented.');
          },
          reload: function (): Promise<void> {
            throw new Error('Function not implemented.');
          },
        },
      ];

      jest
        .spyOn(
          ztrackingDeviceSessionService,
          'findZtrackingDeviceSessionEntity',
        )
        .mockResolvedValue(mockHistory);

      await deviceSessionKafkaService.getHistoryDeviceSession(message, key);

      expect(
        ztrackingDeviceSessionService.findZtrackingDeviceSessionEntity,
      ).toHaveBeenCalled();
    });
  });

  describe('startDeviceSessionViaKafka', () => {
    it('should be defined', () => {
      expect(deviceSessionKafkaService.startDeviceSession).toBeDefined();
    });

    it('should start device session via Kafka', async () => {
      const message = {}; // Add actual structure if needed
      const key = 'key';
      const mockDeviceSession = { deviceSessionId: '123' };
      jest
        .spyOn(deviceSessionService, 'startDeviceSession')
        .mockResolvedValue(mockDeviceSession);

      await deviceSessionKafkaService.startDeviceSession(message, key);

      expect(deviceSessionService.startDeviceSession).toHaveBeenCalled();
    });
  });

  describe('closeDeviceSessionViaKafka', () => {
    it('should be defined', () => {
      expect(deviceSessionKafkaService.closeDeviceSession).toBeDefined();
    });

    it('should close device session via Kafka', async () => {
      const message = {}; // Add actual structure if needed
      const key = 'key';
      const mockDeviceSession = { deviceSessionId: '123' };
      jest
        .spyOn(deviceSessionService, 'closeDeviceSession')
        .mockResolvedValue(mockDeviceSession);

      await deviceSessionKafkaService.closeDeviceSession(message, key);

      expect(deviceSessionService.closeDeviceSession).toHaveBeenCalled();
    });
  });
});
