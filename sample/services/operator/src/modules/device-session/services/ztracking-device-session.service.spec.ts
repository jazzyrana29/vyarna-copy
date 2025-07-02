import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingDeviceSessionService } from './ztracking-device-session.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingDeviceSession } from '../../../entities/ztracking-device-session.entity';
import { MockType, repositoryMockFactory } from 'ez-utils';
import {
  mockSavedDeviceSessionCase001,
  mockSavedZtrackingDeviceSessionCase001,
  mockTraceId,
} from '../test-values.spec';

describe('ZtrackingDeviceSessionService', () => {
  let ztrackingDeviceSessionService: ZtrackingDeviceSessionService;
  let ztrackingDeviceSessionRepository: MockType<
    Repository<ZtrackingDeviceSession>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingDeviceSessionService,
        {
          provide: getRepositoryToken(ZtrackingDeviceSession),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    ztrackingDeviceSessionService = module.get<ZtrackingDeviceSessionService>(
      ZtrackingDeviceSessionService,
    );
    ztrackingDeviceSessionRepository = module.get(
      getRepositoryToken(ZtrackingDeviceSession),
    );
  });

  it('should be defined', () => {
    expect(ztrackingDeviceSessionService).toBeDefined();
  });

  describe('createZtrackingDeviceSessionEntity', () => {
    it('should create a ztracking device session entity successfully', async () => {
      const traceId = mockTraceId;
      const deviceSession = mockSavedDeviceSessionCase001;
      const mockZtrackingDeviceSession = mockSavedZtrackingDeviceSessionCase001;

      jest
        .spyOn(ztrackingDeviceSessionRepository, 'save')
        .mockResolvedValue(mockZtrackingDeviceSession as any);

      const result =
        await ztrackingDeviceSessionService.createZtrackingDeviceSessionEntity(
          deviceSession,
          traceId,
        );

      expect(result).toEqual(true);
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const traceId = mockTraceId;
      const deviceSession = mockSavedDeviceSessionCase001;

      jest
        .spyOn(ztrackingDeviceSessionRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        ztrackingDeviceSessionService.createZtrackingDeviceSessionEntity(
          deviceSession,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingDeviceSessionEntity', () => {
    it('should find ztracking device session entities based on criteria', async () => {
      const traceId = mockTraceId;
      const name = mockSavedZtrackingDeviceSessionCase001.name;
      const mockZtrackingDeviceSessions = [
        mockSavedZtrackingDeviceSessionCase001,
      ];

      jest
        .spyOn(ztrackingDeviceSessionRepository, 'find')
        .mockResolvedValue(mockZtrackingDeviceSessions as any);

      const result =
        await ztrackingDeviceSessionService.findZtrackingDeviceSessionEntity(
          {
            name,
            startTime: new Date('2023-10-15T08:00:00Z'),
            endTime: new Date('2025-10-15T10:00:00Z'),
          },
          traceId,
        );

      expect(result).toEqual(mockZtrackingDeviceSessions);
    });

    it('should handle errors gracefully when finding ztracking entities', async () => {
      const traceId = mockTraceId;
      const name = mockSavedDeviceSessionCase001.name;

      jest
        .spyOn(ztrackingDeviceSessionRepository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        ztrackingDeviceSessionService.findZtrackingDeviceSessionEntity(
          {
            name,
            startTime: new Date('2023-10-15T08:00:00Z'),
            endTime: new Date('2025-10-15T10:00:00Z'),
          },
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });
});
