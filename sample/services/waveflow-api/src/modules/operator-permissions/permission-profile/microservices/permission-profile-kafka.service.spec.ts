import { Test, TestingModule } from '@nestjs/testing';
import {
  KT_POPULATE_PERMISSION_PROFILE_ENTITY,
  PopulatePermissionProfileDto,
} from 'ez-utils';
import { PermissionProfileKafkaService } from './permission-profile-kafka.service';
import {
  CreatePermissionProfileDto,
  UpdatePermissionProfileDto,
  GetPermissionProfileDto,
} from 'ez-utils';
import { v4 as uuidv4 } from 'uuid';

describe('PermissionProfileKafkaService', () => {
  let service: PermissionProfileKafkaService;
  let mockkafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionProfileKafkaService, KafkaMessageResponderService],
    }).compile();

    service = module.get<PermissionProfileKafkaService>(
      PermissionProfileKafkaService,
    );
    mockkafkaResponder = module.get<KafkaMessageResponderService>();
  });

  describe('createPermissionProfileEntityViaKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const createPermissionProfileDto = new CreatePermissionProfileDto();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await service.createPermissionProfileEntity(
        createPermissionProfileDto,
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileKafkaService.name,
        'KT_CREATE_PERMISSION_PROFILE_ENTITY',
        'KT_CREATE_PERMISSION_PROFILE_ENTITY_RESPONSE',
        createPermissionProfileDto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });

  describe('updatePermissionProfileEntityViaKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const updatePermissionProfileDto = new UpdatePermissionProfileDto();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await service.updatePermissionProfileEntity(
        updatePermissionProfileDto,
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileKafkaService.name,
        'KT_UPDATE_PERMISSION_PROFILE_ENTITY',
        'KT_UPDATE_PERMISSION_PROFILE_ENTITY_RESPONSE',
        updatePermissionProfileDto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });

  describe('getPermissionProfileEntityWithKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const getPermissionProfileDto = new GetPermissionProfileDto();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await service.getPermissionProfileEntity(
        getPermissionProfileDto,
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileKafkaService.name,
        'KT_GET_PERMISSION_PROFILE_ENTITY',
        'KT_GET_PERMISSION_PROFILE_ENTITY_RESPONSE',
        getPermissionProfileDto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });

  describe('getHistoryOfPermissionProfileEntityViaKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const permissionProfileId = uuidv4();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await service.getHistoryOfPermissionProfileEntity(
        {
          permissionProfileId,
        },
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileKafkaService.name,
        'KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY',
        'KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY_RESPONSE',
        { permissionProfileId },
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });

  describe('deletePermissionProfileEntityViaKafka', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const permissionProfileId = uuidv4();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await service.deletePermissionProfileEntity(
        { permissionProfileId },
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileKafkaService.name,
        'KT_DELETE_PERMISSION_PROFILE_ENTITY',
        'KT_DELETE_PERMISSION_PROFILE_ENTITY_RESPONSE',
        { permissionProfileId },
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });

  describe('populatePermissionProfileEntity', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const populatePermissionProfileDto = new PopulatePermissionProfileDto();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await service.populatePermissionProfileEntity(
        populatePermissionProfileDto,
        traceId,
      );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileKafkaService.name,
        KT_POPULATE_PERMISSION_PROFILE_ENTITY,
        populatePermissionProfileDto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });
});
