// hooks/useSalesProducts.ts
import { useEffect, useState } from 'react';
import { SocketService } from '../services/socketService';
import {
  KT_GET_PRODUCTS,
  KT_GET_PRODUCTS_ERROR,
  KT_GET_PRODUCTS_RESULT,
  SOCKET_NAMESPACE_SALES,
} from '../constants/socketEvents';
import { GetProductsDto } from 'ez-utils';

export function useSalesProducts(
  roomId: string,
  query: GetProductsDto,
): { products: any[]; error: string | null } {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socketSvc = new SocketService({
      namespace: SOCKET_NAMESPACE_SALES,
      transports: ['websocket'],
    });

    socketSvc.connect();
    socketSvc.joinRoom(roomId);

    socketSvc.on<any[]>(KT_GET_PRODUCTS_RESULT, (data) => {
      console.log('Products received ', data);
      setProducts(data);
    });
    socketSvc.on<string>(KT_GET_PRODUCTS_ERROR, (msg) => {
      setError(msg);
    });

    // ask for products
    socketSvc.emit<GetProductsDto>(KT_GET_PRODUCTS, { ...query });

    return () => {
      socketSvc.disconnect();
    };
  }, [roomId, JSON.stringify(query)]);

  return { products, error };
}
