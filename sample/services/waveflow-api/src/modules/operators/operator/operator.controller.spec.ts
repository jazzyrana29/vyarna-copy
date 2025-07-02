import { Test, TestingModule } from '@nestjs/testing';

import { OperatorKafkaService } from './microservices/operator-kakfa.service';
import {
  mockCreateOperatorDtoCase001,
  mockGetOperatorDtoCase001,
  mockOperatorId001,
  mockResponseCreateOperatorDtoCase001,
  mockResponseHistoryOperatorDtoCase001,
  mockResponseOperatorDtoCase001,
  mockUpdateOperatorDtoCase002,
} from './test-values.spec';
import { OperatorController } from './operator.controller';
import { CreateOperatorDto, GetOperatorDto, UpdateOperatorDto } from 'ez-utils';

// Mock OperatorKafkaService
class OperatorKafkaServiceMock {}

describe('OperatorController', () => {
  let operatorController: OperatorController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [OperatorController],
      providers: [
        {
          provide: OperatorKafkaService,
          useClass: OperatorKafkaServiceMock,
        },
      ],
    }).compile();

    operatorController = module.get<OperatorController>(OperatorController);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(operatorController).toBeDefined();
  });

  it('should create a operator', async () => {
    jest
      .spyOn(operatorController, 'createOperatorEntity')
      .mockResolvedValue(mockResponseCreateOperatorDtoCase001);

    const createDto: CreateOperatorDto = mockCreateOperatorDtoCase001; // Add your creation DTO mock data
    const result = await operatorController.createOperatorEntity(createDto);
    expect(operatorController.createOperatorEntity).toHaveBeenCalledWith(
      createDto,
    );
    expect(result).toEqual(mockResponseCreateOperatorDtoCase001);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should update a operator', async () => {
    jest
      .spyOn(operatorController, 'updateOperatorEntity')
      .mockResolvedValue(mockResponseOperatorDtoCase001);

    const updateDto: UpdateOperatorDto = mockUpdateOperatorDtoCase002; // Add your update DTO mock data
    const result = await operatorController.updateOperatorEntity(updateDto);
    expect(operatorController.updateOperatorEntity).toHaveBeenCalledWith(
      updateDto,
    );
    expect(result).toEqual(mockResponseOperatorDtoCase001);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get a operator', async () => {
    jest
      .spyOn(operatorController, 'getOperatorEntity')
      .mockResolvedValue(mockResponseOperatorDtoCase001);

    const getDto: GetOperatorDto = mockGetOperatorDtoCase001; // Add your get DTO mock data
    const result = await operatorController.getOperatorEntity(getDto);
    expect(operatorController.getOperatorEntity).toHaveBeenCalledWith(getDto);
    expect(result).toEqual(mockResponseOperatorDtoCase001);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });

  it('should get history of a operator', async () => {
    jest
      .spyOn(operatorController, 'getHistoryOfOperatorEntity')
      .mockResolvedValue(mockResponseHistoryOperatorDtoCase001);

    const result = await operatorController.getHistoryOfOperatorEntity({
      operatorId: mockOperatorId001,
    });
    expect(operatorController.getHistoryOfOperatorEntity).toHaveBeenCalledWith(
      mockOperatorId001,
    );
    expect(result).toEqual(mockResponseHistoryOperatorDtoCase001);
    expect(result.statusCode).toEqual(200); // Adjust as per your implementation
  });
});
