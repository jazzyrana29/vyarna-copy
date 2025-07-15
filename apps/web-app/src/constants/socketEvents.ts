// constants/socketEvents.ts
export const RESULT = `result`;
export const ERROR = `error`;

export const SOCKET_NAMESPACE_SALES = 'sales-commerce';
export const KT_GET_PRODUCTS = 'get-products';
export const KT_GET_PRODUCTS_RESULT = `${KT_GET_PRODUCTS}-${RESULT}`;
export const KT_GET_PRODUCTS_ERROR = `${KT_GET_PRODUCTS}-${ERROR}`;

export const KT_CREATE_CART = 'create-cart';
export const KT_CREATE_CART_RESULT = `${KT_CREATE_CART}-${RESULT}`;
export const KT_CREATE_CART_ERROR = `${KT_CREATE_CART}-${ERROR}`;

export const KT_ADD_CART_ITEM = 'add-cart-item';
export const KT_ADD_CART_ITEM_RESULT = `${KT_ADD_CART_ITEM}-${RESULT}`;
export const KT_ADD_CART_ITEM_ERROR = `${KT_ADD_CART_ITEM}-${ERROR}`;

export const SOCKET_NAMESPACE_PERSON_CONTACT = 'person-contact';
export const KT_GET_CONTACT = 'create-contact';
export const KT_GET_CONTACT_RESULT = `${KT_GET_CONTACT}-${RESULT}`;
export const KT_GET_CONTACT_ERROR = `${KT_GET_CONTACT}-${ERROR}`;
