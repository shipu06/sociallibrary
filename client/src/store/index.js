import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import { getListings } from "./actions/listingsActions";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(
  rootReducer,
  loadFromLocalStorage(),
  composedEnhancer
);

export default store;

// Local storage settings
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

function saveToLocalStorage(state) {
  const itemsToLocalStorage = ["settings", "deleted", "saved"];
  try {
    const stateToSave = {};

    itemsToLocalStorage.forEach((item) => {
      if (item in state) {
        stateToSave[item] = state[item];
      }
    });

    const serialisedState = JSON.stringify(stateToSave);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

store.subscribe(() => saveToLocalStorage(store.getState()));

// Init store
store.dispatch(getListings());
