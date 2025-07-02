// @ts-nocheck
import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorSessionService } from './operator-session.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperatorSession } from '../../../entities/operator-session.entity';
import { Operator } from '../../../entities/operator.entity';
import { ZtrackingOperatorSessionService } from './ztracking-operator-session.service';
import { JwtService } from '@nestjs/jwt';
import { LogStreamLevel } from 'ez-logger';
import { CreateOperatorSessionDto } from '../DTO/create-operator-session.dto';
import { UpdateOperatorSessionDto } from '../DTO/update-operator-session.dto';
import { LoginOperatorSessionDto } from '../DTO/login-operator-session.dto';
import { LogoutOperatorSessionDto } from '../DTO/logout-operator-session.dto';
import { SearchOperatorSessionsDto } from '../DTO/search-operator-sessions.dto';
import { NotFoundException } from '@nestjs/common';
import { MockType, repositoryMockFactory } from 'ez-utils';
import {
  mockCreateOperatorSessionDtoCase001,
  mockSavedOperatorSessionCase001,
  mockSavedOperatorSessionCase002,
  mockTraceId,
  mockUpdateOperatorSessionDtoCase002,
} from '../test-values.spec';

describe('OperatorSessionService', () => {
  let operatorSessionService: OperatorSessionService;
  let operatorSessionRepository: MockType<Repository<OperatorSession>>;
  let operatorRepository: MockType<Repository<Operator>>;
  let ztrackingOperatorSessionService: ZtrackingOperatorSessionService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorSessionService,
        {
          provide: getRepositoryToken(OperatorSession),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Operator),
          useFactory: repositoryMockFactory,
        },
        {
          provide: ZtrackingOperatorSessionService,
          useValue: {
            createZtrackingOperatorSessionEntity: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    operatorSessionService = module.get<OperatorSessionService>(
      OperatorSessionService,
    );
    operatorSessionRepository = module.get(getRepositoryToken(OperatorSession));
    operatorRepository = module.get(getRepositoryToken(Operator));
    ztrackingOperatorSessionService =
      module.get<ZtrackingOperatorSessionService>(
        ZtrackingOperatorSessionService,
      );
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('createOperatorSession', () => {
    it('should successfully create an operator session with valid data', async () => {
      const createOperatorSessionDto: CreateOperatorSessionDto =
        mockCreateOperatorSessionDtoCase001;
      const traceId = mockTraceId;
      const savedOperatorSession = mockSavedOperatorSessionCase001;

      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockResolvedValue(savedOperatorSession as any);
      jest
        .spyOn(operatorSessionRepository, 'create')
        .mockReturnValue(savedOperatorSession as any);
      jest
        .spyOn(
          ztrackingOperatorSessionService,
          'createZtrackingOperatorSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await operatorSessionService.createOperatorSession(
        createOperatorSessionDto,
        traceId,
      );

      expect(operatorSessionRepository.save).toHaveBeenCalledWith(
        savedOperatorSession,
      );
      expect(operatorSessionRepository.create).toHaveBeenCalledWith(
        createOperatorSessionDto,
      );
      expect(
        ztrackingOperatorSessionService.createZtrackingOperatorSessionEntity,
      ).toHaveBeenCalledWith(savedOperatorSession, traceId);
      expect(result).toEqual(savedOperatorSession);
    });

    it('should log the creation process with the correct traceId and log level', async () => {
      const createOperatorSessionDto: CreateOperatorSessionDto =
        mockCreateOperatorSessionDtoCase001;
      const traceId = mockTraceId;
      const savedOperatorSession = mockSavedOperatorSessionCase001;

      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockResolvedValue(savedOperatorSession as any);
      jest
        .spyOn(operatorSessionRepository, 'create')
        .mockReturnValue(savedOperatorSession as any);
      jest
        .spyOn(
          ztrackingOperatorSessionService,
          'createZtrackingOperatorSessionEntity',
        )
        .mockResolvedValue(true);

      const logSpy = jest.spyOn(operatorSessionService['logger'], 'log');
      const infoSpy = jest.spyOn(operatorSessionService['logger'], 'info');

      await operatorSessionService.createOperatorSession(
        createOperatorSessionDto,
        traceId,
      );

      expect(logSpy).toHaveBeenCalledWith(
        `createOperatorSessionDto : ${JSON.stringify(createOperatorSessionDto)}`,
        traceId,
        'createOperatorSession',
        LogStreamLevel.ProdStandard,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `operator session entity saved in database`,
        traceId,
        'createOperatorSession',
        LogStreamLevel.ProdStandard,
      );
    });

    it('should handle the scenario where createOperatorSessionDto is missing required fields', async () => {
      const createOperatorSessionDto: CreateOperatorSessionDto =
        mockCreateOperatorSessionDtoCase001;
      const traceId = mockTraceId;

      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockRejectedValue(new Error('Missing required fields'));

      await expect(
        operatorSessionService.createOperatorSession(
          createOperatorSessionDto,
          traceId,
        ),
      ).rejects.toThrow('Missing required fields');
    });

    it('should manage the case where the operator session repository save operation fails', async () => {
      const createOperatorSessionDto: CreateOperatorSessionDto =
        mockCreateOperatorSessionDtoCase001;
      const traceId = mockTraceId;

      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        operatorSessionService.createOperatorSession(
          createOperatorSessionDto,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should deal with the situation where ztrackingOperatorSessionService fails to create a Ztracking entity', async () => {
      const createOperatorSessionDto: CreateOperatorSessionDto =
        mockCreateOperatorSessionDtoCase001;
      const traceId = mockTraceId;
      const savedOperatorSession = mockSavedOperatorSessionCase001;

      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockResolvedValue(savedOperatorSession as any);
      jest
        .spyOn(operatorSessionRepository, 'create')
        .mockReturnValue(savedOperatorSession as any);
      jest
        .spyOn(
          ztrackingOperatorSessionService,
          'createZtrackingOperatorSessionEntity',
        )
        .mockResolvedValue(false);

      await expect(
        operatorSessionService.createOperatorSession(
          createOperatorSessionDto,
          traceId,
        ),
      ).resolves.toBeUndefined();
    });

    it('should handle the case where traceId is null or undefined', async () => {
      const createOperatorSessionDto: CreateOperatorSessionDto =
        mockCreateOperatorSessionDtoCase001;
      const traceId = null;
      const savedOperatorSession = mockSavedOperatorSessionCase001;

      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockResolvedValue(savedOperatorSession as any);
      jest
        .spyOn(operatorSessionRepository, 'create')
        .mockReturnValue(savedOperatorSession as any);
      jest
        .spyOn(
          ztrackingOperatorSessionService,
          'createZtrackingOperatorSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await operatorSessionService.createOperatorSession(
        createOperatorSessionDto,
        traceId,
      );

      expect(result).toEqual(savedOperatorSession);
    });
  });

  describe('updateOperatorSession', () => {
    it('should successfully update an operator session with valid data', async () => {
      const updateOperatorSessionDto: UpdateOperatorSessionDto =
        mockUpdateOperatorSessionDtoCase002;
      const traceId = mockTraceId;
      const existingOperatorSession = mockSavedOperatorSessionCase001;
      const updatedOperatorSession = mockSavedOperatorSessionCase002;

      jest
        .spyOn(operatorSessionRepository, 'findOne')
        .mockResolvedValue(existingOperatorSession as any);
      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockResolvedValue(updatedOperatorSession as any);
      jest
        .spyOn(
          ztrackingOperatorSessionService,
          'createZtrackingOperatorSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await operatorSessionService.updateOperatorSession(
        updateOperatorSessionDto,
        traceId,
      );

      expect(operatorSessionRepository.findOne).toHaveBeenCalledWith({
        where: {
          operatorSessionId: updateOperatorSessionDto.operatorSessionId,
        },
      });
      expect(operatorSessionRepository.save).toHaveBeenCalledWith(
        updateOperatorSessionDto,
      );
      expect(
        ztrackingOperatorSessionService.createZtrackingOperatorSessionEntity,
      ).toHaveBeenCalledWith(updatedOperatorSession, traceId);
      expect(result).toEqual(updatedOperatorSession);
    });

    it('should throw NotFoundException if operator session is not found', async () => {
      const updateOperatorSessionDto: UpdateOperatorSessionDto =
        mockUpdateOperatorSessionDtoCase002;
      const traceId = mockTraceId;

      jest.spyOn(operatorSessionRepository, 'findOne').mockResolvedValue(null);

      await expect(
        operatorSessionService.updateOperatorSession(
          updateOperatorSessionDto,
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should log the update process with the correct traceId and log level', async () => {
      const updateOperatorSessionDto: UpdateOperatorSessionDto =
        mockUpdateOperatorSessionDtoCase002;
      const traceId = mockTraceId;
      const existingOperatorSession = mockSavedOperatorSessionCase001;
      const updatedOperatorSession = mockSavedOperatorSessionCase002;

      jest
        .spyOn(operatorSessionRepository, 'findOne')
        .mockResolvedValue(existingOperatorSession as any);
      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockResolvedValue(updatedOperatorSession as any);
      jest
        .spyOn(
          ztrackingOperatorSessionService,
          'createZtrackingOperatorSessionEntity',
        )
        .mockResolvedValue(true);

      const infoSpy = jest.spyOn(operatorSessionService['logger'], 'info');

      await operatorSessionService.updateOperatorSession(
        updateOperatorSessionDto,
        traceId,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `operator session entity updated in database`,
        traceId,
        'updateOperatorSession',
        LogStreamLevel.ProdStandard,
      );
    });

    it('should handle the scenario where updateOperatorSessionDto is missing required fields', async () => {
      const updateOperatorSessionDto: UpdateOperatorSessionDto =
        mockUpdateOperatorSessionDtoCase002;
      const traceId = mockTraceId;

      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockRejectedValue(new Error('Missing required fields'));

      await expect(
        operatorSessionService.updateOperatorSession(
          updateOperatorSessionDto,
          traceId,
        ),
      ).rejects.toThrow('Missing required fields');
    });

    it('should manage the case where the operator session repository save operation fails', async () => {
      const updateOperatorSessionDto: UpdateOperatorSessionDto =
        mockUpdateOperatorSessionDtoCase002;
      const traceId = mockTraceId;

      jest
        .spyOn(operatorSessionRepository, 'findOne')
        .mockResolvedValue(mockSavedOperatorSessionCase001 as any);
      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        operatorSessionService.updateOperatorSession(
          updateOperatorSessionDto,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should deal with the situation where ztrackingOperatorSessionService fails to create a Ztracking entity', async () => {
      const updateOperatorSessionDto: UpdateOperatorSessionDto =
        mockUpdateOperatorSessionDtoCase002;
      const traceId = mockTraceId;
      const existingOperatorSession = mockSavedOperatorSessionCase001;
      const updatedOperatorSession = mockSavedOperatorSessionCase002;

      jest
        .spyOn(operatorSessionRepository, 'findOne')
        .mockResolvedValue(existingOperatorSession as any);
      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockResolvedValue(updatedOperatorSession as any);
      jest
        .spyOn(
          ztrackingOperatorSessionService,
          'createZtrackingOperatorSessionEntity',
        )
        .mockResolvedValue(false);

      await expect(
        operatorSessionService.updateOperatorSession(
          updateOperatorSessionDto,
          traceId,
        ),
      ).resolves.toBeUndefined();
    });

    it('should handle the case where traceId is null or undefined', async () => {
      const updateOperatorSessionDto: UpdateOperatorSessionDto =
        mockUpdateOperatorSessionDtoCase002;
      const traceId = null;
      const existingOperatorSession = mockSavedOperatorSessionCase001;
      const updatedOperatorSession = mockSavedOperatorSessionCase002;

      jest
        .spyOn(operatorSessionRepository, 'findOne')
        .mockResolvedValue(existingOperatorSession as any);
      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockResolvedValue(updatedOperatorSession as any);
      jest
        .spyOn(
          ztrackingOperatorSessionService,
          'createZtrackingOperatorSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await operatorSessionService.updateOperatorSession(
        updateOperatorSessionDto,
        traceId,
      );

      expect(result).toEqual(updatedOperatorSession);
    });
  });

  describe('findOperatorSession', () => {
    it('should find an operator session by sessionId', async () => {
      const traceId = mockTraceId;
      const sessionId = mockSavedOperatorSessionCase001.operatorSessionId;
      const isActive = true;
      const mockOperatorSession = mockSavedOperatorSessionCase001;

      operatorSessionRepository.findOne.mockResolvedValue(mockOperatorSession);

      const infoSpy = jest.spyOn(operatorSessionService['logger'], 'info');
      const debugSpy = jest.spyOn(operatorSessionService['logger'], 'debug');

      const result = await operatorSessionService.findOperatorSession(traceId, {
        sessionId,
        isActive,
      });

      expect(result).toEqual(mockOperatorSession);
      expect(operatorSessionRepository.findOne).toHaveBeenCalledWith({
        where: [{ sessionId, isActive }],
      });
      expect(infoSpy).toHaveBeenCalled();
      expect(debugSpy).toHaveBeenCalled();
    });

    it('should find an operator session by operatorId', async () => {
      const traceId = mockTraceId;
      const operatorId = mockSavedOperatorSessionCase001.operator.operatorId;
      const isActive = true;
      const mockOperatorSession = mockSavedOperatorSessionCase001;

      operatorSessionRepository.findOne.mockResolvedValue(mockOperatorSession);
      const infoSpy = jest.spyOn(operatorSessionService['logger'], 'info');
      const debugSpy = jest.spyOn(operatorSessionService['logger'], 'debug');

      const result = await operatorSessionService.findOperatorSession(traceId, {
        operatorId,
        isActive,
      });

      expect(result).toEqual(mockOperatorSession);
      expect(operatorSessionRepository.findOne).toHaveBeenCalledWith({
        where: [{ operatorId, isActive }],
      });
      expect(infoSpy).toHaveBeenCalled();
      expect(debugSpy).toHaveBeenCalled();
    });
  });

  describe('loginOperator', () => {
    it('should successfully login with valid credentials and return token and session info', async () => {
      const loginOperatorSessionDto: LoginOperatorSessionDto = {
        username: 'validUser',
        password: 'validPassword',
      };
      const traceId = mockTraceId;
      const operator = {
        operatorId: 'validOperatorId',
        username: 'validUser',
        password: await bcrypt.hash('validPassword', 10),
      };
      const token = 'jwtToken';
      const operatorSession = {
        operator: { operatorId: 'validOperatorId' },
        loginTime: new Date(),
      } as OperatorSession;

      jest
        .spyOn(operatorRepository, 'findOne')
        .mockResolvedValue(operator as any);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);
      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockResolvedValue(operatorSession as any);

      const result = await operatorSessionService.loginOperator(
        loginOperatorSessionDto,
        traceId,
      );

      expect(result).toEqual({ token, operatorSession });
      expect(operatorRepository.findOne).toHaveBeenCalledWith({
        where: { username: loginOperatorSessionDto.username },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({ id: operator.operatorId });
      expect(operatorSessionRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          operator: expect.objectContaining({
            operatorId: operator.operatorId,
          }),
          loginTime: expect.any(Date),
        }),
      );
    });

    it('should throw NotFoundException if username is incorrect', async () => {
      const loginOperatorSessionDto: LoginOperatorSessionDto = {
        username: 'invalidUser',
        password: 'somePassword',
      };
      const traceId = mockTraceId;

      jest.spyOn(operatorRepository, 'findOne').mockResolvedValue(null);

      await expect(
        operatorSessionService.loginOperator(loginOperatorSessionDto, traceId),
      ).rejects.toThrow(NotFoundException);
      expect(operatorRepository.findOne).toHaveBeenCalledWith({
        where: { username: loginOperatorSessionDto.username },
      });
    });

    it('should throw NotFoundException if password is incorrect', async () => {
      const loginOperatorSessionDto: LoginOperatorSessionDto = {
        username: 'validUser',
        password: 'invalidPassword',
      };
      const traceId = mockTraceId;
      const operator = {
        operatorId: 'validOperatorId',
        username: 'validUser',
        password: await bcrypt.hash('validPassword', 10),
      };

      jest
        .spyOn(operatorRepository, 'findOne')
        .mockResolvedValue(operator as any);

      await expect(
        operatorSessionService.loginOperator(loginOperatorSessionDto, traceId),
      ).rejects.toThrow(NotFoundException);
      expect(operatorRepository.findOne).toHaveBeenCalledWith({
        where: { username: loginOperatorSessionDto.username },
      });
    });

    it('should log the login process with the correct traceId and log level', async () => {
      const loginOperatorSessionDto: LoginOperatorSessionDto = {
        username: 'validUser',
        password: 'validPassword',
      };
      const traceId = mockTraceId;
      const operator = {
        operatorId: 'validOperatorId',
        username: 'validUser',
        password: await bcrypt.hash('validPassword', 10),
      };
      const token = 'jwtToken';
      const operatorSession = {
        operator: { operatorId: 'validOperatorId' },
        loginTime: new Date(),
      } as OperatorSession;

      jest
        .spyOn(operatorRepository, 'findOne')
        .mockResolvedValue(operator as any);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);
      jest
        .spyOn(operatorSessionRepository, 'save')
        .mockResolvedValue(operatorSession as any);

      const logSpy = jest.spyOn(operatorSessionService['logger'], 'log');
      const infoSpy = jest.spyOn(operatorSessionService['logger'], 'info');

      await operatorSessionService.loginOperator(
        loginOperatorSessionDto,
        traceId,
      );

      expect(logSpy).toHaveBeenCalledWith(
        `loginOperatorSessionDto : ${JSON.stringify(loginOperatorSessionDto)}`,
        traceId,
        'loginOperator',
        LogStreamLevel.ProdStandard,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `Operator logged in successfully`,
        traceId,
        'loginOperator',
        LogStreamLevel.ProdStandard,
      );
    });
  });

  describe('logoutOperatorSession', () => {
    it('should successfully logout with valid operatorId', async () => {
      const logoutOperatorSessionDto: LogoutOperatorSessionDto = {
        operatorId: 'validOperatorId',
      };
      const traceId = mockTraceId;
      const operatorSession = {
        operator: { operatorId: 'validOperatorId' },
        loginTime: new Date(),
      } as OperatorSession;

      jest
        .spyOn(operatorSessionRepository, 'findOne')
        .mockResolvedValue(operatorSession as any);
      jest.spyOn(operatorSessionRepository, 'save').mockResolvedValue({
        ...operatorSession,
        logoutTime: new Date(),
      } as any);
      jest
        .spyOn(
          ztrackingOperatorSessionService,
          'createZtrackingOperatorSessionEntity',
        )
        .mockResolvedValue(true);

      const result = await operatorSessionService.logoutOperatorSession(
        logoutOperatorSessionDto,
        traceId,
      );

      expect(result).toEqual(
        expect.objectContaining({
          logoutTime: expect.any(Date),
        }),
      );
      expect(operatorSessionRepository.findOne).toHaveBeenCalledWith({
        where: {
          operator: { operatorId: logoutOperatorSessionDto.operatorId },
        },
      });
      expect(operatorSessionRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          logoutTime: expect.any(Date),
        }),
      );
      expect(
        ztrackingOperatorSessionService.createZtrackingOperatorSessionEntity,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          logoutTime: expect.any(Date),
        }),
        traceId,
      );
    });

    it('should throw NotFoundException if operatorId is incorrect', async () => {
      const logoutOperatorSessionDto: LogoutOperatorSessionDto = {
        operatorId: 'invalidOperatorId',
      };
      const traceId = mockTraceId;

      jest.spyOn(operatorSessionRepository, 'findOne').mockResolvedValue(null);

      await expect(
        operatorSessionService.logoutOperatorSession(
          logoutOperatorSessionDto,
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
      expect(operatorSessionRepository.findOne).toHaveBeenCalledWith({
        where: {
          operator: { operatorId: logoutOperatorSessionDto.operatorId },
        },
      });
    });

    it('should log the logout process with the correct traceId and log level', async () => {
      const logoutOperatorSessionDto: LogoutOperatorSessionDto = {
        operatorId: 'validOperatorId',
      };
      const traceId = mockTraceId;
      const operatorSession = {
        operator: { operatorId: 'validOperatorId' },
        loginTime: new Date(),
      } as OperatorSession;

      jest
        .spyOn(operatorSessionRepository, 'findOne')
        .mockResolvedValue(operatorSession as any);
      jest.spyOn(operatorSessionRepository, 'save').mockResolvedValue({
        ...operatorSession,
        logoutTime: new Date(),
      } as any);
      jest
        .spyOn(
          ztrackingOperatorSessionService,
          'createZtrackingOperatorSessionEntity',
        )
        .mockResolvedValue(true);

      const logSpy = jest.spyOn(operatorSessionService['logger'], 'log');
      const infoSpy = jest.spyOn(operatorSessionService['logger'], 'info');

      await operatorSessionService.logoutOperatorSession(
        logoutOperatorSessionDto,
        traceId,
      );

      expect(logSpy).toHaveBeenCalledWith(
        `logoutOperatorSessionDto: ${JSON.stringify(logoutOperatorSessionDto)}`,
        traceId,
        'logoutOperatorSession',
        LogStreamLevel.ProdStandard,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `Operator session entity updated with logoutTime in database`,
        traceId,
        'logoutOperatorSession',
        LogStreamLevel.ProdStandard,
      );
    });
  });

  describe('searchOperatorSessions', () => {
    it('should successfully search with valid criteria and return sessions', async () => {
      const searchOperatorSessionsDto: SearchOperatorSessionsDto = {
        operatorId: 'validOperatorId',
        startDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
        endDate: new Date(),
      };
      const traceId = mockTraceId;
      const operatorSessions = [mockSavedOperatorSessionCase001];

      jest
        .spyOn(operatorSessionRepository, 'find')
        .mockResolvedValue(operatorSessions as any);

      const result = await operatorSessionService.searchOperatorSessions(
        searchOperatorSessionsDto,
        traceId,
      );

      expect(result).toEqual(operatorSessions);
      expect(operatorSessionRepository.find).toHaveBeenCalledWith({
        where: {
          operator: { operatorId: searchOperatorSessionsDto.operatorId },
          loginTime: Between(
            searchOperatorSessionsDto.startDate,
            searchOperatorSessionsDto.endDate,
          ),
        },
      });
    });

    it('should throw NotFoundException if no sessions found with the provided criteria', async () => {
      const searchOperatorSessionsDto: SearchOperatorSessionsDto = {
        operatorId: 'validOperatorId',
        startDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
        endDate: new Date(),
      };
      const traceId = mockTraceId;

      jest.spyOn(operatorSessionRepository, 'find').mockResolvedValue([]);

      await expect(
        operatorSessionService.searchOperatorSessions(
          searchOperatorSessionsDto,
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
      expect(operatorSessionRepository.find).toHaveBeenCalledWith({
        where: {
          operator: { operatorId: searchOperatorSessionsDto.operatorId },
          loginTime: Between(
            searchOperatorSessionsDto.startDate,
            searchOperatorSessionsDto.endDate,
          ),
        },
      });
    });

    it('should log the search process with the correct traceId and log level', async () => {
      const searchOperatorSessionsDto: SearchOperatorSessionsDto = {
        operatorId: 'validOperatorId',
        startDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
        endDate: new Date(),
      };
      const traceId = mockTraceId;
      const operatorSessions = [mockSavedOperatorSessionCase001];

      jest
        .spyOn(operatorSessionRepository, 'find')
        .mockResolvedValue(operatorSessions as any);

      const debugSpy = jest.spyOn(operatorSessionService['logger'], 'debug');
      const infoSpy = jest.spyOn(operatorSessionService['logger'], 'info');

      await operatorSessionService.searchOperatorSessions(
        searchOperatorSessionsDto,
        traceId,
      );

      expect(debugSpy).toHaveBeenCalledWith(
        `Search criteria: ${JSON.stringify({
          operator: { operatorId: searchOperatorSessionsDto.operatorId },
          loginTime: Between(
            searchOperatorSessionsDto.startDate,
            searchOperatorSessionsDto.endDate,
          ),
        })}`,
        traceId,
        'searchOperatorSessions',
        LogStreamLevel.ProdStandard,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `Operator sessions retrieved from database`,
        traceId,
        'searchOperatorSessions',
        LogStreamLevel.ProdStandard,
      );
    });
  });
});

function Between(startDate: Date, endDate: Date): any {
  throw new Error('Function not implemented.');
}
