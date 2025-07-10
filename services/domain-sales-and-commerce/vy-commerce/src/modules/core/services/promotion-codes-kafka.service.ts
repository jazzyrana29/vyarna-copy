import { Injectable } from '@nestjs/common';
import { KafkaMessageResponderService } from 'ez-utils';
import { ValidatePromotionCodeDto, KT_VALIDATE_PROMOTION_CODE } from 'ez-utils';
import { PromotionCodesService } from './promotion-codes.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class PromotionCodesKafkaService {
  public serviceName = PromotionCodesKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly promotionCodesService: PromotionCodesService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async validatePromotionCode(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_VALIDATE_PROMOTION_CODE,
      message,
      key,
      async (value: ValidatePromotionCodeDto, traceId: string) =>
        await this.promotionCodesService.validatePromotionCode(value, traceId),
    );
  }
}
