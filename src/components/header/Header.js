import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FlightIcon from "@material-ui/icons/Flight";
import { logout } from "../../actions/user";

import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const login = useSelector((state) => state.userReducer.loggedIn);

  const auth = useSelector((state) => state.userReducer.auth);

  console.log(login, auth, "logged in");

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <header>
      <nav className={classes.header}>
        <div className={classes.title}>
          <h3>
            <FlightIcon style={{ height: 20, width: 20 }} />{" "}
            <span className="hide-sm">Check-In</span>
          </h3>
        </div>
        <div className={classes.manage}>
          {login && (
            <div
              className={classes.button}
              onClick={() => history.push("/flight")}
            >
              <i className="fa fa-home" aria-hidden="true"></i>{" "}
              <span className="hide-sm">Home</span>
            </div>
          )}

          {login && auth && (
            <div
              className={classes.button}
              onClick={() => history.push("/manage")}
            >
              <i className="fa fa-tasks" aria-hidden="true"></i>{" "}
              <span className="hide-sm">Manage</span>
            </div>
          )}

          {login && (
            <div className={classes.button} onClick={logoutHandler}>
              <i className="fa fa-sign-out" aria-hidden="true"></i>{" "}
              <span className="hide-sm">Logout</span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
