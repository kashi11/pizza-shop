import axios from "axios";
import { FETCH_MENU, ORDER_MADE } from "./types";
export const fetchMenu = () => (dispatch) => {
  axios
    .get("http://localhost:5000/menu/cust")
    .then((response) => {
      dispatch({
        type: FETCH_MENU,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

export const makeOrder = (order) => (dispatch) => {
  axios
    .post("http://localhost:5000/orders",order)
    .then((response) => {
      dispatch({
        type: ORDER_MADE
      })
    })
    .catch((error) => {
     console.log("need");
    });
};