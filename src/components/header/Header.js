import React from "react";
import { Link, useHistory } from "react-router-dom";
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

  const authLinks = (
    <ul>
      <li>
        <Link to="/flight">
          <i className="fas fa-home"></i> <span className="hide-sm">Home</span>
        </Link>
      </li>
      <li>
        <Link to="/manage">
          <i className="fas fa-tasks"></i>{" "}
          <span className="hide-sm">Manage</span>
        </Link>
      </li>
      <li>
        <a onClick={logoutHandler} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/flight">
          <i className="fas fa-home"></i> <span className="hide-sm">Home</span>
        </Link>
      </li>
      <li>
        <a onClick={logoutHandler} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className={classes.navbar}>
      <h3>
        <FlightIcon style={{ height: 20, width: 20 }} />{" "}
        <span className="hide-sm">Check-In</span>
      </h3>
      {login && !auth && guestLinks}
      {login && auth && authLinks}
    </nav>
  );
};

export default Header;
