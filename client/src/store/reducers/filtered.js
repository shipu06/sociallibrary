import { SET_FILTERED, UPDATE_FILTERED } from "../actions/types";

const initState = [];

const filteredReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FILTERED:
      return action.payload;
    case UPDATE_FILTERED:
      return state;
    default:
      return state;
  }
};

export default filteredReducer;
