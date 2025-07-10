import { PromotionCodesService } from '../promotion-codes.service';
import Stripe from 'stripe';

jest.mock('stripe');

const stripeMock = {
  promotionCodes: { list: jest.fn() },
  coupons: { retrieve: jest.fn() },
};

(Stripe as unknown as jest.Mock).mockImplementation(() => stripeMock);

describe('PromotionCodesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns not eligible when code expired', async () => {
    stripeMock.promotionCodes.list.mockResolvedValue({ data: [{
      expires_at: 1,
      max_redemptions: null,
      times_redeemed: 0,
      coupon: 'c1',
      restrictions: {},
    }] });
    stripeMock.coupons.retrieve.mockResolvedValue({});

    const service = new PromotionCodesService();
    const result = await service.validatePromotionCode({ code: 'TEST' }, 't1');
    expect(result).toEqual({ eligible: false, reason: 'Code expired' });
  });

  it('returns eligible for valid code', async () => {
    stripeMock.promotionCodes.list.mockResolvedValue({ data: [{
      expires_at: null,
      max_redemptions: null,
      times_redeemed: 0,
      coupon: 'c1',
      restrictions: {},
    }] });
    stripeMock.coupons.retrieve.mockResolvedValue({ percent_off: 10 });

    const service = new PromotionCodesService();
    const result = await service.validatePromotionCode({ code: 'VALID' }, 't2');
    expect(result).toEqual({ eligible: true, percentOff: 10 });
  });
});
