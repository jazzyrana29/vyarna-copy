// constants/socketEvents.ts
export const RESULT = `result`;
export const ERROR = `result`;

export const SOCKET_NAMESPACE_SALES = 'sales-commerce';
export const KT_GET_PRODUCTS = 'get-products';
export const KT_GET_PRODUCTS_RESULT = `${KT_GET_PRODUCTS}-${RESULT}`;
export const KT_GET_PRODUCTS_ERROR = `${KT_GET_PRODUCTS}-${ERROR}`;

export const SOCKET_NAMESPACE_PERSON_IDENTITY = 'person-identity';
export const KT_GET_CONTACT = 'create-person-entity';
export const KT_GET_CONTACT_RESULT = `${KT_GET_CONTACT}-${RESULT}`;
export const KT_GET_CONTACT_ERROR = `${KT_GET_CONTACT}-${ERROR}`;
