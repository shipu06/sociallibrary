import { SET_DELETED, ADD_DELETED, REMOVE_DELETED } from "../actions/types";

export function setDeleted(deletedUrls) {
  return {
    type: SET_DELETED,
    payload: deletedUrls,
  };
}

export function addDeleted(url) {
  return {
    type: ADD_DELETED,
    payload: url,
  };
}

export function removeDeleted(url) {
  return {
    type: REMOVE_DELETED,
    payload: url,
  };
}
