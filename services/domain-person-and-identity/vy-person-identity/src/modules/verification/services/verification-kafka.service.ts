import { Injectable } from '@nestjs/common';
import { KafkaMessageResponderService, KT_START_IDENTITY_VERIFICATION, KT_REVIEW_IDENTITY_VERIFICATION, StartIdentityVerificationDto, ReviewIdentityVerificationDto } from 'ez-utils';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { VerificationService } from './verification.service';

@Injectable()
export class VerificationKafkaService {
  public serviceName = VerificationKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly verificationService: VerificationService) {
    this.kafkaResponder = new KafkaMessageResponderService(process.env.KAFKA_BROKER as string);
    this.logger.debug(
      `${VerificationKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startVerification(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_IDENTITY_VERIFICATION,
      message,
      key,
      async (value: StartIdentityVerificationDto, traceId: string) =>
        await this.verificationService.startVerification(value, traceId),
    );
  }

  async reviewVerification(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_REVIEW_IDENTITY_VERIFICATION,
      message,
      key,
      async (value: ReviewIdentityVerificationDto, traceId: string) =>
        await this.verificationService.reviewVerification(value, traceId),
    );
  }
}
