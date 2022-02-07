import { SET_FILTERED } from "../actions/types";

const substractArray = (A, B) => {
  return A.filter((n) => !B.includes(n.link));
};

export function setFiltered(savedListings) {
  return {
    type: SET_FILTERED,
    payload: savedListings,
  };
}

export function updateFiltered(customListings = false) {
  return (dispatch, getState) => {
    const listings = customListings || getState().listings.data;
    const saved = getState().saved;
    const deleted = getState().deleted;

    const filteredListingList = substractArray(listings, [
      ...deleted,
      ...saved.map((i) => i.link),
    ]);

    dispatch(setFiltered(filteredListingList));
  };
}
