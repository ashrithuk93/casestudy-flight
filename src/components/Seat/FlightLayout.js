import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadPassenger } from "../../actions/flight";

import Seat from "./Seat";

import classes from "./FlightLayout.module.css";

const FlightLayout = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.flightReducer);

  useEffect(() => {
    dispatch(loadPassenger(params.id));
  }, []);

  let passengerLeft = [];
  let passengerRight = [];

  if (!data.loading) {
    passengerLeft = data.user.slice(0, 20);
    passengerRight = data.user.slice(20);
  }

  return (
    <div className={classes.flight}>
      <div className={classes.left}>
        {passengerLeft.map((num) => (
          <Seat
            key={num.id}
            id={num.id}
            seat={num.seat}
            color={0}
            checkedIn={num.checkedIn}
            disabled={num.disabled}
            infant={num.infant}
            booked={num.name.length > 0}
          />
        ))}
      </div>
      <div className={classes.aisle}></div>
      <div className={classes.right}>
        {passengerRight.map((num) => (
          <Seat
            key={num.id}
            id={num.id}
            seat={num.seat}
            color={0}
            checkedIn={num.checkedIn}
            disabled={num.disabled}
            infant={num.infant}
            booked={num.name.length > 0}
          />
        ))}
      </div>
    </div>
  );
};

export default FlightLayout;
