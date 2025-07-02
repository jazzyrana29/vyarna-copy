import { MechanismPermitKafkaService } from '../../../../modules/operator-permissions/mechanism-permit/microservices/mechanism-permit-kafka.service';
import { Test, TestingModule } from '@nestjs/testing';
import { GetMechanismPermitDto } from 'ez-utils';

describe('MechanismPermitsKafkaService', () => {
  let service: MechanismPermitKafkaService;
  let mockkafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MechanismPermitKafkaService, KafkaMessageResponderService],
    }).compile();

    service = module.get<MechanismPermitKafkaService>(
      MechanismPermitKafkaService,
    );
    mockkafkaResponder = module.get<KafkaMessageResponderService>();
  });

  describe('getMechanismPermitEntityViaKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const dto = new GetMechanismPermitDto();
      const traceId = 'some-trace-id';
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await mockkafkaResponder.sendMessageAndWaitForResponse(
        MechanismPermitKafkaService.name,
        'KT_GET_MECHANISM_PERMIT_ENTITY',
        dto,
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        MechanismPermitKafkaService.name,
        'KT_GET_MECHANISM_PERMIT_ENTITY',
        'KT_GET_MECHANISM_PERMIT_ENTITY_RESPONSE',
        dto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });
});
