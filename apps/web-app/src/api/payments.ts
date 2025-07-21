import {
  SOCKET_NAMESPACE_FINANCE_PAYMENTS,
  KT_CREATE_PAYMENT_INTENT,
  KT_CREATE_PAYMENT_INTENT_RESULT,
  KT_CREATE_PAYMENT_INTENT_ERROR,
  KT_CONFIRM_PAYMENT_INTENT,
  KT_CONFIRM_PAYMENT_INTENT_RESULT,
  KT_CONFIRM_PAYMENT_INTENT_ERROR,
} from '../constants/socketEvents';
import { SocketService } from '../services/socketService';
import { useLoadingStore } from '../store/loadingStore';
import {
  CreatePaymentIntentPayloadDto,
  PaymentIntentCreatedDto,
  ConfirmPaymentIntentDto,
  ConfirmedPaymentIntentDto,
} from 'ez-utils';

export async function socketCreatePaymentIntent(
  roomId: string,
  dto: CreatePaymentIntentPayloadDto,
): Promise<PaymentIntentCreatedDto> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_FINANCE_PAYMENTS,
    transports: ['websocket'],
  });
  const { start, stop } = useLoadingStore.getState();
  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);
    const cleanup = () => socketSvc.disconnect();
    socketSvc.on<PaymentIntentCreatedDto>(KT_CREATE_PAYMENT_INTENT_RESULT, (data) => {
      cleanup();
      stop();
      resolve(data);
    });
    socketSvc.on<string>(KT_CREATE_PAYMENT_INTENT_ERROR, (msg) => {
      cleanup();
      stop();
      reject(new Error(msg));
    });
    socketSvc.emit<CreatePaymentIntentPayloadDto>(KT_CREATE_PAYMENT_INTENT, dto);
  });
}

export async function socketConfirmPaymentIntent(
  roomId: string,
  dto: ConfirmPaymentIntentDto,
): Promise<ConfirmedPaymentIntentDto> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_FINANCE_PAYMENTS,
    transports: ['websocket'],
  });
  const { start, stop } = useLoadingStore.getState();
  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);
    const cleanup = () => socketSvc.disconnect();
    socketSvc.on<ConfirmedPaymentIntentDto>(KT_CONFIRM_PAYMENT_INTENT_RESULT, (data) => {
      cleanup();
      stop();
      resolve(data);
    });
    socketSvc.on<string>(KT_CONFIRM_PAYMENT_INTENT_ERROR, (msg) => {
      cleanup();
      stop();
      reject(new Error(msg));
    });
    socketSvc.emit<ConfirmPaymentIntentDto>(KT_CONFIRM_PAYMENT_INTENT, dto);
  });
}
