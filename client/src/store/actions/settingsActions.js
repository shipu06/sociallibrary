import { SET_OTODOMURL } from "./types";
import { getListings } from "./listingsActions";

export function setOtodomUrl(url) {
  return async (dispatch) => {
    dispatch({
      type: SET_OTODOMURL,
      payload: url,
    });
    dispatch(getListings());
  };
}
