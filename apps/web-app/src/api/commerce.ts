import { SocketService } from '../services/socketService';
import {
  SOCKET_NAMESPACE_SALES,
  KT_ADD_BOOSTER_PACK_IN_CART,
  KT_ADD_BOOSTER_PACK_IN_CART_RESULT,
  KT_ADD_BOOSTER_PACK_IN_CART_ERROR,
} from '../constants/socketEvents';
import { useLoadingStore } from '../store/loadingStore';
import { AddBoosterPackInCartDto } from 'ez-utils';

export async function socketAddBoosterPackInCart(
  roomId: string,
  dto: AddBoosterPackInCartDto,
): Promise<any> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_SALES,
    transports: ['websocket'],
  });
  const { start, stop } = useLoadingStore.getState();

  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);

    const cleanup = () => socketSvc.disconnect();

    socketSvc.on<any>(KT_ADD_BOOSTER_PACK_IN_CART_RESULT, (data) => {
      cleanup();
      stop();
      resolve(data);
    });
    socketSvc.on<string>(KT_ADD_BOOSTER_PACK_IN_CART_ERROR, (msg) => {
      cleanup();
      stop();
      reject(new Error(msg));
    });

    socketSvc.emit<AddBoosterPackInCartDto>(KT_ADD_BOOSTER_PACK_IN_CART, dto);
  });
}
