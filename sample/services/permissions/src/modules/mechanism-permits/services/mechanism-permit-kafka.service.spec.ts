import { Test, TestingModule } from '@nestjs/testing';
import { MechanismPermitKafkaService } from './mechanism-permit-kafka.service';
import { MechanismPermitService } from './mechanism-permit.service';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { decodeKafkaMessage } from 'ez-utils';

jest.mock('ez-kafka-consumer');
jest.mock('ez-kafka-producer');

describe('MechanismPermitsKafkaService', () => {
  let mechanismPermitsKafkaService: MechanismPermitKafkaService;
  let mechanismPermitService: MechanismPermitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MechanismPermitKafkaService,
        {
          provide: MechanismPermitService,
          useValue: {
            findMechanismPermit: jest.fn(),
            findHistoricalData: jest.fn(),
            getMechanismPermitsForSystemMechanism: jest.fn(),
          },
        },
      ],
    }).compile();

    mechanismPermitsKafkaService = module.get<MechanismPermitKafkaService>(
      MechanismPermitKafkaService,
    );
    mechanismPermitService = module.get<MechanismPermitService>(
      MechanismPermitService,
    );
  });

  describe('getMechanismPermitsEntityViaKafka', () => {
    it('should be defined', () => {
      expect(mechanismPermitsKafkaService).toBeDefined();
    });

    it('should process Kafka message and retrieve permit entity', async () => {
      const traceId = 'trace-123';
      const kafkaMessage = {
        mechanismPermitId: 'permit-001',
        isDeleted: false,
      };
      const kafkaResponseKey = 'key-123';
      const mockResponse = { permitId: 'permit-001' };

      jest.spyOn(decodeKafkaMessage, 'decodeKafkaMessage').mockReturnValue({
        traceId,
        value: kafkaMessage,
        key: kafkaResponseKey,
      });
      mechanismPermitService.getMechanismPermitEntity.mockResolvedValue(
        mockResponse,
      );
      const produceSpy = jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(null);

      await mechanismPermitsKafkaService.getMechanismPermitEntity();

      expect(
        mechanismPermitService.getMechanismPermitEntity,
      ).toHaveBeenCalledWith(traceId, {
        permitId: kafkaMessage.mechanismPermitId,
        isDeleted: kafkaMessage.isDeleted,
      });
      expect(produceSpy).toHaveBeenCalled();
    });

    it('should handle errors and log them', async () => {
      const traceId = 'trace-123';
      const kafkaMessage = {
        mechanismPermitId: 'permit-001',
        isDeleted: false,
      };
      const kafkaResponseKey = 'key-123';
      const error = new Error('Something went wrong');

      jest.spyOn(decodeKafkaMessage, 'decodeKafkaMessage').mockReturnValue({
        traceId,
        value: kafkaMessage,
        key: kafkaResponseKey,
      });
      mechanismPermitService.getMechanismPermitEntity.mockRejectedValue(error);
      const produceSpy = jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(null);

      await mechanismPermitsKafkaService.getMechanismPermitEntity();

      expect(produceSpy).toHaveBeenCalled();
    });
  });

  describe('getHistoryOfMechanismPermitsEntityViaKafka', () => {
    it('should process Kafka message and retrieve historical data', async () => {
      const traceId = 'trace-456';
      const kafkaMessage = {
        mechanismPermitId: 'permit-001',
        isDeleted: false,
      };
      const kafkaResponseKey = 'key-456';
      const mockResponse = [{ permitId: 'permit-001' }];

      jest.spyOn(decodeKafkaMessage, 'decodeKafkaMessage').mockReturnValue({
        traceId,
        value: kafkaMessage,
        key: kafkaResponseKey,
      });
      mechanismPermitService.findHistoricalData.mockResolvedValue(mockResponse);
      const produceSpy = jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(null);

      await mechanismPermitsKafkaService.getHistoryOfMechanismPermitEntity();

      expect(mechanismPermitService.findHistoricalData).toHaveBeenCalledWith(
        kafkaMessage,
        traceId,
      );
      expect(produceSpy).toHaveBeenCalled();
    });

    it('should handle errors and log them', async () => {
      const traceId = 'trace-456';
      const kafkaMessage = {
        mechanismPermitId: 'permit-001',
        isDeleted: false,
      };
      const kafkaResponseKey = 'key-456';
      const error = new Error('Something went wrong');

      jest.spyOn(decodeKafkaMessage, 'decodeKafkaMessage').mockReturnValue({
        traceId,
        value: kafkaMessage,
        key: kafkaResponseKey,
      });
      mechanismPermitService.findHistoricalData.mockRejectedValue(error);
      const produceSpy = jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(null);

      await mechanismPermitsKafkaService.getHistoryOfMechanismPermitEntity();

      expect(produceSpy).toHaveBeenCalled();
    });
  });

  describe('getMechanismPermitsForOneSystemMechanismViaKafka', () => {
    it('should process Kafka message and retrieve permits for a given systemMechanismId', async () => {
      const traceId = 'trace-789';
      const kafkaMessage = { systemMechanismId: 'sys-001' };
      const kafkaResponseKey = 'key-789';
      const mockResponse = [{ permitId: 'permit-002' }];

      jest.spyOn(decodeKafkaMessage, 'decodeKafkaMessage').mockReturnValue({
        traceId,
        value: kafkaMessage,
        key: kafkaResponseKey,
      });
      mechanismPermitService.getMechanismPermitsForSystemMechanism.mockResolvedValue(
        mockResponse,
      );
      const produceSpy = jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(null);

      await mechanismPermitsKafkaService.getMechanismPermitForSystemMechanism();

      expect(
        mechanismPermitService.getMechanismPermitsForSystemMechanism,
      ).toHaveBeenCalledWith(kafkaMessage.systemMechanismId, traceId);
      expect(produceSpy).toHaveBeenCalled();
    });

    it('should handle errors and log them', async () => {
      const traceId = 'trace-789';
      const kafkaMessage = { systemMechanismId: 'sys-001' };
      const kafkaResponseKey = 'key-789';
      const error = new Error('Something went wrong');

      jest.spyOn(decodeKafkaMessage, 'decodeKafkaMessage').mockReturnValue({
        traceId,
        value: kafkaMessage,
        key: kafkaResponseKey,
      });
      mechanismPermitService.getMechanismPermitsForSystemMechanism.mockRejectedValue(
        error,
      );
      const produceSpy = jest
        .spyOn(EzKafkaProducer.prototype, 'produce')
        .mockResolvedValue(null);

      await mechanismPermitsKafkaService.getMechanismPermitForSystemMechanism();

      expect(produceSpy).toHaveBeenCalled();
    });
  });
});
