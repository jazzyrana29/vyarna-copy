import { Test, TestingModule } from '@nestjs/testing';
import { SystemMechanismController } from './system-mechanism.controller';
import {
  SystemMechanismDto,
  GetSystemMechanismDto,
  GetManySystemMechanismDto,
} from 'ez-utils';
import { SystemMechanismKafkaService } from './microservices/system-mechanism-kafka.service';
import { ResponseDTO } from '../../../dto/response.dto';

const mockMechanismId = '8ccd484f-da67-4d46-a37d-595c1e5986e0';

// Mock SystemMechanismKafkaService
class SystemMechanismKafkaServiceMock {
  async getSystemMechanismEntityViaKafka(
    getDto: GetSystemMechanismDto,
    traceId: string,
  ): Promise<SystemMechanismDto> {
    return {} as SystemMechanismDto; // Replace with mock data or assertions
  }

  async getHistorySystemMechanismEntityViaKafka(
    mechanismId: string,
    traceId: string,
  ): Promise<SystemMechanismDto[]> {
    return [{}] as SystemMechanismDto[]; // Replace with mock data or assertions
  }

  async getManySystemMechanismsViaKafka(
    traceId: string,
  ): Promise<GetManySystemMechanismDto> {
    return { systemMechanisms: [] } as unknown as GetManySystemMechanismDto; // Replace with mock data or assertions
  }
}

describe('SystemMechanismController', () => {
  let controller: SystemMechanismController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [SystemMechanismController],
      providers: [
        {
          provide: SystemMechanismKafkaService,
          useClass: SystemMechanismKafkaServiceMock,
        },
      ],
    }).compile();

    controller = module.get<SystemMechanismController>(
      SystemMechanismController,
    );
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a system mechanism', async () => {
    const getDto: GetSystemMechanismDto = {
      name: 'updated-test',
      isDeleted: false,
      systemMechanismId: '',
    }; // Add your get DTO mock data
    const result = await controller.getSystemMechanismEntity(getDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get history of a system mechanism', async () => {
    const result = await controller.getHistorySystemMechanismEntity({
      isDeleted: false,
      name: '',
      systemMechanismId: mockMechanismId,
    });
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get many system mechanisms', async () => {
    const result = await controller.getManySystemMechanisms({
      isDeleted: false,
    });
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
    expect(result.data).toBeInstanceOf(Array);
  });
});
