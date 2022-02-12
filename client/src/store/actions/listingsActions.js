import axios from "axios";
import {
  SUCCESS_LISTINGS,
  REQUEST_LISTINGS,
  ERROR_LISTING,
  SUCCESS_LISTINGS_SET,
} from "../actions/types";

export function getListings() {
  return async (dispatch, getState) => {
    dispatch({ type: REQUEST_LISTINGS });
    const groups = getState().settings.groups;
    const promises = await Object.values(groups).map((url) =>
      axios.post(
        "/api/flat",
        { url, limit: 60 },
        { headers: { "Content-Type": "application/json" } }
      )
    );
    try {
      const resolvedList = await Promise.all(promises);
      const listings = await resolvedList.map((data) => data.data);

      const currentListingStore = {};
      Object.entries(groups).forEach(([name], idx) => {
        const listngData = listings[idx];
        if (listngData.success) {
          currentListingStore[name] = listngData.data;
        }
      });
      console.log(currentListingStore);
      dispatch({ type: SUCCESS_LISTINGS_SET, payload: currentListingStore });
    } catch (err) {
      dispatch({ type: ERROR_LISTING, payload: err });
    }
  };
}
export function getListingsFromGroup(group) {
  return async (dispatch) => {
    dispatch({ type: REQUEST_LISTINGS });

    try {
      const url = group.url;
      const name = group.name;

      const data = await axios
        .post(
          "api/flat",
          { url, limit: 60 },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => res.data);

      if (data.success) {
        const listings = data.data;
        const payload = {
          listings,
          name,
        };
        console.log(payload);
        dispatch({ type: SUCCESS_LISTINGS, payload });
      }
    } catch (err) {
      dispatch({ type: ERROR_LISTING, payload: err });
    }
  };
}
