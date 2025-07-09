import { PaymentIntentService } from './payment-intent.service';
import { StripeGatewayService } from './stripe-gateway.service';
import { Repository } from 'typeorm';
import { PaymentIntent } from '../../entities/payment_intent.entity';
import { PaymentRefund } from '../../entities/payment_refund.entity';
import { PaymentAttempt } from '../../entities/payment_attempt.entity';
import { WebhookEvent } from '../../entities/webhook_event.entity';
import { CreateRefundDto } from 'ez-utils';

describe('PaymentIntentService', () => {
  describe('createRefund', () => {
    it('uses the payment intent externalId when creating a refund', async () => {
      const paymentIntent: PaymentIntent = {
        paymentIntentId: 'intent-uuid',
        externalId: 'pi_123',
        amountCents: 100,
        currency: 'usd',
        status: 'SUCCEEDED',
        metadata: null,
        orderId: null,
        subscriptionId: null,
        nextRetryAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as PaymentIntent;

      const paymentRepo = {
        findOne: jest.fn().mockResolvedValue(paymentIntent),
      } as unknown as Repository<PaymentIntent>;
      const refundRepo = {
        create: jest.fn().mockReturnValue({}),
        save: jest.fn().mockResolvedValue({ refundId: 'ref-1' }),
        update: jest.fn(),
      } as unknown as Repository<PaymentRefund>;
      const attemptRepo = {} as unknown as Repository<PaymentAttempt>;
      const webhookRepo = {} as unknown as Repository<WebhookEvent>;
      const ztrackingService = { createZtrackingForPaymentIntent: jest.fn() } as any;
      const stripeGateway = {
        createRefund: jest
          .fn()
          .mockResolvedValue({ id: 're_123', amount: 50, currency: 'usd', status: 'succeeded' }),
      } as unknown as StripeGatewayService;

      const service = new PaymentIntentService(
        paymentRepo,
        refundRepo,
        attemptRepo,
        webhookRepo,
        ztrackingService,
        stripeGateway,
      );

      const dto: CreateRefundDto = {
        paymentIntentId: 'intent-uuid',
        amountCents: 50,
        reason: 'REQUESTED_BY_CUSTOMER',
        metadata: { foo: 'bar' },
      } as CreateRefundDto;

      await service.createRefund(dto, 'trace');

      expect(stripeGateway.createRefund).toHaveBeenCalledWith({
        payment_intent: 'pi_123',
        amount: 50,
        reason: 'REQUESTED_BY_CUSTOMER',
        metadata: { foo: 'bar' },
      });
    });
  });
});
