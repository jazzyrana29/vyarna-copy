import { PromotionCodesService } from '../promotion-codes.service';
import { StripeGatewayService } from '../stripe-gateway.service';

describe('PromotionCodesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns not eligible when code expired', async () => {
    const stripeGateway = {
      listPromotionCodes: jest.fn().mockResolvedValue({ data: [{
      expires_at: 1,
      max_redemptions: null,
      times_redeemed: 0,
      coupon: 'c1',
      restrictions: {},
    }] }),
      retrieveCoupon: jest.fn().mockResolvedValue({}),
    } as unknown as StripeGatewayService;

    const service = new PromotionCodesService(stripeGateway);
    const result = await service.validatePromotionCode({ code: 'TEST' }, 't1');
    expect(result).toEqual({ eligible: false, reason: 'Code expired' });
  });

  it('returns eligible for valid code', async () => {
    const stripeGateway = {
      listPromotionCodes: jest.fn().mockResolvedValue({ data: [{
      expires_at: null,
      max_redemptions: null,
      times_redeemed: 0,
      coupon: 'c1',
      restrictions: {},
    }] }),
      retrieveCoupon: jest.fn().mockResolvedValue({ percent_off: 10 }),
    } as unknown as StripeGatewayService;

    const service = new PromotionCodesService(stripeGateway);
    const result = await service.validatePromotionCode({ code: 'VALID' }, 't2');
    expect(result).toEqual({ eligible: true, percentOff: 10 });
  });
});
