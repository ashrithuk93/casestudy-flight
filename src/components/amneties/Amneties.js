import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ListPassenger from "./ListPassenger";
import { flightDetail } from "../../actions/flight";
import LoadingSpinner from "../UI/LoadingSpinner";

import SeatType from "./SeatType";

import classes from "./Amneties.module.css";

const Amneties = () => {
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(flightDetail(params.id));
  }, []);

  const data = useSelector((state) => state.flightReducer);

  return data.loading ? (
    <LoadingSpinner />
  ) : (
    <div className={classes["detail-layout"]}>
      <div className={classes["flight-detail"]}>
        <h2>{data.detail.name}</h2>
        <p>
          {data.detail.from} to {data.detail.to}
        </p>
      </div>
      <div className={classes["color-code"]}>
        <SeatType type={0} />
        <SeatType type={1} />
        <SeatType type={2} />
        <SeatType type={3} />
        <SeatType type={4} />
        <SeatType type={5} />
        <SeatType type={6} />
      </div>
      <h2>Passengers</h2>
      <div className={classes.service}>
        <ListPassenger />
      </div>
    </div>
  );
};

export default Amneties;
