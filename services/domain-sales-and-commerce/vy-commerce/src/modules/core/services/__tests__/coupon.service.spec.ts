import { CouponService } from '../coupon.service';
import Stripe from 'stripe';

jest.mock('stripe');

const stripeMock = {
  promotionCodes: { list: jest.fn() },
  coupons: { retrieve: jest.fn() },
};

(Stripe as unknown as jest.Mock).mockImplementation(() => stripeMock);

describe('CouponService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns not eligible when coupon expired', async () => {
    stripeMock.promotionCodes.list.mockResolvedValue({ data: [{ coupon: 'c1' }] });
    stripeMock.coupons.retrieve.mockResolvedValue({ redeem_by: 1, max_redemptions: null, times_redeemed: 0 });

    const service = new CouponService();
    const result = await service.checkCouponEligibility({ code: 'TEST' }, 't1');
    expect(result).toEqual({ eligible: false, reason: 'Coupon expired' });
  });

  it('returns eligible for valid coupon', async () => {
    stripeMock.promotionCodes.list.mockResolvedValue({ data: [{ coupon: 'c1' }] });
    stripeMock.coupons.retrieve.mockResolvedValue({ redeem_by: null, max_redemptions: 10, times_redeemed: 0 });

    const service = new CouponService();
    const result = await service.checkCouponEligibility({ code: 'VALID' }, 't2');
    expect(result).toEqual({ eligible: true });
  });
});
