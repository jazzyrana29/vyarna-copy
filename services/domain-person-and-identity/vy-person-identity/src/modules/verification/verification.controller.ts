import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { VerificationKafkaService } from './services/verification-kafka.service';
import { KT_START_IDENTITY_VERIFICATION, KT_REVIEW_IDENTITY_VERIFICATION } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('verification')
export class VerificationController {
  private logger = getLoggerConfig(VerificationController.name);

  constructor(private readonly verificationKafkaService: VerificationKafkaService) {
    this.logger.debug(
      `${VerificationController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_IDENTITY_VERIFICATION)
  async startVerification(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(`Message Pattern hit for kafka topic : ${KT_START_IDENTITY_VERIFICATION}`, '', 'startVerification', LogStreamLevel.DebugLight);
    await this.verificationKafkaService.startVerification(message, key);
  }

  @MessagePattern(KT_REVIEW_IDENTITY_VERIFICATION)
  async reviewVerification(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(`Message Pattern hit for kafka topic : ${KT_REVIEW_IDENTITY_VERIFICATION}`, '', 'reviewVerification', LogStreamLevel.DebugLight);
    await this.verificationKafkaService.reviewVerification(message, key);
  }
}
