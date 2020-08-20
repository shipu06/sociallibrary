import { SET_BOOKS, SET_FILTERS, CLEAR_FILTERS } from "./types";
import axios from "axios";

export async function setBooks() {
  return async (dispatch, getState) => {
    const options = getState().books_store.filters;
    const request = await axios
      .post(`/api/user/books`, options)
      .then((response) => response.data);

    console.log(request);

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
