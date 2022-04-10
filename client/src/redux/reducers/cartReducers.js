import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstans";

export const cartReducer = (state = { cartItem: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const exisItem = state.cartItem.find((x) => x.product === item.product);

      if (exisItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((x) =>
            x.product === exisItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItem: [...state.cartItem, item] };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter((x) => x.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_EMPTY:
      return { ...state, cartItem: [] };
    default:
      return state;
  }
};
