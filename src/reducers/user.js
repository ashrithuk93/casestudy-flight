import { LOGIN, LOGOUT, ADMIN } from "../actions/types";

const initialState = {
  loggedIn: false,
  auth: false,
};
export default function user(
  state = JSON.parse(localStorage.getItem("loginInfo")) === null
    ? initialState
    : JSON.parse(localStorage.getItem("loginInfo")),
  action
) {
  const { type } = action;

  if (type === LOGIN) {
    const updatedState = { ...state, loggedIn: true };
    localStorage.setItem("loginInfo", JSON.stringify(updatedState));
    return updatedState;
  }

  if (type === LOGOUT) {
    const updatedState = { loggedIn: false, auth: false };
    localStorage.setItem("loginInfo", JSON.stringify(updatedState));
    return updatedState;
  }

  if (type === ADMIN) {
    const updatedState = { ...state, auth: true };
    localStorage.setItem("loginInfo", JSON.stringify(updatedState));
    return updatedState;
  }

  return state;
}
