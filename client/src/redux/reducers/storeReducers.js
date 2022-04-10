import {
  STORE_CREATE_FAIL,
  STORE_CREATE_REQUEST,
  STORE_CREATE_RESET,
  STORE_CREATE_SUCCESS,
  STORE_DETAILS_FAIL,
  STORE_DETAILS_REQUEST,
  STORE_DETAILS_SUCCESS,
  STORE_LIST_FAIL,
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
} from "../constants/storeConstans";

export const storeListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case STORE_LIST_REQUEST:
      return { loading: true };

    case STORE_LIST_SUCCESS:
      return { loading: false, stores: action.payload };

    case STORE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storeDetailsReducer = (
  state = { loading: true, store: {} },
  action
) => {
  switch (action.type) {
    case STORE_DETAILS_REQUEST:
      return { loading: true };

    case STORE_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case STORE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const storeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_CREATE_REQUEST:
      return { loading: true };
    case STORE_CREATE_SUCCESS:
      return { loading: false, success: true, store: action.payload };
    case STORE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STORE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
