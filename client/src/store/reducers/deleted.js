import { SET_DELETED, ADD_DELETED, REMOVE_DELETED } from "../actions/types";

const initialState = [];

const deletedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DELETED:
      return action.payload;
    case ADD_DELETED:
      const url = action.payload;
      if (!state.includes(url)) {
        return [...state, url];
      }
      return state;
    case REMOVE_DELETED:
      const urlToUndelete = action.payload;
      const newState = state.filter((url) => url !== urlToUndelete);
      return newState;
    default:
      return state;
  }
};

export default deletedReducer;
