// hooks/useSalesCommerce.ts
import { useEffect, useState } from 'react';
import { SocketService } from '../services/socketService';
import {
  KT_GET_PRODUCTS,
  KT_GET_PRODUCTS_ERROR,
  KT_GET_PRODUCTS_RESULT,
  SOCKET_NAMESPACE_SALES,
  KT_CREATE_CART,
  KT_CREATE_CART_RESULT,
  KT_CREATE_CART_ERROR,
  KT_ADD_CART_ITEM,
  KT_ADD_CART_ITEM_RESULT,
  KT_ADD_CART_ITEM_ERROR,
} from '../constants/socketEvents';
import {
  GetProductsDto,
  CreateCartDto,
  CreateCartItemDto,
  CartDto,
  CartItemDto,
} from 'ez-utils';

export function useSalesCommerce(
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
      console.log('Error received ', msg);
      setError(msg);
    });

    // ask for products
    socketSvc.emit<GetProductsDto>(KT_GET_PRODUCTS, { ...query });

    //...add more connection of this name space here

    return (): void => {
      socketSvc.disconnect();
    };
  }, [roomId, JSON.stringify(query)]);

  return { products, error };
}

export async function socketCreateCart(
  roomId: string,
  dto: CreateCartDto,
): Promise<CartDto> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_SALES,
    transports: ['websocket'],
  });

  return new Promise((resolve, reject) => {
    socketSvc.connect();
    socketSvc.joinRoom(roomId);

    const cleanup = () => socketSvc.disconnect();

    socketSvc.on<CartDto>(KT_CREATE_CART_RESULT, (data) => {
      cleanup();
      resolve(data);
    });
    socketSvc.on<string>(KT_CREATE_CART_ERROR, (msg) => {
      cleanup();
      reject(new Error(msg));
    });

    socketSvc.emit<CreateCartDto>(KT_CREATE_CART, dto);
  });
}

export async function socketAddCartItem(
  roomId: string,
  dto: CreateCartItemDto,
): Promise<CartItemDto> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_SALES,
    transports: ['websocket'],
  });

  return new Promise((resolve, reject) => {
    socketSvc.connect();
    socketSvc.joinRoom(roomId);

    const cleanup = () => socketSvc.disconnect();

    socketSvc.on<CartItemDto>(KT_ADD_CART_ITEM_RESULT, (data) => {
      cleanup();
      resolve(data);
    });
    socketSvc.on<string>(KT_ADD_CART_ITEM_ERROR, (msg) => {
      cleanup();
      reject(new Error(msg));
    });

    socketSvc.emit<CreateCartItemDto>(KT_ADD_CART_ITEM, dto);
  });
}

