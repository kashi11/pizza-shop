import { GET_ERRORS, CLEAR_ERRORS, GET_ADD_ERRORS } from '../actions/types';
const initialState = {
    msg: {},
    status: null,
    addMsg: "",
}

// RETURN ERRORS
export default function(state = initialState,action) {
  switch (action.type) {
      case GET_ERRORS:
          return { 
              msg: action.payload.data.msg,
              status: action.payload.status,
            };
      case CLEAR_ERRORS:
          return { 
              msg: {},
              status: null,
            };
      case GET_ADD_ERRORS:
          return {
            status: action.payload.data.status,
            addMsg: action.payload.data.status,
          }
      default:
            return state;
  }
};

