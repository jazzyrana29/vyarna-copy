import { Test, TestingModule } from '@nestjs/testing';
import { GetSystemMechanismDto } from 'ez-utils';
import { SystemMechanismKafkaService } from '../../../../modules/operator-permissions/system-mechanism/microservices/system-mechanism-kafka.service';

describe('SystemMechanismKafkaService', () => {
  let service: SystemMechanismKafkaService;
  let mockkafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemMechanismKafkaService, KafkaMessageResponderService],
    }).compile();

    service = module.get<SystemMechanismKafkaService>(
      SystemMechanismKafkaService,
    );
    mockkafkaResponder = module.get<KafkaMessageResponderService>();
  });

  describe('getSystemMechanismEntityViaKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const dto = new GetSystemMechanismDto();
      const traceId = 'some-trace-id';
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await mockkafkaResponder.sendMessageAndWaitForResponse(
        SystemMechanismKafkaService.name,
        'KT_GET_SYSTEM_MECHANISM_ENTITY',
        dto,
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        SystemMechanismKafkaService.name,
        'KT_GET_SYSTEM_MECHANISM_ENTITY',
        'KT_GET_SYSTEM_MECHANISM_ENTITY_RESPONSE',
        dto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });

  describe('getManySystemMechanismsViaKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const traceId = 'some-trace-id';
      const getManySystemMechanismDto = {
        isDeleted: false,
      };
      const expectedResponse = { systemMechanisms: [] };

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await service.getManySystemMechanisms(
        getManySystemMechanismDto,
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        SystemMechanismKafkaService.name,
        'KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY',
        getManySystemMechanismDto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });
});
