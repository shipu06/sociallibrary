import { SET_BOOKS, SET_FILTERS, CLEAR_FILTERS } from "../_actions/types";

const initialState = {
  books: [],
  filters: {
    searchPhrase: "",
    category: [],
    pages: [],
    year: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return { ...state, books: action.payload };
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case CLEAR_FILTERS:
      return { ...state, filters: initialState.filters };
    default:
      return state;
  }
}
