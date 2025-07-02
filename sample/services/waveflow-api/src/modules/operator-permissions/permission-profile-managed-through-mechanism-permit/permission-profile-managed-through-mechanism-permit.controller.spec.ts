import { Test, TestingModule } from '@nestjs/testing';
import { PermissionProfileManagedThroughMechanismPermitController } from './permission-profile-managed-through-mechanism-permit.controller';
import { PermissionProfileManagedThroughMechanismPermitKafkaService } from './microservices/permission-profile-managed-through-mechanism-permit-kafka.service';
import { ResponseDTO } from '../../../dto/response.dto';
import { v4 as uuidv4 } from 'uuid';
import { HttpStatus } from '@nestjs/common';
import {
  PermissionProfileDto,
  MechanismPermitDto,
  PermissionProfileManagedThroughMechanismPermitDto,
} from 'ez-utils';

// Mock PermissionProfileManagedThroughMechanismPermitKafkaService
class PermissionProfileManagedThroughMechanismPermitKafkaServiceMock {
  async createPermissionProfileManagedThroughMechanismPermitEntityViaKafka(
    createDto: PermissionProfileManagedThroughMechanismPermitDto,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermitDto> {
    return {} as PermissionProfileManagedThroughMechanismPermitDto; // Replace with mock data or assertions
  }

  async updatePermissionProfileManagedThroughMechanismPermitEntityViaKafka(
    updateDto: PermissionProfileManagedThroughMechanismPermitDto,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermitDto> {
    return {} as PermissionProfileManagedThroughMechanismPermitDto; // Replace with mock data or assertions
  }

  async getPermissionProfileManagedThroughMechanismPermitEntityWithKafka(
    getDto: PermissionProfileManagedThroughMechanismPermitDto,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermitDto> {
    return {} as PermissionProfileManagedThroughMechanismPermitDto; // Replace with mock data or assertions
  }

  async getHistoryOfPermissionProfileManagedThroughMechanismPermitEntityViaKafka(
    mechanismPermitId: string,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermitDto[]> {
    return [{}] as PermissionProfileManagedThroughMechanismPermitDto[]; // Replace with mock data or assertions
  }

  async deletePermissionProfileManagedThroughMechanismPermitEntityViaKafka(
    mechanismPermitId: string,
    traceId: string,
  ): Promise<void> {
    return; // Replace with mock data or assertions
  }
}

describe('PermissionProfileManagedThroughMechanismPermitController', () => {
  let controller: PermissionProfileManagedThroughMechanismPermitController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [PermissionProfileManagedThroughMechanismPermitController],
      providers: [
        {
          provide: PermissionProfileManagedThroughMechanismPermitKafkaService,
          useClass:
            PermissionProfileManagedThroughMechanismPermitKafkaServiceMock,
        },
      ],
    }).compile();

    controller =
      module.get<PermissionProfileManagedThroughMechanismPermitController>(
        PermissionProfileManagedThroughMechanismPermitController,
      );
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a permission profile managed through mechanism permit entity', async () => {
    const createDto: PermissionProfileManagedThroughMechanismPermitDto = {
      mechanismPermitId: uuidv4(),
      permissionProfileId: uuidv4(),
      isPermitted: true,
      mechanismPermit: new MechanismPermitDto(),
      permissionProfile: new PermissionProfileDto(),
    };
    const result =
      await controller.createPermissionProfileManagedThroughMechanismPermitEntity(
        createDto,
      );
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(HttpStatus.OK);
  });

  it('should update a permission profile managed through mechanism permit entity', async () => {
    const updateDto: PermissionProfileManagedThroughMechanismPermitDto = {
      mechanismPermitId: uuidv4(),
      permissionProfileId: uuidv4(),
      isPermitted: false,
      mechanismPermit: new MechanismPermitDto(),
      permissionProfile: new PermissionProfileDto(),
    };
    const result =
      await controller.updatePermissionProfileManagedThroughMechanismPermitEntity(
        updateDto,
      );
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(HttpStatus.OK);
  });

  it('should get a permission profile managed through mechanism permit entity', async () => {
    const getDto: PermissionProfileManagedThroughMechanismPermitDto = {
      mechanismPermitId: uuidv4(),
      permissionProfileId: '',
      isPermitted: true,
      mechanismPermit: new MechanismPermitDto(),
      permissionProfile: new PermissionProfileDto(),
    };
    const result =
      await controller.getPermissionProfileManagedThroughMechanismPermitEntity(
        getDto,
      );
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(HttpStatus.OK);
  });

  it('should get history of a permission profile managed through mechanism permit entity', async () => {
    const mechanismPermitId = uuidv4();
    const permissionProfileId = uuidv4();
    const result =
      await controller.getHistoryOfPermissionProfileManagedThroughMechanismPermitEntity(
        {
          mechanismPermitId,
          permissionProfileId,
        },
      );
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(HttpStatus.OK);
  });

  it('should delete a permission profile managed through mechanism permit entity', async () => {
    const mechanismPermitId = uuidv4();
    const permissionProfileId = uuidv4();
    const result =
      await controller.deletePermissionProfileManagedThroughMechanismPermitEntity(
        {
          mechanismPermitId,
          permissionProfileId,
          mechanismPermit: new MechanismPermitDto(),
          permissionProfile: new PermissionProfileDto(),
          isPermitted: false,
        },
      );
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(HttpStatus.OK);
  });
});
