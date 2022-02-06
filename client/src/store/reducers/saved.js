import { SET_SAVED, ADD_SAVED, REMOVE_SAVED } from "../actions/types";

const initialState = [];

const savedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SAVED:
      return action.payload;
    case ADD_SAVED:
      const listing = action.payload;
      if (!state.some((item) => item.link === listing.link)) {
        return [...state, listing];
      }
      return state;
    case REMOVE_SAVED:
      const listingToUnsave = action.payload;
      const newState = state.filter((item) => item.url !== listingToUnsave.url);
      return newState;
    default:
      return state;
  }
};

export default savedReducer;
