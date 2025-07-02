import { Test, TestingModule } from '@nestjs/testing';
import { CreateOperatorSessionDto } from 'ez-utils';
import { OperatorSessionKafkaService } from '../../../../modules/operators/operator-session/microservices/operator-session-kafka.service';

describe('OperatorSessionKafkaService', () => {
  let service: OperatorSessionKafkaService;
  let mockkafkaResponder: KafkaMessageResponderService; // Use the actual class

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorSessionKafkaService,
        // Provide the actual class
      ],
    }).compile();

    service = module.get<OperatorSessionKafkaService>(
      OperatorSessionKafkaService,
    );
    mockkafkaResponder = module.get<KafkaMessageResponderService>(); // Get the actual instance
  });

  describe('createOperatorSessionEntityViaKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const dto = new CreateOperatorSessionDto();
      const traceId = 'some-trace-id';
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await mockkafkaResponder.sendMessageAndWaitForResponse(
        OperatorSessionKafkaService.name,
        'KT_CREATE_OPERATOR_SESSION_ENTITY',
        dto,
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        OperatorSessionKafkaService.name,
        'KT_CREATE_OPERATOR_SESSION_ENTITY',
        'KT_CREATE_OPERATOR_SESSION_ENTITY_RESPONSE',
        dto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });
});
