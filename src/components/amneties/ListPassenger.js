import React, { Fragment, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadPassenger } from "../../actions/flight";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./ChangeSeat.module.css";

function ListPassenger() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPassenger(params.id));
  }, []);

  const data = useSelector((state) => state.flightReducer);

  return data.loading ? (
    <LoadingSpinner />
  ) : (
    <Fragment>
      <div className={classes["change-seat"]}>
        <ol>
          {data.user.map((passenger) => (
            <li
              key={passenger.seat}
              onClick={() => history.push(`/info/${params.id}/${passenger.id}`)}
            >
              {passenger.name ? passenger.name : "Not Booked"}
            </li>
          ))}
        </ol>
      </div>
    </Fragment>
  );
}

export default ListPassenger;
