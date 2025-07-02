// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { OperatorSessionKafkaService } from './operator-session-kafka.service';
import { OperatorSessionService } from './operator-session.service';
import { ZtrackingOperatorSessionService } from './ztracking-operator-session.service';

jest.mock('ez-kafka-consumer');
jest.mock('ez-kafka-producer');

describe('OperatorSessionKafkaService', () => {
  let operatorSessionKafkaService: OperatorSessionKafkaService;
  let operatorSessionService: OperatorSessionService;
  let ztrackingOperatorSessionService: ZtrackingOperatorSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorSessionKafkaService,
        {
          provide: OperatorSessionService,
          useValue: {
            createOperatorSession: jest.fn(),
            updateOperatorSession: jest.fn(),
            findOperatorSession: jest.fn(),
            loginOperator: jest.fn(),
            logoutOperatorSession: jest.fn(),
            searchOperatorSessions: jest.fn(),
          },
        },
        {
          provide: ZtrackingOperatorSessionService,
          useValue: {
            findZtrackingOperatorSessionEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    operatorSessionKafkaService = module.get<OperatorSessionKafkaService>(
      OperatorSessionKafkaService,
    );
    operatorSessionService = module.get<OperatorSessionService>(
      OperatorSessionService,
    );
    ztrackingOperatorSessionService =
      module.get<ZtrackingOperatorSessionService>(
        ZtrackingOperatorSessionService,
      );
  });

  describe('createOperatorSessionViaKafka', () => {
    it('should be defined', () => {
      expect(operatorSessionKafkaService).toBeDefined();
    });

    it('should log and handle the creation of an operator session', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: { some: 'data' },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: { some: 'data' },
        key: 'someKey',
      };

      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));

      const createOperatorSessionSpy = jest
        .spyOn(operatorSessionService, 'createOperatorSession')
        .mockResolvedValue({ sessionId: '123' } as any);

      await operatorSessionKafkaService.createOperatorSessionViaKafka();

      expect(createOperatorSessionSpy).toHaveBeenCalledWith(
        decodedMessage.value,
        traceId,
      );
    });

    it('should log and handle errors during creation of an operator session', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: { some: 'data' },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: { some: 'data' },
        key: 'someKey',
      };

      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));

      const createOperatorSessionSpy = jest
        .spyOn(operatorSessionService, 'createOperatorSession')
        .mockRejectedValue(new Error('failure'));

      await operatorSessionKafkaService.createOperatorSessionViaKafka();

      expect(createOperatorSessionSpy).toHaveBeenCalledWith(
        decodedMessage.value,
        traceId,
      );
    });
  });

  describe('updateOperatorSessionViaKafka', () => {
    it('should be defined', () => {
      expect(operatorSessionKafkaService).toBeDefined();
    });

    it('should log and handle the updating of an operator session', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: { some: 'data' },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: { some: 'data' },
        key: 'someKey',
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));
      jest
        .spyOn(operatorSessionService, 'updateOperatorSession')
        .mockResolvedValue({ sessionId: '123' } as any);

      await operatorSessionKafkaService.updateOperatorSessionViaKafka();

      expect(operatorSessionService.updateOperatorSession).toHaveBeenCalledWith(
        decodedMessage.value,
        traceId,
      );
    });

    it('should log and handle errors during updating of an operator session', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: { some: 'data' },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: { some: 'data' },
        key: 'someKey',
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));
      jest
        .spyOn(operatorSessionService, 'updateOperatorSession')
        .mockRejectedValue(new Error('failure'));

      await operatorSessionKafkaService.updateOperatorSessionViaKafka();

      expect(operatorSessionService.updateOperatorSession).toHaveBeenCalledWith(
        decodedMessage.value,
        traceId,
      );
    });
  });

  describe('getOperatorSessionViaKafka', () => {
    it('should be defined', () => {
      expect(operatorSessionKafkaService).toBeDefined();
    });

    it('should log and handle the retrieval of an operator session', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: {
          some: 'data',
          sessionId: 'someSessionId',
          operatorId: 'someOperatorId',
          isActive: true,
        },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: {
          some: 'data',
          sessionId: 'someSessionId',
          operatorId: 'someOperatorId',
          isActive: true,
        },
        key: 'someKey',
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));
      jest
        .spyOn(operatorSessionService, 'findOperatorSession')
        .mockResolvedValue({ operatorSessionId: '123' } as any);

      await operatorSessionKafkaService.getOperatorSessionViaKafka();

      expect(operatorSessionService.findOperatorSession).toHaveBeenCalledWith(
        traceId,
        {
          sessionId: decodedMessage.value.sessionId,
          operatorId: decodedMessage.value.operatorId,
          isActive: decodedMessage.value.isActive || false,
        },
      );
    });

    it('should log and handle errors during retrieval of an operator session', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: {
          some: 'data',
          sessionId: 'someSessionId',
          operatorId: 'someOperatorId',
          isActive: true,
        },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: {
          some: 'data',
          sessionId: 'someSessionId',
          operatorId: 'someOperatorId',
          isActive: true,
        },
        key: 'someKey',
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));
      jest
        .spyOn(operatorSessionService, 'findOperatorSession')
        .mockRejectedValue(new Error('failure'));

      try {
        await operatorSessionKafkaService.getOperatorSessionViaKafka();
      } catch (e) {
        // Handle the error here if necessary
      }

      expect(operatorSessionService.findOperatorSession).toHaveBeenCalledWith(
        traceId,
        {
          sessionId: decodedMessage.value.sessionId,
          operatorId: decodedMessage.value.operatorId,
          isActive: decodedMessage.value.isActive || false,
        },
      );
    });
  });

  describe('loginOperatorSessionViaKafka', () => {
    it('should be defined', () => {
      expect(operatorSessionKafkaService).toBeDefined();
    });

    it('should log and handle the login of an operator session', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: { some: 'data' },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: { some: 'data' },
        key: 'someKey',
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));
      jest
        .spyOn(operatorSessionService, 'loginOperator')
        .mockResolvedValue({ operatorSession: { sessionId: '123' } } as any);

      await operatorSessionKafkaService.loginOperatorSessionViaKafka();

      expect(operatorSessionService.loginOperator).toHaveBeenCalledWith(
        decodedMessage.value,
        traceId,
      );
    });

    it('should log and handle errors during login of an operator session', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: { some: 'data' },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: { some: 'data' },
        key: 'someKey',
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));
      jest
        .spyOn(operatorSessionService, 'loginOperator')
        .mockRejectedValue(new Error('failure'));

      await operatorSessionKafkaService.loginOperatorSessionViaKafka();

      expect(operatorSessionService.loginOperator).toHaveBeenCalledWith(
        decodedMessage.value,
        traceId,
      );
    });
  });

  describe('logoutOperatorSessionViaKafka', () => {
    it('should be defined', () => {
      expect(operatorSessionKafkaService).toBeDefined();
    });

    it('should log and handle the logout of an operator session', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: { some: 'data' },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: { some: 'data' },
        key: 'someKey',
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));
      jest
        .spyOn(operatorSessionService, 'logoutOperatorSession')
        .mockResolvedValue({ operatorSessionId: '123' } as any);

      await operatorSessionKafkaService.logoutOperatorSessionViaKafka();

      expect(operatorSessionService.logoutOperatorSession).toHaveBeenCalledWith(
        decodedMessage.value,
        traceId,
      );
    });

    it('should log and handle errors during logout of an operator session', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: { some: 'data' },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: { some: 'data' },
        key: 'someKey',
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));
      jest
        .spyOn(operatorSessionService, 'logoutOperatorSession')
        .mockRejectedValue(new Error('failure'));

      await operatorSessionKafkaService.logoutOperatorSessionViaKafka();

      expect(operatorSessionService.logoutOperatorSession).toHaveBeenCalledWith(
        decodedMessage.value,
        traceId,
      );
    });
  });

  describe('searchOperatorSessionsViaKafka', () => {
    it('should be defined', () => {
      expect(operatorSessionKafkaService).toBeDefined();
    });

    it('should log and handle the search of operator sessions', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: { some: 'data' },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: { some: 'data' },
        key: 'someKey',
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));
      jest
        .spyOn(operatorSessionService, 'searchOperatorSessions')
        .mockResolvedValue([{ sessionId: '123' }] as any);

      await operatorSessionKafkaService.searchOperatorSessionsViaKafka();

      expect(
        operatorSessionService.searchOperatorSessions,
      ).toHaveBeenCalledWith(decodedMessage.value, traceId);
    });

    it('should log and handle errors during search of operator sessions', async () => {
      const traceId = 'someTraceId';
      const message = {
        value: { some: 'data' },
        key: 'someKey',
        traceId,
      };
      const decodedMessage = {
        traceId: 'someTraceId',
        value: { some: 'data' },
        key: 'someKey',
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(({ onMessage }) => onMessage(message as any));
      jest
        .spyOn(operatorSessionService, 'searchOperatorSessions')
        .mockRejectedValue(new Error('failure'));

      await operatorSessionKafkaService.searchOperatorSessionsViaKafka();

      expect(
        operatorSessionService.searchOperatorSessions,
      ).toHaveBeenCalledWith(decodedMessage.value, traceId);
    });
  });
});
