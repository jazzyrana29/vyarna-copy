import { Test, TestingModule } from '@nestjs/testing';
import { GetMechanismPermitDto, MechanismPermitDto } from 'ez-utils';
import { ResponseDTO } from '../../../dto/response.dto';
import { MechanismPermitController } from './mechanism-permit.controller';
import { MechanismPermitKafkaService } from './microservices/mechanism-permit-kafka.service';

const mockMechanismPermitId = '8ccd484f-da67-4d46-a37d-595c1e5986e0';

// Mock MechanismPermitKafkaService
class MechanismPermitsKafkaServiceMock {
  async getMechanismPermitEntityViaKafka(
    getDto: GetMechanismPermitDto,
    traceId: string,
  ): Promise<MechanismPermitDto> {
    return {} as MechanismPermitDto; // Replace with mock data or assertions
  }

  async getHistoryMechanismPermitEntityViaKafka(
    mechanismPermitId: string,
    traceId: string,
  ): Promise<MechanismPermitDto[]> {
    return [{}] as MechanismPermitDto[]; // Replace with mock data or assertions
  }

  async getMechanismPermitsForOneSystemMechanismViaKafka(
    systemMechanismId: string | null,
    traceId: string,
  ): Promise<MechanismPermitDto[]> {
    return [{}] as MechanismPermitDto[]; // Replace with mock data or assertions
  }
}

describe('MechanismPermitsController', () => {
  let controller: MechanismPermitController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [MechanismPermitController],
      providers: [
        {
          provide: MechanismPermitKafkaService,
          useClass: MechanismPermitsKafkaServiceMock,
        },
      ],
    }).compile();

    controller = module.get<MechanismPermitController>(
      MechanismPermitController,
    );
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a mechanism permit', async () => {
    const getDto: GetMechanismPermitDto = {
      mechanismPermitId: 'test',
      name: 'test',
      isDeleted: false,
    }; // Add your get DTO mock data
    const result = await controller.getMechanismPermitEntity(getDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get history of a mechanism permit', async () => {
    const result = await controller.getHistoryMechanismPermitEntity({
      name: '',
      isDeleted: false,
      mechanismPermitId: mockMechanismPermitId,
    });
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get mechanism permits for system', async () => {
    const getDto = {
      systemMechanismId: 'test-system',
    };
    const result = await controller.getMechanismPermitsForSystem(getDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
    expect(result.data).toBeInstanceOf(Array); // Expect the data to be an array of permits
  });
});
