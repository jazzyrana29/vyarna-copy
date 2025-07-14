import { OrderService } from '../order.service';
import { Repository } from 'typeorm';
import { Order } from '../../../../entities/order.entity';
import { ZtrackingOrderService } from '../ztracking-order.service';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { KT_CAPTURE_PAYMENT_INTENT, encodeKafkaMessage } from 'ez-utils';

jest.mock('ez-kafka-producer');

describe('OrderService', () => {
  describe('updateOrderStatus', () => {
    it('emits capture-payment-intent when status READY_TO_SHIP', async () => {
      const orderRepo = {
        findOne: jest.fn().mockResolvedValue({ orderId: 'o1', paymentIntentId: 'pi' }),
        update: jest.fn().mockResolvedValue(null),
      } as unknown as Repository<Order>;
      const ztracking = {} as ZtrackingOrderService;
      const producerInstance = { produce: jest.fn() };
      (EzKafkaProducer as jest.Mock).mockImplementation(() => producerInstance);

      const service = new OrderService(orderRepo, ztracking);
      await service.updateOrderStatus('o1', 'READY_TO_SHIP', 'trace');

      expect(producerInstance.produce).toHaveBeenCalledTimes(1);
      expect(producerInstance.produce.mock.calls[0][1]).toBe(
        KT_CAPTURE_PAYMENT_INTENT,
      );
    });
  });
});
