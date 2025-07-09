import { Injectable } from '@nestjs/common';
import { KafkaMessageResponderService } from 'ez-utils';
import { CheckCouponEligibilityPayloadDto, KT_CHECK_COUPON_ELIGIBILITY } from 'ez-utils';
import { CouponService } from './coupon.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class CouponKafkaService {
  public serviceName = CouponKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly couponService: CouponService) {
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

  async checkCouponEligibility(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CHECK_COUPON_ELIGIBILITY,
      message,
      key,
      async (value: CheckCouponEligibilityPayloadDto, traceId: string) =>
        await this.couponService.checkCouponEligibility(value, traceId),
    );
  }
}
