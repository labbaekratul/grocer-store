import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { categoryCreateReducer } from "./reducers/categoryReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
} from "./reducers/orderReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import {
  storeCreateReducer,
  storeDetailsReducer,
  storeListReducer,
} from "./reducers/storeReducers";
import {
  userRegisterReducer,
  userSigninReducer,
} from "./reducers/userReducers";
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  storeList: storeListReducer,
  storeCreate: storeCreateReducer,
  storeDetails: storeDetailsReducer,
  cart: cartReducer,
  categoryCreate: categoryCreateReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
