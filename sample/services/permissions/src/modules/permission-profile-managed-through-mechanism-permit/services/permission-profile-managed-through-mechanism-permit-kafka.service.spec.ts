import { Test, TestingModule } from '@nestjs/testing';
import { PermissionProfileManagedThroughMechanismPermitKafkaService } from './permission-profile-managed-through-mechanism-permit-kafka.service';
import { PermissionProfileManagedThroughMechanismPermitService } from './permission-profile-managed-through-mechanism-permit.service';
import { ZtrackingPermissionProfileManagedThroughMechanismPermitService } from './ztracking-permission-profile-managed-through-mechanism-permit.service';
import { EzKafkaConsumer } from 'ez-kafka-consumer';
import { EzKafkaProducer } from 'ez-kafka-producer';
import {
  KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
  KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
  KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
  KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
} from 'ez-utils';
import { PermissionProfile } from '../../../entities/permission-profile.entity';
import { MechanismPermit } from '../../../entities/mechanism-permit.entity';

jest.mock('ez-kafka-consumer');
jest.mock('ez-kafka-producer');

describe('PermissionProfileManagedThroughMechanismPermitKafkaService', () => {
  let kafkaService: PermissionProfileManagedThroughMechanismPermitKafkaService;
  let permissionProfileManagedService: PermissionProfileManagedThroughMechanismPermitService;
  let ztrackingService: ZtrackingPermissionProfileManagedThroughMechanismPermitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionProfileManagedThroughMechanismPermitKafkaService,
        {
          provide: PermissionProfileManagedThroughMechanismPermitService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide:
            ZtrackingPermissionProfileManagedThroughMechanismPermitService,
          useValue: {
            findZtrackingEntities: jest.fn(),
          },
        },
      ],
    }).compile();

    kafkaService =
      module.get<PermissionProfileManagedThroughMechanismPermitKafkaService>(
        PermissionProfileManagedThroughMechanismPermitKafkaService,
      );
    permissionProfileManagedService =
      module.get<PermissionProfileManagedThroughMechanismPermitService>(
        PermissionProfileManagedThroughMechanismPermitService,
      );
    ztrackingService =
      module.get<ZtrackingPermissionProfileManagedThroughMechanismPermitService>(
        ZtrackingPermissionProfileManagedThroughMechanismPermitService,
      );
  });

  describe('createEntityViaKafka', () => {
    it('should be defined', () => {
      expect(kafkaService).toBeDefined();
    });

    it('should call PermissionProfileManagedThroughMechanismPermitService.create and produce a Kafka message on success', async () => {
      const mockMessage = {
        value: Buffer.from('test'),
        key: Buffer.from('key-id'),
        timestamp: Date.now().toString(),
        attributes: 0,
        offset: '0',
        headers: {},
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(
          async ({ onMessage }) => await onMessage(mockMessage),
        );
      jest
        .spyOn(
          permissionProfileManagedService,
          'createPermissionProfileManagedThroughMechanismPermit',
        )
        .mockResolvedValue({
          mechanismPermitId: 'mock-id',
          permissionProfileId: 'mock-id',
          mechanismPermit: {} as MechanismPermit,
          permissionProfile: {} as PermissionProfile,
          isPermitted: false,
        });
      jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(undefined);

      await kafkaService.createPermissionProfileManagedThroughMechanismPermitEntityViaKafka();

      expect(
        permissionProfileManagedService.createPermissionProfileManagedThroughMechanismPermit,
      ).toHaveBeenCalled();
      expect(EzKafkaProducer.prototype.produce).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
        expect.any(String),
      );
    });

    it('should handle exceptions and produce a Kafka message with error status', async () => {
      const mockMessage = {
        value: Buffer.from('test'),
        key: Buffer.from('key-id'),
        timestamp: Date.now().toString(),
        attributes: 0,
        offset: '0',
        headers: {},
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(
          async ({ onMessage }) => await onMessage(mockMessage),
        );
      jest
        .spyOn(
          permissionProfileManagedService,
          'createPermissionProfileManagedThroughMechanismPermit',
        )
        .mockRejectedValue(new Error('Error'));
      jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(undefined);

      await kafkaService.createPermissionProfileManagedThroughMechanismPermitEntityViaKafka();

      expect(
        permissionProfileManagedService.createPermissionProfileManagedThroughMechanismPermit,
      ).toHaveBeenCalled();
      expect(EzKafkaProducer.prototype.produce).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
        expect.stringContaining('"kafkaResponseStatus":false'),
      );
    });
  });

  describe('updateEntityViaKafka', () => {
    it('should call PermissionProfileManagedThroughMechanismPermitService.update and produce a Kafka message on success', async () => {
      const mockMessage = {
        value: Buffer.from('test'),
        key: Buffer.from('key-id'),
        timestamp: Date.now().toString(),
        attributes: 0,
        offset: '0',
        headers: {},
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(async ({ onMessage }) => {
          await onMessage(mockMessage);
        });
      jest
        .spyOn(
          permissionProfileManagedService,
          'updatePermissionProfileManagedThroughMechanismPermit',
        )
        .mockResolvedValue({
          mechanismPermitId: 'mock-id',
          permissionProfileId: 'mock-id',
          mechanismPermit: {} as MechanismPermit,
          permissionProfile: {} as PermissionProfile,
          isPermitted: false,
        });
      jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(undefined);

      await kafkaService.updatePermissionProfileManagedThroughMechanismPermitEntityViaKafka();

      expect(
        permissionProfileManagedService.updatePermissionProfileManagedThroughMechanismPermit,
      ).toHaveBeenCalled();
      expect(EzKafkaProducer.prototype.produce).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
        expect.any(String),
      );
    });

    it('should handle exceptions and produce a Kafka message with error status', async () => {
      const mockMessage = {
        value: Buffer.from('test'),
        key: Buffer.from('key-id'),
        timestamp: Date.now().toString(),
        attributes: 0,
        offset: '0',
        headers: {},
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(async ({ onMessage }) => {
          await onMessage(mockMessage);
        });
      jest
        .spyOn(
          permissionProfileManagedService,
          'updatePermissionProfileManagedThroughMechanismPermit',
        )
        .mockRejectedValue(new Error('Error'));
      jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(undefined);

      await kafkaService.updatePermissionProfileManagedThroughMechanismPermitEntityViaKafka();

      expect(
        permissionProfileManagedService.updatePermissionProfileManagedThroughMechanismPermit,
      ).toHaveBeenCalled();
      expect(EzKafkaProducer.prototype.produce).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
        expect.stringContaining('"kafkaResponseStatus":false'),
      );
    });
  });

  describe('getEntityViaKafka', () => {
    it('should call PermissionProfileManagedThroughMechanismPermitService.findOne and produce a Kafka message on success', async () => {
      const mockMessage = {
        value: Buffer.from('test'),
        key: Buffer.from('key-id'),
        timestamp: Date.now().toString(),
        attributes: 0,
        offset: '0',
        headers: {},
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(async ({ onMessage }) => {
          await onMessage(mockMessage);
        });
      jest
        .spyOn(
          permissionProfileManagedService,
          'findPermissionProfileManagedThroughMechanismPermit',
        )
        .mockResolvedValue({
          mechanismPermitId: 'mock-id',
          permissionProfileId: 'mock-id',
          mechanismPermit: {} as MechanismPermit,
          permissionProfile: {} as PermissionProfile,
          isPermitted: false,
        });
      jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(undefined);

      await kafkaService.getPermissionProfileManagedThroughMechanismPermitEntityViaKafka();

      expect(
        permissionProfileManagedService.findPermissionProfileManagedThroughMechanismPermit,
      ).toHaveBeenCalled();
      expect(EzKafkaProducer.prototype.produce).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
        expect.any(String),
      );
    });

    it('should handle exceptions and produce a Kafka message with error status', async () => {
      const mockMessage = {
        value: Buffer.from('test'),
        key: Buffer.from('key-id'),
        timestamp: Date.now().toString(),
        attributes: 0,
        offset: '0',
        headers: {},
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(async ({ onMessage }) => {
          await onMessage(mockMessage);
        });
      jest
        .spyOn(
          permissionProfileManagedService,
          'findPermissionProfileManagedThroughMechanismPermit',
        )
        .mockRejectedValue(new Error('Error'));
      jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(undefined);

      await kafkaService.getPermissionProfileManagedThroughMechanismPermitEntityViaKafka();

      expect(
        permissionProfileManagedService.findPermissionProfileManagedThroughMechanismPermit,
      ).toHaveBeenCalled();
      expect(EzKafkaProducer.prototype.produce).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
        expect.stringContaining('"kafkaResponseStatus":false'),
      );
    });
  });

  describe('getHistoryOfEntityViaKafka', () => {
    it('should call ZtrackingPermissionProfileManagedThroughMechanismPermitService.findZtrackingEntities and produce a Kafka message on success', async () => {
      const mockMessage = {
        value: Buffer.from('test'),
        key: Buffer.from('key-id'),
        timestamp: Date.now().toString(),
        attributes: 0,
        offset: '0',
        headers: {},
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(
          async ({ onMessage }) => await onMessage(mockMessage),
        );
      jest
        .spyOn(
          ztrackingService,
          'findZtrackingPermissionProfileManagedThroughMechanismPermitEntities',
        )
        .mockResolvedValue([
          {
            ztrackingVersion: 1,
            mechanismPermitId: 'mock-id',
            permissionProfileId: 'mock-id',
            isPermitted: false,
            versionDate: new Date(),
          },
        ]);
      jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(undefined);

      await kafkaService.getHistoryOfPermissionProfileManagedThroughMechanismPermitEntityViaKafka();

      expect(
        ztrackingService.findZtrackingPermissionProfileManagedThroughMechanismPermitEntities,
      ).toHaveBeenCalled();
      expect(EzKafkaProducer.prototype.produce).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
        expect.any(String),
      );
    });

    it('should handle exceptions and produce a Kafka message with error status', async () => {
      const mockMessage = {
        value: Buffer.from('test'),
        key: Buffer.from('key-id'),
        timestamp: Date.now().toString(),
        attributes: 0,
        offset: '0',
        headers: {},
      };
      jest
        .spyOn(EzKafkaConsumer.prototype, 'consume')
        .mockImplementation(
          async ({ onMessage }) => await onMessage(mockMessage),
        );
      jest
        .spyOn(
          ztrackingService,
          'findZtrackingPermissionProfileManagedThroughMechanismPermitEntities',
        )
        .mockRejectedValue(new Error('Error'));
      jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(undefined);

      await kafkaService.getHistoryOfPermissionProfileManagedThroughMechanismPermitEntityViaKafka();

      expect(
        ztrackingService.findZtrackingPermissionProfileManagedThroughMechanismPermitEntities,
      ).toHaveBeenCalled();
      expect(EzKafkaProducer.prototype.produce).toHaveBeenCalledWith(
        process.env.KAFKA_BROKER,
        KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE,
        expect.stringContaining('"kafkaResponseStatus":false'),
      );
    });
  });
});
