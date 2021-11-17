import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadAllPassengers, loadFlight } from "../../actions/flight";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Select.module.css";

import Layout from "../UI/Layout";

const Select = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFlight());
    dispatch(loadAllPassengers());
  }, []);

  const data = useSelector((state) => state.flightReducer);

  return data.loading ? (
    <LoadingSpinner />
  ) : (
    <Layout>
      <div className={classes.list}>
        <h3 className={classes.header}>Select Flight from the list</h3>
        <ul>
          {data.flight.map((flight) => (
            <li
              key={flight.id}
              onClick={() => {
                history.push(`/flight/${flight.id}`);
              }}
            >
              {flight.name} ({flight.from} to {flight.to})
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Select;
