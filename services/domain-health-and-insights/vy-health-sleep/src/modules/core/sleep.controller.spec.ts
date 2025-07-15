import { SleepController } from './sleep.controller';

describe('SleepController', () => {
  test('delegates logSleepEvent', async () => {
    const svc = { logSleepEvent: jest.fn() } as any;
    const controller = new SleepController(svc);
    const ctx: any = { getMessage: () => ({ key: Buffer.from('k') }) };
    await controller.logSleepEventWithKafka({ foo: 'bar' }, ctx);
    expect(svc.logSleepEvent).toHaveBeenCalledWith({ foo: 'bar' }, 'k');
  });

  test('delegates getSleepEvents', async () => {
    const svc = { getSleepEvents: jest.fn() } as any;
    const controller = new SleepController(svc);
    const ctx: any = { getMessage: () => ({ key: Buffer.from('k') }) };
    await controller.getSleepEventsWithKafka({ sessionId: 's1' }, ctx);
    expect(svc.getSleepEvents).toHaveBeenCalledWith({ sessionId: 's1' }, 'k');
  });
});
