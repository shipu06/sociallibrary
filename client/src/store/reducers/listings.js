import {
  SUCCESS_LISTINGS,
  REQUEST_LISTINGS,
  ERROR_LISTING,
  SUCCESS_LISTINGS_SET,
} from "../actions/types";

const initState = {
  groups: {},
  loading: true,
  success: false,
  err: {},
};

const listingsReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_LISTINGS:
      return { ...state, loading: true };
    case SUCCESS_LISTINGS_SET:
      const groups = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        groups: { ...groups },
      };
    case SUCCESS_LISTINGS:
      const name = action.payload.name;
      const listings = action.payload.listings;
      return {
        ...state,
        loading: false,
        success: true,
        groups: { ...state.groups, [name]: listings },
      };
    case ERROR_LISTING:
      return { ...state, loading: false, success: false, err: action.payload };
    default:
      return state;
  }
};

export default listingsReducer;
