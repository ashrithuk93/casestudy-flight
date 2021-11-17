import React from "react";

import FlightLayout from "./FlightLayout";

import classes from "./SeatLayout.module.css";

const SeatLayout = () => {
  return (
    <div className={classes.outline}>
      <FlightLayout />
      <div className={classes.bar}>
        <div className={classes["business-bar"]}></div>
        <div className={classes["economy-bar"]}></div>
      </div>
    </div>
  );
};

export default SeatLayout;
