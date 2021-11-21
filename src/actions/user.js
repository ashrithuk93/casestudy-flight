import { LOGIN, LOGOUT, ADMIN, LOAD_USER } from "./types";

export const loadUser = () => (dispatch) => {
  dispatch({ type: LOAD_USER });
};

export const login = (response, history) => (dispatch) => {
  if (response.tokenObj.access_token) {
    dispatch({ type: LOGIN });
    history.push("/flight");
  } else {
    console.log("Login Failed");
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const admin = () => (dispatch) => {
  dispatch({ type: ADMIN });
};
