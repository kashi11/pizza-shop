import axios from "axios";
import { ORDER_COMPLETED, CLEAR_ORDERS } from "./types";
export const completeOrder = (id) => (dispatch) => {
  const data = {
          id: id,
  }
  axios
    .put("/orders",data,{})
    .then((response) => {
      dispatch({
        type: ORDER_COMPLETED,
      });
    })
    .catch((error) => {
        dispatch({
            type: CLEAR_ORDERS
        })
    });
};
