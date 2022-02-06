import { SET_OTODOMURL } from "./types";

export function setOtodomUrl(url) {
  return {
    type: SET_OTODOMURL,
    payload: url,
  };
}

// export async function setBooks() {
//   return async (dispatch, getState) => {
//     const options = getState().books_store.filters;
//     const limits = getState().books_store.limits;

//     const data = await axios
//       .post(
//         URL_API.getBooks,
//         { options, limits },
//         {
//           headers: authHeader(),
//         }
//       )
//       .then((response) => (response.length ? [] : response.data));

//     dispatch({
//       type: SET_BOOKS,
//       payload: data,
//     });
//   };
// }

// export function setFilter(option) {
//   return {
//     type: SET_FILTERS,
//     payload: option,
//   };
// }

// export function clearFilters() {
//   return {
//     type: CLEAR_FILTERS,
//   };
// }
