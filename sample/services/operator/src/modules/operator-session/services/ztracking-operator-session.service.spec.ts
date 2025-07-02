import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingOperatorSessionService } from './ztracking-operator-session.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingOperatorSession } from '../../../entities/ztracking-operator-session.entity';
import { MockType, repositoryMockFactory } from 'ez-utils';
import {
  mockSavedOperatorSessionCase001,
  mockSavedZtrackingOperatorSessionCase001,
  mockTraceId,
} from '../test-values.spec';
import { NotFoundException } from '@nestjs/common';

describe('ZtrackingOperatorSessionService', () => {
  let ztrackingOperatorSessionService: ZtrackingOperatorSessionService;
  let ztrackingOperatorSessionRepository: MockType<
    Repository<ZtrackingOperatorSession>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingOperatorSessionService,
        {
          provide: getRepositoryToken(ZtrackingOperatorSession),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    ztrackingOperatorSessionService =
      module.get<ZtrackingOperatorSessionService>(
        ZtrackingOperatorSessionService,
      );
    ztrackingOperatorSessionRepository = module.get(
      getRepositoryToken(ZtrackingOperatorSession),
    );
  });

  it('should be defined', () => {
    expect(ztrackingOperatorSessionService).toBeDefined();
  });

  describe('createZtrackingOperatorSessionEntity', () => {
    it('should create a ztracking operator session entity successfully', async () => {
      const traceId = mockTraceId;
      const operatorSession = mockSavedOperatorSessionCase001;
      const mockZtrackingOperatorSession =
        mockSavedZtrackingOperatorSessionCase001;

      jest
        .spyOn(ztrackingOperatorSessionRepository, 'save')
        .mockResolvedValue(mockZtrackingOperatorSession as any);

      const result =
        await ztrackingOperatorSessionService.createZtrackingOperatorSessionEntity(
          operatorSession,
          traceId,
        );

      expect(result).toEqual(true);
      expect(ztrackingOperatorSessionRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          operatorSessionId: operatorSession.operatorSessionId,
          versionDate: expect.any(Date),
        }),
      );
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const traceId = mockTraceId;
      const operatorSession = mockSavedOperatorSessionCase001;

      jest
        .spyOn(ztrackingOperatorSessionRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        ztrackingOperatorSessionService.createZtrackingOperatorSessionEntity(
          operatorSession,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingOperatorSessionEntity', () => {
    it('should find ztracking operator session entities based on criteria', async () => {
      const traceId = mockTraceId;
      const operatorSessionId =
        mockSavedZtrackingOperatorSessionCase001.operatorSessionId;
      const mockZtrackingOperatorSessions = [
        mockSavedZtrackingOperatorSessionCase001,
      ];

      jest
        .spyOn(ztrackingOperatorSessionRepository, 'find')
        .mockResolvedValue(mockZtrackingOperatorSessions as any);

      const result =
        await ztrackingOperatorSessionService.findZtrackingOperatorSessionEntity(
          { operatorSessionId },
          traceId,
        );

      expect(result).toEqual(mockZtrackingOperatorSessions);
      expect(ztrackingOperatorSessionRepository.find).toHaveBeenCalledWith({
        where: { operatorSessionId },
      });
    });

    it('should handle errors gracefully when finding ztracking entities', async () => {
      const traceId = mockTraceId;
      const operatorSessionId =
        mockSavedOperatorSessionCase001.operatorSessionId;

      jest
        .spyOn(ztrackingOperatorSessionRepository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        ztrackingOperatorSessionService.findZtrackingOperatorSessionEntity(
          { operatorSessionId },
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should throw NotFoundException if no ztracking entities found', async () => {
      const traceId = mockTraceId;
      const operatorSessionId =
        mockSavedOperatorSessionCase001.operatorSessionId;

      jest
        .spyOn(ztrackingOperatorSessionRepository, 'find')
        .mockResolvedValue([]);

      await expect(
        ztrackingOperatorSessionService.findZtrackingOperatorSessionEntity(
          { operatorSessionId },
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
