// operator.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUnitController } from './business-unit.controller';

import { BusinessUnitKafkaService } from './microservices/business-unit-kafka.service';
import { ResponseDTO } from '../../../dto/response.dto';
import {
  BusinessUnitDto,
  CreateBusinessUnitDto,
  GetBusinessUnitDto,
  UpdateBusinessUnitDto,
} from 'ez-utils';

const mockBusinessUnitId = '8ccd484f-da67-4d46-a37d-595c1e5986e0';

// Mock BusinessUnitKafkaService
class BusinessUnitKafkaServiceMock {
  async createBusinessUnitEntityViaKafka(
    createDto: CreateBusinessUnitDto,
    traceId: string,
  ): Promise<BusinessUnitDto> {
    return {} as BusinessUnitDto; // Replace with mock data or assertions
  }

  async updateBusinessUnitEntityViaKafka(
    updateDto: UpdateBusinessUnitDto,
    traceId: string,
  ): Promise<BusinessUnitDto> {
    return {} as BusinessUnitDto; // Replace with mock data or assertions
  }

  async getBusinessUnitEntityViaKafka(
    getDto: GetBusinessUnitDto,
    traceId: string,
  ): Promise<BusinessUnitDto> {
    return {} as BusinessUnitDto; // Replace with mock data or assertions
  }

  async getHistoryBusinessUnitEntityViaKafka(
    businessUnitId: string,
    traceId: string,
  ): Promise<BusinessUnitDto[]> {
    return [{}] as BusinessUnitDto[]; // Replace with mock data or assertions
  }
}

describe('BusinessUnitController', () => {
  let controller: BusinessUnitController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [BusinessUnitController],
      providers: [
        {
          provide: BusinessUnitKafkaService,
          useClass: BusinessUnitKafkaServiceMock,
        },
      ],
    }).compile();

    controller = module.get<BusinessUnitController>(BusinessUnitController);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a business unit', async () => {
    const createDto: CreateBusinessUnitDto = {
      name: 'test',
      updatedBy: 'test-user',
    }; // Add your creation DTO mock data
    const result = await controller.createBusinessUnitEntity(createDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should update a business unit', async () => {
    const updateDto: UpdateBusinessUnitDto = {
      name: 'updated-test',
      updatedBy: 'test-updated-user',
      businessUnitId: mockBusinessUnitId,
      isDeleted: false,
    }; // Add your update DTO mock data
    const result = await controller.updateBusinessUnitEntity(updateDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get a business unit', async () => {
    const getDto: GetBusinessUnitDto = {
      name: 'updated-test',
      isDeleted: false,
      businessUnitId: '',
    }; // Add your get DTO mock data
    const result = await controller.getBusinessUnitEntity(getDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get history of a business unit', async () => {
    const result = await controller.getHistoryBusinessUnitEntity({
      businessUnitId: mockBusinessUnitId,
    });
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });
});
