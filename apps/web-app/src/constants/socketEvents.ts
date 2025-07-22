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

export const KT_CREATE_SESSION = 'create-session';
export const KT_CREATE_SESSION_RESULT = `${KT_CREATE_SESSION}-${RESULT}`;
export const KT_CREATE_SESSION_ERROR = `${KT_CREATE_SESSION}-${ERROR}`;
export const KT_UPDATE_SESSION = 'update-session';
export const KT_UPDATE_SESSION_RESULT = `${KT_UPDATE_SESSION}-${RESULT}`;
export const KT_UPDATE_SESSION_ERROR = `${KT_UPDATE_SESSION}-${ERROR}`;
export const KT_GET_SESSION = 'get-session';
export const KT_GET_SESSION_RESULT = `${KT_GET_SESSION}-${RESULT}`;
export const KT_GET_SESSION_ERROR = `${KT_GET_SESSION}-${ERROR}`;
export const KT_DELETE_SESSION = 'delete-session';
export const KT_DELETE_SESSION_RESULT = `${KT_DELETE_SESSION}-${RESULT}`;
export const KT_DELETE_SESSION_ERROR = `${KT_DELETE_SESSION}-${ERROR}`;
export const KT_LOGIN_SESSION = 'login-session';
export const KT_LOGIN_SESSION_RESULT = `${KT_LOGIN_SESSION}-${RESULT}`;
export const KT_LOGIN_SESSION_ERROR = `${KT_LOGIN_SESSION}-${ERROR}`;

export const KT_ADD_CART_ITEM = 'add-cart-item';
export const KT_ADD_CART_ITEM_RESULT = `${KT_ADD_CART_ITEM}-${RESULT}`;
export const KT_ADD_CART_ITEM_ERROR = `${KT_ADD_CART_ITEM}-${ERROR}`;

export const KT_REMOVE_CART_ITEM = 'remove-cart-item';
export const KT_REMOVE_CART_ITEM_RESULT = `${KT_REMOVE_CART_ITEM}-${RESULT}`;
export const KT_REMOVE_CART_ITEM_ERROR = `${KT_REMOVE_CART_ITEM}-${ERROR}`;

export const KT_APPLY_CART_PROMOTION = 'apply-cart-promotion';
export const KT_APPLY_CART_PROMOTION_RESULT = `${KT_APPLY_CART_PROMOTION}-${RESULT}`;
export const KT_APPLY_CART_PROMOTION_ERROR = `${KT_APPLY_CART_PROMOTION}-${ERROR}`;

export const KT_GET_CART = 'get-cart';
export const KT_GET_CART_RESULT = `${KT_GET_CART}-${RESULT}`;
export const KT_GET_CART_ERROR = `${KT_GET_CART}-${ERROR}`;

export const KT_RESET_CART = 'reset-cart';
export const KT_RESET_CART_RESULT = `${KT_RESET_CART}-${RESULT}`;
export const KT_RESET_CART_ERROR = `${KT_RESET_CART}-${ERROR}`;

export const KT_ADD_BOOSTER_PACK_IN_CART = 'add-booster-pack-in-cart';
export const KT_ADD_BOOSTER_PACK_IN_CART_RESULT = `${KT_ADD_BOOSTER_PACK_IN_CART}-${RESULT}`;
export const KT_ADD_BOOSTER_PACK_IN_CART_ERROR = `${KT_ADD_BOOSTER_PACK_IN_CART}-${ERROR}`;

export const SOCKET_NAMESPACE_PERSON_IDENTITY = 'person-identity';
export const SOCKET_NAMESPACE_PERSON_SESSION = 'person-session';
export const SOCKET_NAMESPACE_PERSON_PHYSICAL_ADDRESS =
  'person-physical-address';
export const KT_CREATE_PERSON = 'create-person-entity';
export const KT_CREATE_PERSON_RESULT = `${KT_CREATE_PERSON}-${RESULT}`;
export const KT_CREATE_PERSON_ERROR = `${KT_CREATE_PERSON}-${ERROR}`;
export const KT_CREATE_ADDRESS = 'create-physical-address';
export const KT_CREATE_ADDRESS_RESULT = `${KT_CREATE_ADDRESS}-${RESULT}`;
export const KT_CREATE_ADDRESS_ERROR = `${KT_CREATE_ADDRESS}-${ERROR}`;
export const KT_UPDATE_ADDRESS = 'update-physical-address';
export const KT_UPDATE_ADDRESS_RESULT = `${KT_UPDATE_ADDRESS}-${RESULT}`;
export const KT_UPDATE_ADDRESS_ERROR = `${KT_UPDATE_ADDRESS}-${ERROR}`;
export const KT_GET_ADDRESS = 'get-physical-address';
export const KT_GET_ADDRESS_RESULT = `${KT_GET_ADDRESS}-${RESULT}`;
export const KT_GET_ADDRESS_ERROR = `${KT_GET_ADDRESS}-${ERROR}`;

export const SOCKET_NAMESPACE_FINANCE_PAYMENTS = 'finance-payments';
export const KT_CREATE_PAYMENT_INTENT = 'create-payment-intent';
export const KT_CREATE_PAYMENT_INTENT_RESULT = `${KT_CREATE_PAYMENT_INTENT}-${RESULT}`;
export const KT_CREATE_PAYMENT_INTENT_ERROR = `${KT_CREATE_PAYMENT_INTENT}-${ERROR}`;
export const KT_CONFIRM_PAYMENT_INTENT = 'confirm-payment-intent';
export const KT_CONFIRM_PAYMENT_INTENT_RESULT = `${KT_CONFIRM_PAYMENT_INTENT}-${RESULT}`;
export const KT_CONFIRM_PAYMENT_INTENT_ERROR = `${KT_CONFIRM_PAYMENT_INTENT}-${ERROR}`;
