import { FinancePaymentsWebsocket } from './vy-finance-payments.gateway';
import { KT_GET_PAYMENT_INTENT_STATUS } from 'ez-utils';

describe('FinancePaymentsWebsocket', () => {
  test('joins room from query on connection', () => {
    const gateway = new FinancePaymentsWebsocket({} as any);
    const socket: any = { handshake: { query: { userId: 'userA' } }, join: jest.fn(), data: {} };
    gateway.handleConnection(socket);
    expect(socket.join).toHaveBeenCalledWith('userA');
    expect(socket.data.userId).toBe('userA');
  });

  test('cleans mappings on disconnect', () => {
    const gateway = new FinancePaymentsWebsocket({} as any);
    (gateway as any).intentUserMap.set('p1', 'userA');
    const socket: any = { data: { userId: 'userA' } };
    gateway.handleDisconnect(socket);
    expect((gateway as any).intentUserMap.size).toBe(0);
  });

  test('tracks payment intent creator', async () => {
    const service = { createPaymentIntent: jest.fn().mockResolvedValue({ paymentIntentId: 'p1' }) } as any;
    const gateway = new FinancePaymentsWebsocket(service);
    const socket: any = { emit: jest.fn(), data: { userId: 'userA' } };
    await gateway.handleCreate(socket, {} as any);
    expect(gateway.getUserForIntent('p1')).toBe('userA');
  });

  test('forwards payment intent status result', async () => {
    const service = { getPaymentIntentStatus: jest.fn().mockResolvedValue({ status: 'succeeded' }) } as any;
    const gateway = new FinancePaymentsWebsocket(service);
    const socket: any = { emit: jest.fn(), data: {} };
    await gateway.handleGetStatus(socket, { paymentIntentId: 'pi' } as any);
    expect(service.getPaymentIntentStatus).toHaveBeenCalled();
    expect(socket.emit).toHaveBeenCalledWith(`${KT_GET_PAYMENT_INTENT_STATUS}-result`, { status: 'succeeded' });
  });
});
