import Axios from "axios";
import {
  STORE_CREATE_FAIL,
  STORE_CREATE_REQUEST,
  STORE_CREATE_SUCCESS,
  STORE_DETAILS_FAIL,
  STORE_DETAILS_REQUEST,
  STORE_DETAILS_SUCCESS,
  STORE_LIST_FAIL,
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
} from "../constants/storeConstans";

export const listStores = () => async (dispatch) => {
  dispatch({
    type: STORE_LIST_REQUEST,
  });

  try {
    const { data } = await Axios.get("api/store");
    dispatch({
      type: STORE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STORE_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const detailsStore = (storeId) => async (dispatch) => {
  dispatch({
    type: STORE_DETAILS_REQUEST,
    payload: storeId,
  });

  try {
    const { data } = await Axios.get(`/api/store/${storeId}`);
    dispatch({
      type: STORE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STORE_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const createStore = (store) => async (dispatch, getState) => {
  dispatch({ type: STORE_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post("/api/store", store, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: STORE_CREATE_SUCCESS,
      payload: data.store,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: STORE_CREATE_FAIL, payload: message });
  }
};
