import { combineReducers } from "redux";
import flight from "./flight";
import user from "./user";

export default combineReducers({
  flightReducer: flight,
  userReducer: user,
});
