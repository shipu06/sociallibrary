import { SET_SAVED, ADD_SAVED, REMOVE_SAVED } from "../actions/types";

export function setSaved(savedListings) {
  return {
    type: SET_SAVED,
    payload: savedListings,
  };
}

export function addSaved(listing) {
  return {
    type: ADD_SAVED,
    payload: listing,
  };
}

export function removeSaved(listing) {
  return {
    type: REMOVE_SAVED,
    payload: listing,
  };
}
