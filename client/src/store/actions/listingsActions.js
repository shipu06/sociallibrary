import axios from "axios";
import {
  SUCCESS_LISTINGS,
  REQUEST_LISTINGS,
  ERROR_LISTING,
} from "../actions/types";
import { updateFiltered } from "./filteredActions";

export function getListings() {
  return async (dispatch, getState) => {
    dispatch({ type: REQUEST_LISTINGS });

    try {
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
        dispatch(updateFiltered(listings));
        dispatch({ type: SUCCESS_LISTINGS, payload: listings });
      }
    } catch (err) {
      dispatch({ type: ERROR_LISTING, payload: err });
    }
  };
}
