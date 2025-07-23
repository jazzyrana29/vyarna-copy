import {
  SOCKET_NAMESPACE_FINANCE_WALLET,
  KT_RECORD_TRANSACTION,
  KT_RECORD_TRANSACTION_RESULT,
  KT_RECORD_TRANSACTION_ERROR,
} from '../constants/socketEvents';
import { SocketService } from '../services/socketService';
import { useLoadingStore } from '../store/loadingStore';
import type { RecordTransactionDto, LedgerTransactionDto } from 'ez-utils';

export async function socketRecordTransaction(
  roomId: string,
  dto: RecordTransactionDto,
): Promise<LedgerTransactionDto> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_FINANCE_WALLET,
    transports: ['websocket'],
  });
  const { start, stop } = useLoadingStore.getState();
  return new Promise((resolve, reject) => {
    start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);
    const cleanup = () => socketSvc.disconnect();
    socketSvc.on<LedgerTransactionDto>(KT_RECORD_TRANSACTION_RESULT, (data) => {
      cleanup();
      stop();
      resolve(data);
    });
    socketSvc.on<string>(KT_RECORD_TRANSACTION_ERROR, (msg) => {
      cleanup();
      stop();
      reject(new Error(msg));
    });
    socketSvc.emit<RecordTransactionDto>(KT_RECORD_TRANSACTION, dto);
  });
}
