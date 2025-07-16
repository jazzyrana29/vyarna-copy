import { Injectable, BadRequestException } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { StripeGatewayService } from '../../../services/stripe-gateway.service';
import {
  ValidatePromotionCodeDto,
  ValidatePromotionCodeResponseDto,
} from 'ez-utils';

@Injectable()
export class PromotionCodesService {
  private logger = getLoggerConfig(PromotionCodesService.name);

  constructor(private readonly stripeGateway: StripeGatewayService) {
    this.logger.debug(
      `${PromotionCodesService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async validatePromotionCode(
    validatePromotionCodeDto: ValidatePromotionCodeDto,
    _traceId: string,
  ): Promise<ValidatePromotionCodeResponseDto> {
    const { code, cartTotal } = validatePromotionCodeDto;
    if (!code) throw new BadRequestException('Promotion code is required');

    const { data } = await this.stripeGateway.listPromotionCodes({
      code,
      active: true,
      limit: 1,
    });
    const promo = data[0];
    if (!promo) {
      return { eligible: false, reason: 'Code not found or inactive' };
    }

    const now = Math.floor(Date.now() / 1000);
    if (promo.expires_at && promo.expires_at < now) {
      return { eligible: false, reason: 'Code expired' };
    }
    if (
      promo.max_redemptions &&
      promo.times_redeemed >= promo.max_redemptions
    ) {
      return { eligible: false, reason: 'Redemption limit reached' };
    }

    const { restrictions: r } = promo;
    if (
      r.minimum_amount &&
      cartTotal !== undefined &&
      cartTotal < r.minimum_amount
    ) {
      return {
        eligible: false,
        reason: `Minimum purchase of ${r.minimum_amount} required`,
      };
    }

    const couponId =
      typeof promo.coupon === 'string' ? promo.coupon : promo.coupon.id;
    const coupon = await this.stripeGateway.retrieveCoupon(couponId);

    const resp: ValidatePromotionCodeResponseDto = { eligible: true };
    if (coupon.amount_off) resp.discountAmount = coupon.amount_off;
    if (coupon.percent_off) resp.percentOff = coupon.percent_off;

    this.logger.info(
      `Promotion code ${code} validated`,
      _traceId,
      'validatePromotionCode',
      LogStreamLevel.DebugLight,
    );

    return resp;
  }
}
