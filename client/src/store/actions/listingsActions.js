import axios from "axios";
import { SET_LISTINGS } from "../actions/types";

export function setListings(listings) {
  return {
    type: SET_LISTINGS,
    payload: listings,
  };
}

export function getListings() {
  return async (dispatch, getState) => {
    const url = getState().settings.otodomUrl;

    const data = await axios
      .post(
        "api/flat",
        { url, limit: 60 },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => res.data);
    if (data.success) {
      const listings = data.data;
      dispatch(setListings(listings));
    }
  };
}
