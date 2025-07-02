import { Test, TestingModule } from '@nestjs/testing';
import { CreateDeviceSessionDto } from 'ez-utils';
import { DeviceSessionKafkaService } from '../../../../modules/operators/device-session/microservices/device-session-kafka.service';

describe('DeviceSessionKafkaService', () => {
  let service: DeviceSessionKafkaService;
  let mockkafkaResponder: KafkaMessageResponderService; // Use the actual class

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceSessionKafkaService,
        // Provide the actual class
      ],
    }).compile();

    service = module.get<DeviceSessionKafkaService>(DeviceSessionKafkaService);
    mockkafkaResponder = module.get<KafkaMessageResponderService>(); // Get the actual instance
  });

  describe('createDeviceSessionEntityViaKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const dto = new CreateDeviceSessionDto();
      const traceId = 'some-trace-id';
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await mockkafkaResponder.sendMessageAndWaitForResponse(
        DeviceSessionKafkaService.name,
        'KT_CREATE_DEVICE_SESSION_ENTITY',
        dto,
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        DeviceSessionKafkaService.name,
        'KT_CREATE_DEVICE_SESSION_ENTITY',
        'KT_CREATE_DEVICE_SESSION_ENTITY_RESPONSE',
        dto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });
});
