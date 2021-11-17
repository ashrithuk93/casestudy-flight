import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIn } from "../../actions/flight";

import classes from "./Seat.module.css";

const Seat = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.userReducer);
  const styleList = ["", "booked", "disabilities", "infant"];
  const styleCode = props.disabled
    ? 2
    : props.infant
    ? 3
    : props.booked
    ? 1
    : 0;
  const seatStyle = styleList[styleCode];
  const dispatch = useDispatch();

  const { id } = useParams();

  const onclickHandler = () => {
    if (styleCode === 0) {
      if (user.auth) {
        history.push(`/bookings/${id}/${props.id}`);
      } else {
        alert(
          "Can not check-in as the seat is not booked. Login as an admin to book tickets."
        );
        history.push(`/flight/${id}`);
      }
    } else {
      dispatch(
        checkIn({
          id: props.id,
          fid: id,
          check: props.checkedIn,
        })
      );

      history.push(`/flight/${id}`);
    }
  };

  const checkedStyle = props.checkedIn && props.booked ? "clicked" : "seat";

  return (
    <div>
      <button
        className={`${classes[checkedStyle]} ${classes[seatStyle]}`}
        type="button"
        onClick={onclickHandler}
      >
        {props.seat}
      </button>
    </div>
  );
};

export default Seat;
