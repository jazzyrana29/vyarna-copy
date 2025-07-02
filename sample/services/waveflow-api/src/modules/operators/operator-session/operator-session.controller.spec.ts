import { Test, TestingModule } from '@nestjs/testing';
import { OperatorSessionController } from './operator-session.controller';

import { OperatorSessionKafkaService } from './microservices/operator-session-kafka.service';

import { ResponseDTO } from '../../../dto/response.dto';

import {
  CreateOperatorSessionDto,
  UpdateOperatorSessionDto,
  GetOperatorSessionDto,
  OperatorSessionDto,
  LogoutOperatorSessionDto,
  LoginOperatorSessionDto,
  SearchOperatorSessionsDto,
  DeviceSessionDto,
  OperatorDto,
} from 'ez-utils';

const mockOperatorSessionId = '8ccd484f-da67-4d46-a37d-595c1e5986e0';

// Mock OperatorSessionKafkaService
class OperatorSessionKafkaServiceMock {
  async createOperatorSessionEntityViaKafka(
    createDto: CreateOperatorSessionDto,
    traceId: string,
  ): Promise<OperatorSessionDto> {
    return {} as OperatorSessionDto; // Replace with mock data or assertions
  }

  async updateOperatorSessionEntityViaKafka(
    updateDto: UpdateOperatorSessionDto,
    traceId: string,
  ): Promise<OperatorSessionDto> {
    return {} as OperatorSessionDto; // Replace with mock data or assertions
  }

  async getOperatorSessionEntityViaKafka(
    getDto: GetOperatorSessionDto,
    traceId: string,
  ): Promise<OperatorSessionDto> {
    return {} as OperatorSessionDto; // Replace with mock data or assertions
  }

  async getHistoryOperatorSessionEntityViaKafka(
    operatorSessionId: string,
    traceId: string,
  ): Promise<OperatorSessionDto[]> {
    return [{}] as OperatorSessionDto[]; // Replace with mock data or assertions
  }

  async loginOperatorSessionViaKafka(
    loginDto: LoginOperatorSessionDto,
    traceId: string,
  ): Promise<OperatorSessionDto> {
    return {} as OperatorSessionDto; // Replace with mock data or assertions
  }

  async logoutOperatorSessionViaKafka(
    logoutDto: LogoutOperatorSessionDto,
    traceId: string,
  ): Promise<OperatorSessionDto> {
    return {} as OperatorSessionDto; // Replace with mock data or assertions
  }

  async searchOperatorSessionsViaKafka(
    searchDto: SearchOperatorSessionsDto,
    traceId: string,
  ): Promise<OperatorSessionDto[]> {
    return [{}] as OperatorSessionDto[]; // Replace with mock data or assertions
  }
}

describe('OperatorSessionController', () => {
  let controller: OperatorSessionController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [OperatorSessionController],
      providers: [
        {
          provide: OperatorSessionKafkaService,
          useClass: OperatorSessionKafkaServiceMock,
        },
      ],
    }).compile();

    controller = module.get<OperatorSessionController>(
      OperatorSessionController,
    );
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an operator session', async () => {
    const createDto: CreateOperatorSessionDto = {
      updatedBy: 'test-user',
      deviceSession: new DeviceSessionDto(),
      operator: new OperatorDto(),
      loginTime: undefined,
      logoutTime: undefined,
    }; // Add your creation DTO mock data
    const result = await controller.createOperatorSessionEntity(createDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should update an operator session', async () => {
    const updateDto: UpdateOperatorSessionDto = {
      updatedBy: 'test-updated-user',
      operatorSessionId: mockOperatorSessionId,
      deviceSession: new DeviceSessionDto(),
      operator: new OperatorDto(),
      loginTime: undefined,
      logoutTime: undefined,
    }; // Add your update DTO mock data
    const result = await controller.updateOperatorSessionEntity(updateDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get an operator session', async () => {
    const getDto: GetOperatorSessionDto = {
      operatorSessionId: '',
    }; // Add your get DTO mock data
    const result = await controller.getOperatorSessionEntity(getDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get history of an operator session', async () => {
    const result = await controller.getHistoryOperatorSessionEntity({
      operatorId: mockOperatorSessionId,
    });
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should login an operator', async () => {
    const loginDto: LoginOperatorSessionDto = {
      username: 'testuser',
      password: 'testpassword',
    };
    const result = await controller.loginOperatorSession(loginDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should logout an operator session', async () => {
    const logoutDto: LogoutOperatorSessionDto = {
      operatorSessionId: mockOperatorSessionId,
    };
    const result = await controller.logoutOperatorSession(logoutDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should search for operator sessions', async () => {
    const searchDto: SearchOperatorSessionsDto = {
      operatorId: 'test-operator-id',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
    };
    const result = await controller.searchOperatorSessions(searchDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });
});
