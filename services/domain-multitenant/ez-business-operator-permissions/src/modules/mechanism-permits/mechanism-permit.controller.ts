import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { MechanismPermitKafkaService } from './services/mechanism-permit-kafka.service';
import {
  KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY,
  KT_GET_MECHANISM_PERMIT_ENTITY,
  KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM,
} from 'ez-utils';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

@Controller('mechanism-permits')
export class MechanismPermitsController {
  private logger = getLoggerConfig(MechanismPermitsController.name);

  constructor(
    private readonly mechanismPermitsKafkaService: MechanismPermitKafkaService,
  ) {
    this.logger.debug(
      `${MechanismPermitsController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_MECHANISM_PERMIT_ENTITY)
  async getMechanismPermitEntity(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MECHANISM_PERMIT_ENTITY}`,
      '',
      'getMechanismPermitEntity',
      LogStreamLevel.DebugLight,
    );
    await this.mechanismPermitsKafkaService.getMechanismPermitEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY)
  async getHistoryOfMechanismPermitEntity(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY}`,
      '',
      'getHistoryOfMechanismPermitEntity',
      LogStreamLevel.DebugLight,
    );
    await this.mechanismPermitsKafkaService.getHistoryOfMechanismPermitEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM)
  async getMechanismPermitsForSystemMechanism(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM}`,
      '',
      'getMechanismPermitsForSystemMechanism',
      LogStreamLevel.DebugLight,
    );
    await this.mechanismPermitsKafkaService.getMechanismPermitForSystemMechanism(
      message,
      key,
    );
  }
}
