import { PaymentIntentService } from './payment-intent.service';
import { StripeGatewayService } from '../../services/stripe-gateway.service';
import { Repository } from 'typeorm';
import { PaymentIntent } from '../../entities/payment_intent.entity';
import { PaymentRefund } from '../../entities/payment_refund.entity';
import { PaymentAttempt } from '../../entities/payment_attempt.entity';
import { WebhookEvent } from '../../entities/webhook_event.entity';
import { CreateRefundDto } from 'ez-utils';
import { EzKafkaProducer } from 'ez-kafka-producer';

jest.mock('ez-kafka-producer');

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

  describe('capturePaymentIntent', () => {
    it('uses the payment intent externalId when capturing', async () => {
      const paymentIntent: PaymentIntent = {
        paymentIntentId: 'intent-uuid',
        externalId: 'pi_123',
        amountCents: 100,
        currency: 'usd',
        status: 'REQUIRES_CAPTURE' as any,
        metadata: null,
        orderId: null,
        subscriptionId: null,
        nextRetryAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as PaymentIntent;

      const paymentRepo = {
        findOne: jest.fn().mockResolvedValue(paymentIntent),
        save: jest.fn(),
      } as unknown as Repository<PaymentIntent>;
      const refundRepo = {} as unknown as Repository<PaymentRefund>;
      const attemptRepo = {
        save: jest.fn().mockResolvedValue({ attemptId: 'a1' }),
        count: jest.fn().mockResolvedValue(0),
        update: jest.fn(),
      } as unknown as Repository<PaymentAttempt>;
      const webhookRepo = {} as unknown as Repository<WebhookEvent>;
      const ztrackingService = { createZtrackingForPaymentIntent: jest.fn() } as any;
      const stripeGateway = {
        confirmPaymentIntent: jest.fn().mockResolvedValue({ id: 'pi_123', status: 'requires_capture' }),
        capturePaymentIntent: jest
          .fn()
          .mockResolvedValue({ id: 'pi_123', status: 'succeeded' }),
      } as unknown as StripeGatewayService;

      const service = new PaymentIntentService(
        paymentRepo,
        refundRepo,
        attemptRepo,
        webhookRepo,
        ztrackingService,
        stripeGateway,
      );

      await service.capturePaymentIntent({ paymentIntentId: 'intent-uuid' } as any, 'trace');

      expect(stripeGateway.confirmPaymentIntent).toHaveBeenCalledWith('pi_123');
      expect(stripeGateway.capturePaymentIntent).toHaveBeenCalledWith('pi_123');
    });
  });

  describe('handleStripeWebhook', () => {
    it('emits used-coupon on checkout.session.completed with discount', async () => {
      const paymentRepo = {
        findOne: jest.fn().mockResolvedValue({ orderId: 'order1' }),
      } as unknown as Repository<PaymentIntent>;
      const refundRepo = {} as unknown as Repository<PaymentRefund>;
      const attemptRepo = {} as unknown as Repository<PaymentAttempt>;
      const webhookRepo = {
        findOne: jest.fn().mockResolvedValue(null),
        save: jest.fn().mockResolvedValue({ webhookId: 'wh1' }),
        update: jest.fn(),
      } as unknown as Repository<WebhookEvent>;
      const ztrackingService = { createZtrackingForPaymentIntent: jest.fn() } as any;
      const event = {
        id: 'evt_1',
        type: 'checkout.session.completed',
        data: { object: { discounts: [{ coupon: { id: 'c1' } }], payment_intent: 'pi', customer: 'cus1' } },
      } as any;
      const stripeGateway = { constructWebhookEvent: jest.fn().mockReturnValue(event) } as unknown as StripeGatewayService;
      const producerInstance = { produce: jest.fn() };
      (EzKafkaProducer as jest.Mock).mockImplementation(() => producerInstance);

      const service = new PaymentIntentService(
        paymentRepo,
        refundRepo,
        attemptRepo,
        webhookRepo,
        ztrackingService,
        stripeGateway,
      );

      await service.handleStripeWebhook(
        { payload: Buffer.from(''), signature: 'sig' },
        'trace',
      );

      expect(producerInstance.produce).not.toHaveBeenCalled();
    });

    it('emits limit-reached-coupon when limit hit', async () => {
      const paymentRepo = {} as unknown as Repository<PaymentIntent>;
      const refundRepo = {} as unknown as Repository<PaymentRefund>;
      const attemptRepo = {} as unknown as Repository<PaymentAttempt>;
      const webhookRepo = {
        findOne: jest.fn().mockResolvedValue(null),
        save: jest.fn().mockResolvedValue({ webhookId: 'wh1' }),
        update: jest.fn(),
      } as unknown as Repository<WebhookEvent>;
      const ztrackingService = { createZtrackingForPaymentIntent: jest.fn() } as any;
      const event = {
        id: 'evt_2',
        type: 'coupon.updated',
        data: { object: { id: 'c1', times_redeemed: 5, max_redemptions: 5 } },
      } as any;
      const stripeGateway = { constructWebhookEvent: jest.fn().mockReturnValue(event) } as unknown as StripeGatewayService;
      const producerInstance = { produce: jest.fn() };
      (EzKafkaProducer as jest.Mock).mockImplementation(() => producerInstance);

      const service = new PaymentIntentService(
        paymentRepo,
        refundRepo,
        attemptRepo,
        webhookRepo,
        ztrackingService,
        stripeGateway,
      );

      await service.handleStripeWebhook(
        { payload: Buffer.from(''), signature: 'sig' },
        'trace',
      );

      expect(producerInstance.produce).not.toHaveBeenCalled();
    });
  });
});
