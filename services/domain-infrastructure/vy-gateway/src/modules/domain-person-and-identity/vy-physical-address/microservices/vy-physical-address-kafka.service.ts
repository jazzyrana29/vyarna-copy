import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_CREATE_PHYSICAL_ADDRESS,
  KT_UPDATE_PHYSICAL_ADDRESS,
  KT_GET_PHYSICAL_ADDRESS,
  CreatePhysicalAddressDto,
  UpdatePhysicalAddressDto,
  GetOnePersonDto,
} from 'ez-utils';

@Injectable()
export class PersonPhysicalAddressKafkaService {
  private readonly serviceName = PersonPhysicalAddressKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createAddress(dto: CreatePhysicalAddressDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_PHYSICAL_ADDRESS,
      dto,
      traceId,
    );
  }

  async updateAddress(dto: UpdatePhysicalAddressDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_UPDATE_PHYSICAL_ADDRESS,
      dto,
      traceId,
    );
  }

  async getAddress(dto: GetOnePersonDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PHYSICAL_ADDRESS,
      dto,
      traceId,
    );
  }
}
