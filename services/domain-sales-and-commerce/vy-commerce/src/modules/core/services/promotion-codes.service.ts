import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  ValidatePromotionCodeDto,
  ValidatePromotionCodeResponseDto,
} from 'ez-utils';

@Injectable()
export class PromotionCodesService {
  private logger = getLoggerConfig(PromotionCodesService.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  constructor() {
    this.logger.debug(
      `${PromotionCodesService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async validatePromotionCode(
    dto: ValidatePromotionCodeDto,
    traceId: string,
  ): Promise<ValidatePromotionCodeResponseDto> {
    const { code, customerId, cartTotal } = dto;
    if (!code) {
      throw new BadRequestException('Promotion code is required');
    }

    const { data } = await this.stripe.promotionCodes.list({
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
    if (promo.max_redemptions && promo.times_redeemed >= promo.max_redemptions) {
      return { eligible: false, reason: 'Redemption limit reached' };
    }

    const r = promo.restrictions;
    if (r.first_time_transaction && !customerId) {
      return {
        eligible: false,
        reason: 'Customer ID required for first-time purchase',
      };
    }
    if (r.first_time_transaction) {
      const hasPaid = await this.customerHasPaidBefore(customerId!);
      if (hasPaid) {
        return { eligible: false, reason: 'Only valid on first purchase' };
      }
    }
    if (r.minimum_amount && cartTotal! < r.minimum_amount) {
      return {
        eligible: false,
        reason: `Minimum purchase of ${r.minimum_amount} required`,
      };
    }
    if (r.customer && r.customer !== customerId) {
      return { eligible: false, reason: 'Code not valid for this customer' };
    }

    const couponId = typeof promo.coupon === 'string' ? promo.coupon : promo.coupon.id;
    const coupon = await this.stripe.coupons.retrieve(couponId);

    const resp: ValidatePromotionCodeResponseDto = { eligible: true };
    if ((coupon as any).amount_off) resp.discountAmount = (coupon as any).amount_off as number;
    if ((coupon as any).percent_off) resp.percentOff = (coupon as any).percent_off as number;
    return resp;
  }

  private async customerHasPaidBefore(_customerId: string): Promise<boolean> {
    return false;
  }
}
