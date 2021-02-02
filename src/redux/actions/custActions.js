import axios from "axios";
import { FETCH_MENU } from "./types";
export const fetchMenu = () => (dispatch) => {
  axios
    .get("/menu/cust")
    .then((response) => {
      dispatch({
        type: FETCH_MENU,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
};

export const makeOrder = (order) => (dispatch) => {
  console.log(order);
  axios
    .post("/orders",order)
    .then((response) => {
      console.log("need to be adjust");
    })
    .catch((error) => console.log(error));
};