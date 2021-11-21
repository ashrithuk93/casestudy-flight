import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  deletePassenger,
  loadAllPassengers,
  currentUser,
  loadFlight,
} from "../../actions/flight";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Passengers.module.css";

const Passengers = () => {
  const [fName, setFlight] = useState("f1");
  const [filterValue, setFilterValue] = useState(1);
  const [filterBar, setFilterBar] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.flightReducer);
  const auth = useSelector((state) => state.userReducer.auth);

  const [parseValue, setParseValue] = useState(
    data.loading ? [] : data.all_users
  );

  useEffect(() => {
    dispatch(loadAllPassengers());
    dispatch(loadFlight());

    setParseValue(data.loading ? [] : data.all_users);
  }, [data.loading]);

  const onChangeFlight = (e) => {
    setFlight(e.target.value);
  };

  const onChangeFilter = (e) => {
    setFilterValue(e.target.value);
  };

  const submitHandler = () => {
    if (Number(filterValue) === 1) {
      setParseValue(
        data.all_users.length === 0
          ? []
          : data.all_users.filter((item) => item.flightId === fName)
      );
    }
    if (Number(filterValue) === 2) {
      setParseValue(
        data.all_users.length === 0
          ? []
          : data.all_users.filter(
              (item) => item.passportNo.length === 0 && item.flightId === fName
            )
      );
    }
    if (Number(filterValue) === 3) {
      setParseValue(
        data.all_users.length === 0
          ? []
          : data.all_users.filter(
              (item) => item.address.length === 0 && item.flightId === fName
            )
      );
    }
    if (Number(filterValue) === 4) {
      setParseValue(
        data.all_users.length === 0
          ? []
          : data.all_users.filter(
              (item) => item.name.length !== 0 && item.flightId === fName
            )
      );
    }

    dispatch(loadAllPassengers());
  };

  return data.loading ? (
    <LoadingSpinner />
  ) : (
    <Fragment>
      <div
        className={classes["filter-bar"]}
        onClick={() => setFilterBar(!filterBar)}
      >
        {filterBar ? "Hide filter" : "Show filter"}
      </div>

      {filterBar && (
        <div className={classes.form}>
          <div>
            <p>
              Choose Flight:{" "}
              <select
                name="flight"
                value={fName}
                onChange={(e) => onChangeFlight(e)}
              >
                {data.flight.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </p>
            <p>
              Filter by:{" "}
              <select
                name="flight"
                value={filterValue}
                onChange={(e) => onChangeFilter(e)}
              >
                <option value={1}>None</option>
                <option value={2}>Missing Passport</option>
                <option value={3}>Missing Address</option>
                <option value={4}>Booked</option>
              </select>
            </p>
          </div>
          <button type="submit" onClick={submitHandler}>
            Click to Filter
          </button>
        </div>
      )}

      <table className={classes.customers}>
        <tbody>
          <tr>
            <th>Flight ID</th>
            <th>Seat number</th>
            <th>Name</th>
            <th>Ancillary</th>
            <th></th>
            {auth ? <th></th> : null}
          </tr>
          {parseValue.map((item) => (
            <tr key={item.id}>
              <td>{item.flightId}</td>
              <td>{item.seat}</td>
              <td>{item.name}</td>
              <td>
                {item.name.length > 0 && (
                  <p>Wheel-chair: {item.disabled ? "Yes" : "No"}</p>
                )}
                {item.name.length > 0 && (
                  <p>With infant: {item.infant ? "Yes" : "No"}</p>
                )}
              </td>
              {item.name.length > 0 ? (
                <td
                  onClick={async () => {
                    await dispatch(currentUser(item.id));
                    history.push(`/bookings/${fName}/${item.id}`);
                  }}
                >
                  <EditIcon />
                </td>
              ) : (
                <td
                  onClick={async () => {
                    await dispatch(currentUser(item.id));
                    history.push(`/bookings/${fName}/${item.id}`);
                    window.location.reload(false);
                  }}
                >
                  <button type="button" disabled={auth ? false : true}>
                    Book Now
                  </button>
                </td>
              )}
              {item.name.length > 0 && auth ? (
                <td
                  onClick={() => {
                    dispatch(deletePassenger(item.id, history));
                    window.location.reload(false);
                  }}
                >
                  <DeleteIcon />
                </td>
              ) : auth ? (
                <td></td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default withRouter(Passengers);
