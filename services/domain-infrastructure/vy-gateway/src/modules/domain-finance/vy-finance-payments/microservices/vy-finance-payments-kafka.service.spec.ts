import { FinancePaymentsKafkaService } from './vy-finance-payments-kafka.service';
import { KT_GET_PAYMENT_INTENT_STATUS } from 'ez-utils';

describe('FinancePaymentsKafkaService', () => {
  test('sends kafka request for payment intent status', async () => {
    const responder = { sendMessageAndWaitForResponse: jest.fn().mockResolvedValue('ok') } as any;
    const service = new FinancePaymentsKafkaService(responder);
    const dto: any = { paymentIntentId: 'pi' };
    await service.getPaymentIntentStatus(dto, 'trace');
    expect(responder.sendMessageAndWaitForResponse).toHaveBeenCalledWith(
      service.serviceName,
      KT_GET_PAYMENT_INTENT_STATUS,
      dto,
      'trace',
    );
  });
});
