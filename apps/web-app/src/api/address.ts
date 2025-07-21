import {
  SOCKET_NAMESPACE_PERSON_PHYSICAL_ADDRESS,
  KT_CREATE_ADDRESS,
  KT_CREATE_ADDRESS_RESULT,
  KT_CREATE_ADDRESS_ERROR,
  KT_UPDATE_ADDRESS,
  KT_UPDATE_ADDRESS_RESULT,
  KT_UPDATE_ADDRESS_ERROR,
} from '../constants/socketEvents';
import { SocketService } from '../services/socketService';
import { useLoadingStore } from '../store/loadingStore';
import {
  CreatePhysicalAddressDto,
  UpdatePhysicalAddressDto,
  PhysicalAddressDto,
} from 'ez-utils';

export async function socketCreateAddress(
  roomId: string,
  dto: CreatePhysicalAddressDto,
): Promise<PhysicalAddressDto> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_PERSON_PHYSICAL_ADDRESS,
    transports: ['websocket'],
  });
  const { start, stop } = useLoadingStore.getState();
  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);
    const cleanup = () => socketSvc.disconnect();
    socketSvc.on<PhysicalAddressDto>(KT_CREATE_ADDRESS_RESULT, (data) => {
      cleanup();
      stop();
      resolve(data);
    });
    socketSvc.on<string>(KT_CREATE_ADDRESS_ERROR, (msg) => {
      cleanup();
      stop();
      reject(new Error(msg));
    });
    socketSvc.emit<CreatePhysicalAddressDto>(KT_CREATE_ADDRESS, dto);
  });
}

export async function socketUpdateAddress(
  roomId: string,
  dto: UpdatePhysicalAddressDto,
): Promise<PhysicalAddressDto> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_PERSON_PHYSICAL_ADDRESS,
    transports: ['websocket'],
  });
  const { start, stop } = useLoadingStore.getState();
  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);
    const cleanup = () => socketSvc.disconnect();
    socketSvc.on<PhysicalAddressDto>(KT_UPDATE_ADDRESS_RESULT, (data) => {
      cleanup();
      stop();
      resolve(data);
    });
    socketSvc.on<string>(KT_UPDATE_ADDRESS_ERROR, (msg) => {
      cleanup();
      stop();
      reject(new Error(msg));
    });
    socketSvc.emit<UpdatePhysicalAddressDto>(KT_UPDATE_ADDRESS, dto);
  });
}
