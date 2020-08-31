import { SET_BOOKS, SET_FILTERS, CLEAR_FILTERS } from "./types";
import axios from "axios";
import { authHeader } from "../utils/authHeader";

export async function setBooks() {
  return async (dispatch, getState) => {
    const options = getState().books_store.filters;

    const request = await axios
      .post(`/api/books`, options, {
        headers: authHeader(),
      })
      .then((response) => response.data);

    dispatch({
      type: SET_BOOKS,
      payload: request,
    });
  };
}

export function setFilter(option) {
  return {
    type: SET_FILTERS,
    payload: option,
  };
}

export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}
