import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import { login, admin } from "../../actions/user";

import classes from "./Login.module.css";

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => setLoading(false), [data, loading]);

  const responseGoogle = async (response) => {
    dispatch(login(response, history));
  };

  const accessHandler = () => {
    dispatch(admin());
  };

  let renderItem = (
    <div className={classes.container}>
      <GoogleLogin
        clientId="688911498634-soou6j4frburft53lug9ursg0v9b2o6t.apps.googleusercontent.com"
        buttonText="Google Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        className={classes.button}
      />
      <label className={classes.label}>
        <input type="checkbox" onChange={accessHandler} />
        {"Admin access"}
      </label>
    </div>
  );

  return renderItem;
};

export default withRouter(Login);
