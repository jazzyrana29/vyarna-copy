import { Injectable } from '@nestjs/common';
import { PhysicalAddressService } from './physical-address.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_PHYSICAL_ADDRESS,
  KT_UPDATE_PHYSICAL_ADDRESS,
  KT_GET_PHYSICAL_ADDRESS,
  CreatePhysicalAddressDto,
  UpdatePhysicalAddressDto,
  GetOnePersonDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class PhysicalAddressKafkaService {
  public serviceName = PhysicalAddressKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly addressService: PhysicalAddressService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${PhysicalAddressKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createAddress(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_PHYSICAL_ADDRESS,
      message,
      key,
      async (value: CreatePhysicalAddressDto, traceId: string) =>
        await this.addressService.createAddress(value, traceId),
    );
  }

  async updateAddress(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_PHYSICAL_ADDRESS,
      message,
      key,
      async (value: UpdatePhysicalAddressDto, traceId: string) =>
        await this.addressService.updateAddress(value, traceId),
    );
  }

  async getAddress(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PHYSICAL_ADDRESS,
      message,
      key,
      async (value: GetOnePersonDto, traceId: string) =>
        await this.addressService.getAddresses(value, traceId),
    );
  }
}
