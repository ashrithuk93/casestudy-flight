import React from "react";

import classes from "./SeatType.module.css";

const SeatTitle = [
  "Business Seat",
  "Economy Seat",
  "Passenger needs wheel-chair",
  "Passenger with infant",
  "Checked-In",
  "Empty Seat",
  "Booked",
];
const SeatStyle = [
  "business",
  "economy",
  "disabilities",
  "infant",
  "checked-in",
  "not-booked",
  "booked",
];

const SeatType = (props) => {
  return (
    <div className={classes.seat}>
      <div className={classes[SeatStyle[props.type]]}></div>
      <div>
        <p className={classes.title}>{SeatTitle[props.type]}</p>
      </div>
    </div>
  );
};

export default SeatType;
