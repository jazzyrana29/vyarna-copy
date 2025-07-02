import { Test, TestingModule } from '@nestjs/testing';
import { PermissionProfileController } from './permission-profile.controller';
import { PermissionProfileKafkaService } from './microservices/permission-profile-kafka.service';
import { ResponseDTO } from '../../../dto/response.dto';
import {
  CreatePermissionProfileDto,
  UpdatePermissionProfileDto,
  GetPermissionProfileDto,
  PermissionProfileDto,
} from 'ez-utils';
import { v4 as uuidv4 } from 'uuid';
import { HttpStatus } from '@nestjs/common';

// Mock PermissionProfileKafkaService
class PermissionProfileKafkaServiceMock {
  async createPermissionProfileEntityViaKafka(
    createDto: CreatePermissionProfileDto,
    traceId: string,
  ): Promise<PermissionProfileDto> {
    return {} as PermissionProfileDto; // Replace with mock data or assertions
  }

  async updatePermissionProfileEntityViaKafka(
    updateDto: UpdatePermissionProfileDto,
    traceId: string,
  ): Promise<PermissionProfileDto> {
    return {} as PermissionProfileDto; // Replace with mock data or assertions
  }

  async getPermissionProfileEntityWithKafka(
    getDto: GetPermissionProfileDto,
    traceId: string,
  ): Promise<PermissionProfileDto> {
    return {} as PermissionProfileDto; // Replace with mock data or assertions
  }

  async getHistoryOfPermissionProfileEntityViaKafka(
    permissionProfileId: string,
    traceId: string,
  ): Promise<PermissionProfileDto[]> {
    return [{}] as PermissionProfileDto[]; // Replace with mock data or assertions
  }

  async deletePermissionProfileEntityViaKafka(
    permissionProfileId: string,
    traceId: string,
  ): Promise<void> {
    return; // Replace with mock data or assertions
  }
}

describe('PermissionProfileController', () => {
  let controller: PermissionProfileController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [PermissionProfileController],
      providers: [
        {
          provide: PermissionProfileKafkaService,
          useClass: PermissionProfileKafkaServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PermissionProfileController>(
      PermissionProfileController,
    );
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a permission profile entity', async () => {
    const createDto: CreatePermissionProfileDto = {
      name: '',
      description: '',
      businessUnitId: '',
    };
    const result = await controller.createPermissionProfileEntity(createDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(HttpStatus.OK);
  });

  it('should update a permission profile entity', async () => {
    const updateDto: UpdatePermissionProfileDto = {
      permissionProfileId: uuidv4(),
      name: '',
      isDeleted: false,
      description: '',
      businessUnitId: '',
    };
    const result = await controller.updatePermissionProfileEntity(updateDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(HttpStatus.OK);
  });

  it('should get a permission profile entity', async () => {
    const getDto: GetPermissionProfileDto = {
      permissionProfileId: uuidv4(),
      name: '',
      isDeleted: false,
    };
    const result = await controller.getPermissionProfileEntity(getDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(HttpStatus.OK);
  });

  it('should get history of a permission profile entity', async () => {
    const permissionProfileId = uuidv4();
    const result = await controller.getHistoryOfPermissionProfileEntity({
      permissionProfileId,
    });
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(HttpStatus.OK);
  });

  it('should delete a permission profile entity', async () => {
    const permissionProfileId = uuidv4();
    const result = await controller.deletePermissionProfileEntity({
      permissionProfileId,
    });
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(HttpStatus.OK);
  });
});
