import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPassenger, currentUser } from "../../actions/flight";
import { useParams, useHistory } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./BookingForm.module.css";

const BookingForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const data = useSelector((state) => state.flightReducer);

  useEffect(() => {
    dispatch(currentUser(params.seat));

    setName(data.loading ? "" : data.current_user.name);
    setAge(data.loading ? "" : data.current_user.age);
    setAddress(data.loading ? "" : data.current_user.address);
    setPassport(data.loading ? "" : data.current_user.passportNo);
    setServices(data.loading ? "" : data.current_user.ancillary);
    setWheelChairValue(data.loading ? "" : data.current_user.disabled);
    setInfantValue(data.loading ? "" : data.current_user.infant);
  }, [data.loading]);

  const seatNumber = data.current_user.seat;
  const [name, setName] = useState(data.loading ? "" : data.current_user.name);
  const [age, setAge] = useState(data.loading ? "" : data.current_user.age);
  const [address, setAddress] = useState(
    data.loading ? "" : data.current_user.address
  );
  const [passport, setPassport] = useState(
    data.loading ? "" : data.current_user.passportNo
  );
  const [services, setServices] = useState(
    data.loading ? "" : data.current_user.ancillary
  );
  const [wheelChairValue, setWheelChairValue] = useState(
    data.loading ? false : data.current_user.disabled
  );
  const [infantValue, setInfantValue] = useState(
    data.loading ? false : data.current_user.infant
  );

  const submithandler = (event) => {
    event.preventDefault();

    dispatch(
      editPassenger({
        id: params.seat,
        seatNumber,
        name,
        age,
        address,
        passport,
        services,
        wheelChairValue,
        infantValue,
      })
    );

    history.push("/manage");
  };

  return data.loading ? (
    <LoadingSpinner />
  ) : (
    <form onSubmit={submithandler} className={classes.form}>
      {name === "" ? (
        <h5>Seat not booked yet. Enter detials to book now.</h5>
      ) : (
        <h2>Manage Booking</h2>
      )}
      <h3>Seat Number: {seatNumber}</h3>
      <input
        className={classes.input}
        placeholder="Name..."
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        className={classes.input}
        placeholder="Age..."
        type="text"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <input
        className={classes.input}
        placeholder="Address..."
        type="text"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <input
        className={classes.input}
        placeholder="Passport Number..."
        type="text"
        value={passport}
        onChange={(event) => setPassport(event.target.value)}
      />
      <input
        className={classes.input}
        placeholder="Add In-flight services needed..."
        type="text"
        value={services}
        onChange={(event) => setServices(event.target.value)}
      />
      <div className={classes.radio}>
        Need wheel-chair?
        <label>
          <input
            className={classes.input}
            name="disability"
            type="radio"
            id="yes"
            value={wheelChairValue}
            onChange={() => setWheelChairValue(true)}
          />
          Yes
        </label>
        <label>
          <input
            className={classes.input}
            name="disability"
            type="radio"
            id="no"
            value={wheelChairValue}
            onChange={() => setWheelChairValue(false)}
          />
          No
        </label>
      </div>

      <div className={classes.radio}>
        With infants?
        <label>
          <input
            className={classes.input}
            name="infant"
            type="radio"
            id="yes"
            value={infantValue}
            onChange={() => setInfantValue(true)}
          />
          Yes
        </label>
        <label>
          <input
            className={classes.input}
            name="infant"
            type="radio"
            id="no"
            value={infantValue}
            onChange={() => setInfantValue(false)}
          />
          No
        </label>
      </div>
      <p>
        <button type="submit" className={classes.button}>
          Save Changes
        </button>
        <button
          className={classes.button}
          type="button"
          onClick={() => {
            history.push("/manage");
          }}
        >
          Cancel
        </button>
      </p>
    </form>
  );
};

export default BookingForm;
