import { FinancePaymentsWebsocket } from './vy-finance-payments.gateway';

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
});
