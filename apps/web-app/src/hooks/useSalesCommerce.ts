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
  KT_REMOVE_CART_ITEM,
  KT_REMOVE_CART_ITEM_RESULT,
  KT_REMOVE_CART_ITEM_ERROR,
} from '../constants/socketEvents';
import {
  GetProductsDto,
  CreateCartDto,
  CreateCartItemDto,
  DeleteCartItemDto,
  CartDto,
  CartItemDto,
  ProductDto,
} from 'ez-utils';
import { useLoadingStore } from '../store/loadingStore';

export function useSalesCommerce(
  roomId: string,
  query: GetProductsDto,
): { products: any[]; error: string | null } {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    socketGetProducts(roomId, query)
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch((e) => {
        if (!ignore) setError(e.message || String(e));
      });
    return () => {
      ignore = true;
    };
  }, [roomId, JSON.stringify(query)]);

  return { products, error };
}

export async function socketGetProducts(
  roomId: string,
  query: GetProductsDto,
): Promise<ProductDto[]> {
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

    socketSvc.on<ProductDto[]>(KT_GET_PRODUCTS_RESULT, (data) => {
      cleanup();
      stop();
      resolve(data);
    });
    socketSvc.on<string>(KT_GET_PRODUCTS_ERROR, (msg) => {
      cleanup();
      stop();
      reject(new Error(msg));
    });

    socketSvc.emit<GetProductsDto>(KT_GET_PRODUCTS, { ...query });
  });
}


export async function socketCreateCart(
  roomId: string,
  dto: CreateCartDto,
  opts?: { skipLoading?: boolean },
): Promise<CartDto> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_SALES,
    transports: ['websocket'],
  });
  const { start, stop } = useLoadingStore.getState();

  return new Promise((resolve, reject) => {
    if (!opts?.skipLoading) start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);

    const cleanup = () => socketSvc.disconnect();

    socketSvc.on<CartDto>(KT_CREATE_CART_RESULT, (data) => {
      cleanup();
      if (!opts?.skipLoading) stop();
      resolve(data);
    });
    socketSvc.on<string>(KT_CREATE_CART_ERROR, (msg) => {
      cleanup();
      if (!opts?.skipLoading) stop();
      reject(new Error(msg));
    });

    socketSvc.emit<CreateCartDto>(KT_CREATE_CART, dto);
  });
}

export async function socketAddCartItem(
  roomId: string,
  dto: CreateCartItemDto,
  opts?: { skipLoading?: boolean },
): Promise<CartItemDto> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_SALES,
    transports: ['websocket'],
  });
  const { start, stop } = useLoadingStore.getState();

  return new Promise((resolve, reject) => {
    if (!opts?.skipLoading) start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);

    const cleanup = () => socketSvc.disconnect();

    socketSvc.on<CartItemDto>(KT_ADD_CART_ITEM_RESULT, (data) => {
      cleanup();
      if (!opts?.skipLoading) stop();
      resolve(data);
    });
    socketSvc.on<string>(KT_ADD_CART_ITEM_ERROR, (msg) => {
      cleanup();
      if (!opts?.skipLoading) stop();
      reject(new Error(msg));
    });

    socketSvc.emit<CreateCartItemDto>(KT_ADD_CART_ITEM, dto);
  });
}

export async function socketRemoveCartItem(
  roomId: string,
  dto: DeleteCartItemDto,
  opts?: { skipLoading?: boolean },
): Promise<void> {
  const socketSvc = new SocketService({
    namespace: SOCKET_NAMESPACE_SALES,
    transports: ['websocket'],
  });
  const { start, stop } = useLoadingStore.getState();

  return new Promise((resolve, reject) => {
    if (!opts?.skipLoading) start();
    socketSvc.connect();
    socketSvc.joinRoom(roomId);

    const cleanup = () => socketSvc.disconnect();

    socketSvc.on<void>(KT_REMOVE_CART_ITEM_RESULT, () => {
      cleanup();
      if (!opts?.skipLoading) stop();
      resolve();
    });
    socketSvc.on<string>(KT_REMOVE_CART_ITEM_ERROR, (msg) => {
      cleanup();
      if (!opts?.skipLoading) stop();
      reject(new Error(msg));
    });

    socketSvc.emit<DeleteCartItemDto>(KT_REMOVE_CART_ITEM, dto);
  });
}

