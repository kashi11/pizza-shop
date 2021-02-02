import { combineReducers } from "redux";
import fetchOrdersReducer from "./orderReducer"
import errorReducer from "./errorReducer";
export default combineReducers({
    error: errorReducer,
    fetch: fetchOrdersReducer,
})