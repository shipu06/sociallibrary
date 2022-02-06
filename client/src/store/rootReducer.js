import { combineReducers } from "redux";
import settings from "./reducers/settings";
import deleted from "./reducers/deleted";
import saved from "./reducers/saved";
import listings from "./reducers/listings";

const rootReducer = combineReducers({
  settings,
  deleted,
  saved,
  listings,
});

export default rootReducer;
