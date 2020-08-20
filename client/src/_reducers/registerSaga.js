import { takeEvery } from "redux-saga/effects";
import { setBooks } from "../_actions/books_actions";
import { SET_FILTERS } from "../_actions/types.js";

export default function* registerSaga(store) {
  yield takeEvery(SET_FILTERS, () => {
    store.dispatch(setBooks());
  });
}
