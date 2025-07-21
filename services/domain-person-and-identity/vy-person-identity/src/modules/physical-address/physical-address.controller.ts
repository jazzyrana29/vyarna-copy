import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { PhysicalAddressKafkaService } from './services/physical-address-kafka.service';
import {
  KT_CREATE_PHYSICAL_ADDRESS,
  KT_UPDATE_PHYSICAL_ADDRESS,
  KT_GET_PHYSICAL_ADDRESS,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('physical-address')
export class PhysicalAddressController {
  private logger = getLoggerConfig(PhysicalAddressController.name);

  constructor(
    private readonly addressKafkaService: PhysicalAddressKafkaService,
  ) {
    this.logger.debug(
      `${PhysicalAddressController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_PHYSICAL_ADDRESS)
  async create(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_PHYSICAL_ADDRESS}`,
      '',
      'create',
      LogStreamLevel.DebugLight,
    );
    await this.addressKafkaService.createAddress(message, key);
  }

  @MessagePattern(KT_UPDATE_PHYSICAL_ADDRESS)
  async update(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_PHYSICAL_ADDRESS}`,
      '',
      'update',
      LogStreamLevel.DebugLight,
    );
    await this.addressKafkaService.updateAddress(message, key);
  }

  @MessagePattern(KT_GET_PHYSICAL_ADDRESS)
  async get(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PHYSICAL_ADDRESS}`,
      '',
      'get',
      LogStreamLevel.DebugLight,
    );
    await this.addressKafkaService.getAddress(message, key);
  }
}
