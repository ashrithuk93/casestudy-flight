import { LOGIN, LOGOUT, ADMIN, LOAD_USER } from "./types";

export const loadUser = () => (dispatch) => {
  dispatch({ type: LOAD_USER });
};

export const login = (response, history) => async (dispatch) => {
  const accessToken = await response.Zb.access_token;

  try {
    if (accessToken && !response.error) {
      dispatch({ type: LOGIN });
      history.push("/flight");
    } else {
      throw Error("Login Failed");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const admin = () => (dispatch) => {
  dispatch({ type: ADMIN });
};
