import { Test, TestingModule } from '@nestjs/testing';
import { MechanismPermitDto, PermissionProfileDto } from 'ez-utils';
import { PermissionProfileManagedThroughMechanismPermitKafkaService } from './permission-profile-managed-through-mechanism-permit-kafka.service';
import { PermissionProfileManagedThroughMechanismPermitDto } from 'ez-utils';
import { v4 as uuidv4 } from 'uuid';

describe('PermissionProfileManagedThroughMechanismPermitKafkaService', () => {
  let service: PermissionProfileManagedThroughMechanismPermitKafkaService;
  let mockkafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionProfileManagedThroughMechanismPermitKafkaService],
    }).compile();

    service =
      module.get<PermissionProfileManagedThroughMechanismPermitKafkaService>(
        PermissionProfileManagedThroughMechanismPermitKafkaService,
      );
    mockkafkaResponder = module.get<KafkaMessageResponderService>();
  });

  describe('createPermissionProfileManagedThroughMechanismPermitEntity', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const dto = new PermissionProfileManagedThroughMechanismPermitDto();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response =
        await service.createPermissionProfileManagedThroughMechanismPermitEntity(
          dto,
          traceId,
        );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileManagedThroughMechanismPermitKafkaService.name,
        'KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY',
        'KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE',
        expect.objectContaining(dto),
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });

  describe('updatePermissionProfileManagedThroughMechanismPermitEntity', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const dto = new PermissionProfileManagedThroughMechanismPermitDto();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response =
        await service.updatePermissionProfileManagedThroughMechanismPermitEntity(
          dto,
          traceId,
        );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileManagedThroughMechanismPermitKafkaService.name,
        'KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY',
        'KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE',
        dto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });

  describe('getPermissionProfileManagedThroughMechanismPermitEntity', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const dto = new PermissionProfileManagedThroughMechanismPermitDto();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response =
        await service.getPermissionProfileManagedThroughMechanismPermitEntity(
          dto,
          traceId,
        );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileManagedThroughMechanismPermitKafkaService.name,
        'KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY',
        'KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE',
        dto,
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });

  describe('getHistoryOfPermissionProfileManagedThroughMechanismPermitEntity', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const mechanismPermitId = uuidv4();
      const permissionProfileId = uuidv4();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response =
        await service.getHistoryOfPermissionProfileManagedThroughMechanismPermitEntity(
          {
            mechanismPermitId,
            permissionProfileId,
          },
          traceId,
        );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileManagedThroughMechanismPermitKafkaService.name,
        'KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY',
        'KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE',
        { mechanismPermitId },
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });

  describe('deletePermissionProfileManagedThroughMechanismPermitEntity', () => {
    it('calls sendMessageAndWaitForResponse with correct parameters', async () => {
      const mechanismPermitId = uuidv4();
      const permissionProfileId = uuidv4();
      const traceId = uuidv4();
      const expectedResponse = 'success';

      jest
        .spyOn(mockkafkaResponder, 'sendMessageAndWaitForResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response =
        await service.deletePermissionProfileManagedThroughMechanismPermitEntity(
          {
            mechanismPermitId,
            permissionProfileId,
            mechanismPermit: new MechanismPermitDto(),
            permissionProfile: new PermissionProfileDto(),
            isPermitted: false,
          },
          traceId,
        );

      expect(
        mockkafkaResponder.sendMessageAndWaitForResponse,
      ).toHaveBeenCalledWith(
        PermissionProfileManagedThroughMechanismPermitKafkaService.name,
        'KT_DELETE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY',
        'KT_DELETE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY_RESPONSE',
        { mechanismPermitId },
        traceId,
      );
      expect(response).toBe(expectedResponse);
    });
  });
});
