import { Test, TestingModule } from '@nestjs/testing';

import { CreateBusinessUnitDto, KafkaMessageResponderService } from 'ez-utils';
import { BusinessUnitKafkaService } from '../../../../modules/operators/business-unit/microservices/business-unit-kafka.service';

describe('BusinessUnitKafkaService', () => {
  let service: BusinessUnitKafkaService;
  let mockkafkaResponder: KafkaMessageResponderService; // Use the actual class

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessUnitKafkaService,
        // Provide the actual class
      ],
    }).compile();

    service = module.get<BusinessUnitKafkaService>(BusinessUnitKafkaService);
    mockkafkaResponder = module.get<KafkaMessageResponderService>(); // Get the actual instance
  });

  describe('createBusinessUnitEntityViaKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const dto = new CreateBusinessUnitDto();
      const traceId = 'some-trace-id';
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await mockkafkaResponder.sendMessageAndWaitForResponse(
        BusinessUnitKafkaService.name,
        'KT_CREATE_BUSINESS_UNIT_ENTITY',
        dto,
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        BusinessUnitKafkaService.name,
        'KT_CREATE_BUSINESS_UNIT_ENTITY',
        'KT_CREATE_BUSINESS_UNIT_ENTITY_RESPONSE',
        dto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });
});
