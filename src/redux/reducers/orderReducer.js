import {
  FETCH_ORDERS,
  FETCH_MENU,
  CLEAR_MENU,
  DELETE_MENU,
  MENU_ADDED,
  CLEAR_ORDERS,
  ORDER_COMPLETED,
} from "../actions/types";
const initialState = {
  orders: [],
  menu: [],
  loading: false,
  added: false,
  compl: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        compl: false,
        orders: action.payload,
      };
    case FETCH_MENU:
      return {
        ...state,
        added: false,
        menu: action.payload,
      };
    case CLEAR_MENU:
      return {
        ...state,
        menu: [],
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: [],
      };
    case DELETE_MENU:
      return {
        ...state,
        menu: state.menu.filter((item) => item._id !== action.id),
      };
    case MENU_ADDED:
      return {
        ...state,
        added: true,
      };
    case ORDER_COMPLETED:
      return {
        ...state,
        compl: true,
      }
    default:
      return state;
  }
}
