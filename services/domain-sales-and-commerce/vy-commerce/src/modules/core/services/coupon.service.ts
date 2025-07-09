import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { CheckCouponEligibilityPayloadDto, CheckCouponEligibilityResponseDto } from 'ez-utils';

@Injectable()
export class CouponService {
  private logger = getLoggerConfig(CouponService.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  constructor() {
    this.logger.debug(
      `${CouponService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async checkCouponEligibility(
    payload: CheckCouponEligibilityPayloadDto,
    traceId: string,
  ): Promise<CheckCouponEligibilityResponseDto> {
    this.logger.debug(
      `Checking coupon eligibility for code ${payload.code}`,
      traceId,
      'checkCouponEligibility',
      LogStreamLevel.DebugLight,
    );

    const promos = await this.stripe.promotionCodes.list({ code: payload.code });
    const promo = promos.data[0];
    if (!promo) {
      return { eligible: false, reason: 'Coupon not found' };
    }

    const coupon = await this.stripe.coupons.retrieve(promo.coupon as string);
    const now = Math.floor(Date.now() / 1000);
    if (coupon.redeem_by && coupon.redeem_by < now) {
      return { eligible: false, reason: 'Coupon expired' };
    }
    if (
      coupon.max_redemptions &&
      coupon.times_redeemed >= coupon.max_redemptions
    ) {
      return { eligible: false, reason: 'Coupon fully redeemed' };
    }

    return { eligible: true };
  }
}
