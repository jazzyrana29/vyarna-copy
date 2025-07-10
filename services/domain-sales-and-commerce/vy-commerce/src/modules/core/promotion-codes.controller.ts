import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { PromotionCodesKafkaService } from './services/promotion-codes-kafka.service';
import { KT_VALIDATE_PROMOTION_CODE } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('commerce')
export class PromotionCodesController {
  private logger = getLoggerConfig(PromotionCodesController.name);

  constructor(private readonly promotionCodesKafkaService: PromotionCodesKafkaService) {
    this.logger.debug(
      `${PromotionCodesController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_VALIDATE_PROMOTION_CODE)
  async validatePromotionCode(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_VALIDATE_PROMOTION_CODE}`,
      '',
      'validatePromotionCode',
      LogStreamLevel.DebugLight,
    );
    await this.promotionCodesKafkaService.validatePromotionCode(message, key);
  }
}
