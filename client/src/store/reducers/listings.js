import { SET_LISTINGS } from "../actions/types";

const initialState = [];

const listingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTINGS:
      return action.payload;
    default:
      return state;
  }
};

export default listingsReducer;
