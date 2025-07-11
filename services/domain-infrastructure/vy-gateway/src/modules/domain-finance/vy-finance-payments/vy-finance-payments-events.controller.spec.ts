import { FinancePaymentsEventsController } from './vy-finance-payments-events.controller';
import { FinancePaymentsWebsocket } from './vy-finance-payments.gateway';
import { KT_PAYMENT_STATUS_UPDATE } from 'ez-utils';

describe('FinancePaymentsEventsController', () => {
  test('emits succeeded event to user room', () => {
    const gateway = new FinancePaymentsWebsocket({} as any);
    const room = { emit: jest.fn() };
    const server = { to: jest.fn().mockReturnValue(room), emit: jest.fn() } as any;
    gateway.server = server;
    (gateway as any).intentUserMap.set('pi_1', 'userA');
    const controller = new FinancePaymentsEventsController(gateway);
    const ctx: any = { getMessage: () => ({ key: Buffer.from('k') }) };
    controller.handleSucceeded({ paymentIntentId: 'pi_1', orderId: 'o', subscriptionId: null, traceId: 't' }, ctx);
    expect(server.to).toHaveBeenCalledWith('userA');
    expect(room.emit).toHaveBeenCalledWith(KT_PAYMENT_STATUS_UPDATE, expect.objectContaining({ paymentIntentId: 'pi_1', status: 'succeeded' }));
    expect(server.emit).not.toHaveBeenCalled();
  });
});
