import { SET_GROUP, DELETE_GROUP, EDIT_GROUP } from "./types";
import { getListings } from "./listingsActions";

export function setGroup(name, url) {
  return async (dispatch) => {
    dispatch({
      type: SET_GROUP,
      payload: { name, url },
    });
    dispatch(getListings({ name, url }));
  };
}

export function deleteGroup(name) {
  return async (dispatch) => {
    dispatch({
      type: DELETE_GROUP,
      payload: name,
    });
    // dispatch(getListings());
  };
}

export function editGroup(name, editedGroup) {
  return async (dispatch) => { 
    dispatch({
      type: EDIT_GROUP,
      payload: { name, editedGroup },
    });

    dispatch(getListings());
  };
}
