import {
  SUCCESS_LISTINGS,
  REQUEST_LISTINGS,
  ERROR_LISTING,
} from "../actions/types";

const initState = {
  data: [],
  loading: true,
  success: false,
  err: {},
};

const listingsReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_LISTINGS:
      return { ...state, loading: true };
    case SUCCESS_LISTINGS:
      return { ...state, loading: false, success: true, data: action.payload };
    case ERROR_LISTING:
      return { ...state, loading: false, success: false, err: action.payload };
    default:
      return state;
  }
};

export default listingsReducer;
