import { Test, TestingModule } from '@nestjs/testing';
import { DeviceSessionController } from './device-session.controller';

import {
  CloseDeviceSessionDto,
  StartDeviceSessionDto,
  CreateDeviceSessionDto,
  UpdateDeviceSessionDto,
  GetDeviceSessionDto,
  GetDeviceSessionHistoryDto,
  DeviceSessionDto,
} from 'ez-utils';
import { DeviceSessionKafkaService } from './microservices/device-session-kafka.service';
import { ResponseDTO } from '../../../dto/response.dto';

const mockDeviceSessionId = '8ccd484f-da67-4d46-a37d-595c1e5986e0';

// Mock DeviceSessionKafkaService
class DeviceSessionKafkaServiceMock {
  async createDeviceSessionEntityViaKafka(
    createDto: CreateDeviceSessionDto,
    traceId: string,
  ): Promise<DeviceSessionDto> {
    return {} as DeviceSessionDto; // Replace with mock data or assertions
  }

  async updateDeviceSessionEntityViaKafka(
    updateDto: UpdateDeviceSessionDto,
    traceId: string,
  ): Promise<DeviceSessionDto> {
    return {} as DeviceSessionDto; // Replace with mock data or assertions
  }

  async getDeviceSessionEntityViaKafka(
    getDto: GetDeviceSessionDto,
    traceId: string,
  ): Promise<DeviceSessionDto> {
    return {} as DeviceSessionDto; // Replace with mock data or assertions
  }

  async getHistoryDeviceSessionEntityViaKafka(
    deviceSessionId: string,
    traceId: string,
  ): Promise<DeviceSessionDto[]> {
    return [{}] as DeviceSessionDto[]; // Replace with mock data or assertions
  }

  async getDeviceSessionHistoryViaKafka(
    query: GetDeviceSessionHistoryDto,
    traceId: string,
  ): Promise<DeviceSessionDto[]> {
    return [{}] as DeviceSessionDto[];
  }

  async startDeviceSession(
    startDto: StartDeviceSessionDto,
    traceId: string,
  ): Promise<{ deviceSessionId: string }> {
    return { deviceSessionId: mockDeviceSessionId }; // Replace with mock data or assertions
  }

  async closeDeviceSessionViaKafka(
    closeDto: CloseDeviceSessionDto,
    traceId: string,
  ): Promise<{ deviceSessionId: string }> {
    return { deviceSessionId: mockDeviceSessionId }; // Replace with mock data or assertions
  }
}

describe('DeviceSessionController', () => {
  let controller: DeviceSessionController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [DeviceSessionController],
      providers: [
        {
          provide: DeviceSessionKafkaService,
          useClass: DeviceSessionKafkaServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DeviceSessionController>(DeviceSessionController);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a device session', async () => {
    const createDto: CreateDeviceSessionDto = {
      name: 'test',
      updatedBy: 'test-user',
      startTime: undefined,
      endTime: undefined,
      ipAddress: '',
      userAgent: '',
      lastUpdated: undefined,
      deviceId: '',
    }; // Add your creation DTO mock data
    const result = await controller.createDeviceSessionEntity(createDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should update a device session', async () => {
    const updateDto: UpdateDeviceSessionDto = {
      name: 'updated-test',
      updatedBy: 'test-updated-user',
      deviceSessionId: mockDeviceSessionId,
      isDeleted: false,
      startTime: undefined,
      endTime: undefined,
      ipAddress: '',
      userAgent: '',
      lastUpdated: undefined,
      deviceId: '',
    }; // Add your update DTO mock data
    const result = await controller.updateDeviceSessionEntity(updateDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get a device session', async () => {
    const getDto: GetDeviceSessionDto = {
      name: 'updated-test',
      isDeleted: false,
      deviceSessionId: '',
    }; // Add your get DTO mock data
    const result = await controller.getDeviceSessionEntity(getDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get the history of device sessions based on criteria', async () => {
    const historyDto: GetDeviceSessionHistoryDto = {
      name: 'test-device',
      startTime: new Date('2022-01-01'),
      endTime: new Date('2023-01-01'),
    };
    const result = await controller.getDeviceSessionHistory(historyDto);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200);
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('should start a device session', async () => {
    const startDto: StartDeviceSessionDto = {
      deviceId: 'device123',
      ipAddress: '192.168.0.1',
      userAgent: 'Mozilla/5.0',
      name: 'new-session',
      startTime: new Date(),
      endTime: undefined,
      lastUpdated: undefined,
    }; // Add your start DTO mock data
    const result = await controller.startSession(startDto, {
      headers: {},
    } as any);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
    expect(result.data.deviceSessionId).toEqual(mockDeviceSessionId); // Check if device session ID is as expected
  });

  it('should close a device session', async () => {
    const closeDto: CloseDeviceSessionDto = {
      deviceSessionId: mockDeviceSessionId,
      endTime: new Date(),
      updatedBy: 'test-closer',
      startTime: undefined,
      ipAddress: '',
      userAgent: '',
      lastUpdated: undefined,
    }; // Add your close DTO mock data
    const result = await controller.closeDeviceSession(closeDto, {
      headers: {},
    } as any);
    expect(result).toBeInstanceOf(ResponseDTO);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
    expect(result.data.deviceSessionId).toEqual(mockDeviceSessionId); // Check if device session ID is as expected
  });
});
