import { combineReducers } from "redux";
import auth from "./auth_reducer";
import items from "./item_reducer";

export default combineReducers({
  auth,
  items,
});

