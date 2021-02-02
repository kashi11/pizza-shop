import axios from "axios";
import {
  FETCH_ORDERS,
  FETCH_MENU,
  CLEAR_MENU,
  DELETE_MENU,
  MENU_ADDED,
  CLEAR_ORDERS,
} from "./types";

export const fetchOrders = (part) => (dispatch) => {
  const config = {
    params: {
      id: part,
    },
  };
  axios
    .get("/orders", config)
    .then((response) => {
      dispatch({
        type: FETCH_ORDERS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: CLEAR_ORDERS
    })
    });
};
export const fetchMenu = (type) => (dispatch) => {
  const config = {
    params: {
      type: type,
    },
  };
  axios
    .get("/menu", config)
    .then((response) => {
      dispatch({
        type: FETCH_MENU,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

export const addMenu = (type, name, price) => (dispatch) => {
  const data = {
    type: type,
    name: name,
    price: price,
  };
  axios
    .post("/menu", data)
    .then((response) => {
      dispatch({
        type: MENU_ADDED,
      });
    })
    .catch((error) => console.log(error));
};

export const deleteMenu = (id) => (dispatch) => {
  const config = {
    params: {
      id: id,
    },
  };
  axios
    .delete("/menu", config)
    .then((response) => {
      dispatch({
        type: DELETE_MENU,
        id: id,
      });
    })
    .catch((error) => console.log(error));
};

export const clearMenu = () => (dispatch) => {
  return dispatch({
    type: CLEAR_MENU,
  });
};

export const clearOrders = () => (dispatch) => {
  return dispatch({
    type: CLEAR_ORDERS,
  });
};