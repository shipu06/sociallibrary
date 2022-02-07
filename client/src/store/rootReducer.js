import { combineReducers } from "redux";

import settings from "./reducers/settings";
import deleted from "./reducers/deleted";
import saved from "./reducers/saved";
import listings from "./reducers/listings";
import filtered from "./reducers/filtered";

const rootReducer = combineReducers({
  settings,
  deleted,
  saved,
  listings,
  filtered
});

export default rootReducer;
