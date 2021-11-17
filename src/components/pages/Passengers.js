import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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

  console.log(parseValue);

  const onChangeFlight = (e) => {
    setFlight(e.target.value);
  };

  const onChangeFilter = (e) => {
    setFilterValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setParseValue(
      parseValue.length === 0
        ? []
        : parseValue.filter((item) => item.flightId === fName)
    );

    if (filterValue === 1) {
      setParseValue(
        parseValue.length === 0
          ? []
          : parseValue.filter((item) => item.flightId === fName)
      );
    }
    if (filterValue === 2) {
      setParseValue(
        parseValue.length === 0
          ? []
          : parseValue.filter((item) => item.passportNo.length === 0)
      );
    }
    if (filterValue === 3) {
      setParseValue(
        parseValue.length === 0
          ? []
          : parseValue.filter((item) => item.address.length === 0)
      );
    }
    if (filterValue === 4) {
      setParseValue(
        parseValue.length === 0
          ? []
          : parseValue.filter((item) => item.name.length !== 0)
      );
    }
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
        <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
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
          <button type="submit">Click to Filter</button>
        </form>
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
          {data.all_users.map((item) => (
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
                    dispatch(deletePassenger(item.id));
                    history.push("/manage");
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

export default Passengers;
