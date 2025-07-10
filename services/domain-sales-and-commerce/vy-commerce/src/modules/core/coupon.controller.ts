import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { CouponKafkaService } from './services/coupon-kafka.service';
import { KT_CHECK_COUPON_ELIGIBILITY } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('commerce')
export class CouponController {
  private logger = getLoggerConfig(CouponController.name);

  constructor(private readonly couponKafkaService: CouponKafkaService) {
    this.logger.debug(
      `${CouponController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CHECK_COUPON_ELIGIBILITY)
  async checkCouponEligibility(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CHECK_COUPON_ELIGIBILITY}`,
      '',
      'checkCouponEligibility',
      LogStreamLevel.DebugLight,
    );
    await this.couponKafkaService.checkCouponEligibility(message, key);
  }
}
