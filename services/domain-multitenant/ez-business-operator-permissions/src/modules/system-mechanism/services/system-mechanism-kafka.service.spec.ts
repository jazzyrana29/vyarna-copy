import { Test, TestingModule } from '@nestjs/testing';
import { SystemMechanismKafkaService } from './system-mechanism-kafka.service';
import { SystemMechanismService } from './system-mechanism.service';
import { SystemMechanism } from '../../../entities/system-mechanism.entity';
import { MechanismPermit } from '../../../entities/mechanism-permit.entity';
import { EzKafkaProducer } from 'ez-kafka-producer';
import {
  decodeKafkaMessage,
  KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY_RESPONSE,
  KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY_RESPONSE,
  KT_GET_SYSTEM_MECHANISM_ENTITY_RESPONSE,
} from 'ez-utils';
import { RemoveOptions, SaveOptions } from 'typeorm';

jest.mock('ez-kafka-consumer');
jest.mock('ez-kafka-producer');

describe('SystemMechanismKafkaService', () => {
  let systemMechanismKafkaService: SystemMechanismKafkaService;
  let systemMechanismService: SystemMechanismService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemMechanismKafkaService,
        {
          provide: SystemMechanismService,
          useValue: {
            findSystemMechanism: jest.fn(),
            findHistoricalData: jest.fn(),
            getManySystemMechanisms: jest.fn(),
          },
        },
      ],
    }).compile();

    systemMechanismKafkaService = module.get<SystemMechanismKafkaService>(
      SystemMechanismKafkaService,
    );
    systemMechanismService = module.get<SystemMechanismService>(
      SystemMechanismService,
    );
  });

  describe('getSystemMechanismEntityViaKafka', () => {
    it('should be defined', () => {
      expect(systemMechanismKafkaService).toBeDefined();
    });

    it('should handle a valid message', async () => {
      const kafkaMessage = {
        traceId: 'test-trace-id',
        value: {
          systemMechanismId: 'test-id',
          name: 'test-name',
          isDeleted: false,
        },
        key: 'test-key',
      };

      const systemMechanism: SystemMechanism = {
        systemMechanismId: 'test-id',
        name: 'test-name',
        isDeleted: false,
        description: '',
        mechanismPermits: [],
        createdAt: undefined,
        updatedAt: undefined,
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<SystemMechanism> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<SystemMechanism> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<SystemMechanism> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<SystemMechanism> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };

      jest
        .spyOn(systemMechanismService, 'findSystemMechanism')
        .mockResolvedValue(systemMechanism);

      jest.mocked(decodeKafkaMessage).mockReturnValue(kafkaMessage);

      const produceSpy = jest
        .mocked(new EzKafkaProducer().produce)
        .mockResolvedValue();

      await systemMechanismKafkaService.getSystemMechanismEntityViaKafka();

      expect(produceSpy).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_GET_SYSTEM_MECHANISM_ENTITY_RESPONSE,
        expect.anything(),
      );
    });

    it('should handle an error scenario', async () => {
      const kafkaMessage = {
        traceId: 'test-trace-id',
        value: { mechanismId: 'test-id' },
        key: 'test-key',
      };

      jest
        .spyOn(systemMechanismService, 'findSystemMechanism')
        .mockRejectedValue(new Error('test error'));
      jest.mocked(decodeKafkaMessage).mockReturnValue(kafkaMessage);
      const produceSpy = jest
        .mocked(new EzKafkaProducer().produce)
        .mockResolvedValue();

      await systemMechanismKafkaService.getSystemMechanismEntityViaKafka();

      expect(produceSpy).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_GET_SYSTEM_MECHANISM_ENTITY_RESPONSE,
        expect.anything(),
      );
    });
  });

  describe('getHistoryOfSystemMechanismEntityViaKafka', () => {
    it('should be defined', () => {
      expect(systemMechanismKafkaService).toBeDefined();
    });

    it('should handle a valid message', async () => {
      const kafkaMessage = {
        traceId: 'test-trace-id',
        value: {
          systemMechanismId: 'test-id',
          name: 'test-name',
          description: 'test-description',
          mechanismPermits: [
            {
              // Include mock values matching MechanismPermit type
              permitId: 'test-permit-id',
              systemMechanismId: 'test-id',
              // Include other necessary properties as needed
            },
          ] as unknown as MechanismPermit[],
          isDeleted: false,
        },
        key: 'test-key',
      };

      const systemMechanism: SystemMechanism = {
        systemMechanismId: 'test-id',
        name: 'test-name',
        description: 'test-description',
        mechanismPermits: [
          {
            permitId: 'test-permit-id',
            systemMechanismId: 'test-id',
            // Include other necessary properties as needed
          },
        ] as unknown as MechanismPermit[],
        isDeleted: false,
        createdAt: undefined,
        updatedAt: undefined,
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<SystemMechanism> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<SystemMechanism> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<SystemMechanism> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<SystemMechanism> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      };

      jest
        .spyOn(systemMechanismService, 'findHistoricalData')
        .mockResolvedValue([systemMechanism]);

      jest.mocked(decodeKafkaMessage).mockReturnValue(kafkaMessage);

      const produceSpy = jest
        .mocked(new EzKafkaProducer().produce)
        .mockResolvedValue();

      await systemMechanismKafkaService.getHistoryOfSystemMechanismEntityViaKafka();

      expect(produceSpy).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY_RESPONSE,
        expect.anything(),
      );
    });

    it('should handle an error scenario', async () => {
      const kafkaMessage = {
        traceId: 'test-trace-id',
        value: { mechanismId: 'test-id' },
        key: 'test-key',
      };

      jest
        .spyOn(systemMechanismService, 'findHistoricalData')
        .mockRejectedValue(new Error('test error'));
      jest.mocked(decodeKafkaMessage).mockReturnValue(kafkaMessage);
      const produceSpy = jest
        .mocked(new EzKafkaProducer().produce)
        .mockResolvedValue();

      await systemMechanismKafkaService.getHistoryOfSystemMechanismEntityViaKafka();

      expect(produceSpy).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY_RESPONSE,
        expect.anything(),
      );
    });
  });

  describe('getManySystemMechanismsViaKafka', () => {
    it('should be defined', () => {
      expect(systemMechanismKafkaService).toBeDefined();
    });

    it('should handle a valid message', async () => {
      const kafkaMessage = {
        traceId: 'test-trace-id',
        value: [
          {
            systemMechanismId: 'test-id',
            name: 'test-name',
            description: 'test-description',
            mechanismPermits: [
              {
                permitId: 'test-permit-id',
                systemMechanismId: 'test-id',
                // Include other necessary properties as needed
              },
            ] as unknown as MechanismPermit[],
            isDeleted: false,
            // Include other properties if necessary
          },
        ] as SystemMechanism[],
        key: 'test-key',
      };

      const systemMechanisms: SystemMechanism[] = [
        {
          systemMechanismId: 'test-id',
          name: 'test-name',
          description: 'test-description',
          mechanismPermits: [
            {
              permitId: 'test-permit-id',
              systemMechanismId: 'test-id',
              // Include other necessary properties as needed
            },
          ] as unknown as MechanismPermit[],
          isDeleted: false,
          createdAt: undefined,
          updatedAt: undefined,
          hasId: function (): boolean {
            throw new Error('Function not implemented.');
          },
          save: function (options?: SaveOptions): Promise<SystemMechanism> {
            throw new Error('Function not implemented.');
          },
          remove: function (options?: RemoveOptions): Promise<SystemMechanism> {
            throw new Error('Function not implemented.');
          },
          softRemove: function (
            options?: SaveOptions,
          ): Promise<SystemMechanism> {
            throw new Error('Function not implemented.');
          },
          recover: function (options?: SaveOptions): Promise<SystemMechanism> {
            throw new Error('Function not implemented.');
          },
          reload: function (): Promise<void> {
            throw new Error('Function not implemented.');
          },
        },
      ];

      jest
        .spyOn(systemMechanismService, 'getManySystemMechanisms')
        .mockResolvedValue(systemMechanisms);

      jest.mocked(decodeKafkaMessage).mockReturnValue(kafkaMessage);

      const produceSpy = jest
        .mocked(new EzKafkaProducer().produce)
        .mockResolvedValue();

      await systemMechanismKafkaService.getManySystemMechanismsViaKafka();

      expect(produceSpy).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY_RESPONSE,
        expect.anything(),
      );
    });

    it('should handle an error scenario', async () => {
      const kafkaMessage = {
        traceId: 'test-trace-id',
        value: {},
        key: 'test-key',
      };

      jest
        .spyOn(systemMechanismService, 'getManySystemMechanisms')
        .mockRejectedValue(new Error('test error'));
      jest.mocked(decodeKafkaMessage).mockReturnValue(kafkaMessage);
      const produceSpy = jest
        .mocked(new EzKafkaProducer().produce)
        .mockResolvedValue();

      await systemMechanismKafkaService.getManySystemMechanismsViaKafka();

      expect(produceSpy).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY_RESPONSE,
        expect.anything(),
      );
    });
  });
});
