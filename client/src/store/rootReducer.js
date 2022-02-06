import { combineReducers } from "redux";
import settings from "./reducers/settings";
import deleted from "./reducers/deleted";
import saved from "./reducers/saved";

const rootReducer = combineReducers({
  settings,
  deleted,
  saved,
});

export default rootReducer;
