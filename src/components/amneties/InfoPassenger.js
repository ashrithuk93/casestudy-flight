import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, withRouter } from "react-router-dom";
import { changeSeat } from "../../actions/flight";
import { currentUser } from "../../actions/flight";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./InfoPassenger.module.css";

const InfoPassenger = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [changedSeat, setSeat] = useState("");
  const data = useSelector((state) => state.flightReducer);

  useEffect(() => {
    dispatch(currentUser(params.seat));
  }, []);

  const element =
    data.loading === 0 ? (
      <LoadingSpinner />
    ) : (
      <div className={classes.display}>
        <p>
          <b>Name:</b> {data.current_user.name}
        </p>
        <p>
          <b>Age:</b> {data.current_user.age}
        </p>
        <p>
          <b>Address:</b> {data.current_user.address}
        </p>
        <p>
          <b>Passport:</b> {data.current_user.passportNo}
        </p>
        <p>
          <b>Seat no.:</b> {data.current_user.seat}{" "}
          <input
            className={classes.input}
            placeholder="Change Seat"
            value={changedSeat}
            onChange={(e) => setSeat(e.target.value)}
            required
            type="number"
            min={1}
            max={40}
          />
        </p>
        <p>
          <b>Special Meal:</b>{" "}
          {data.current_user.ancillary ? data.current_user.ancillary : ""}
        </p>
        <p>
          <b>Checked-In:</b> {data.current_user.checkedIn ? "Yes" : "No"}
        </p>
        <p>
          <b>Disabled:</b> {data.current_user.disabled ? "Yes" : "No"}
        </p>
        <p>
          <b>With infant:</b> {data.current_user.infant ? "Yes" : "No"}
        </p>
        <div className={classes.pallet}>
          <button
            type="button"
            className={classes.button}
            onClick={() => {
              history.push(`/flight/${params.id}`);
            }}
          >
            Back
          </button>
          <button
            type="button"
            className={classes.button}
            onClick={() => {
              if (changedSeat > 0 && changedSeat <= 40) {
                dispatch(
                  changeSeat(
                    params.id,
                    data.current_user.seat,
                    changedSeat,
                    history
                  )
                );

                // history.push(`/flight/${params.id}`);
              } else {
                alert("Enter a valid seat number (between 1 to 40)");
              }
            }}
          >
            Change
          </button>
        </div>
      </div>
    );

  return element;
};

export default withRouter(InfoPassenger);
