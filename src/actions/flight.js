import axios from "axios";
import {
  LOAD_DATA,
  CHECK_IN,
  DELETE_PASSENGER,
  EDIT_PASSENGER,
  LOAD_FLIGHT,
  LOAD_PASSENGER,
  FLIGHT_DETAIL,
  LOAD_ALL_PASSENGERS,
  CURRENT_USER,
} from "./types";

export const flightDetail = (fid) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/flight/${fid}`);
  dispatch({ type: FLIGHT_DETAIL, payload: res.data });
};

export const loadFlight = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8000/flight");
  dispatch({ type: LOAD_FLIGHT, payload: res.data });
};

export const loadPassenger = (fid) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/flight/${fid}/users`);
  dispatch({ type: LOAD_PASSENGER, payload: res.data });
};

export const loadAllPassengers = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/users`);
  dispatch({ type: LOAD_ALL_PASSENGERS, payload: res.data });
};

export const currentUser = (id) => async (dispatch) => {
  console.log(id, "id from redux");
  const res = await axios.get(`http://localhost:8000/users/${id}`);
  dispatch({ type: CURRENT_USER, payload: res.data });
};

export const loadData = () => async (dispatch) => {
  const payload = [];
  const res = await axios.get("http://localhost:8000/flight");
  const objectKeys = Object.keys(res.data);
  objectKeys.map((item) => payload.push(res.data[item]));

  dispatch({ type: LOAD_DATA, payload });
};

export const checkIn =
  ({ id, fid, check }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      checkedIn: !check,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(
      `http://localhost:8000/users/${id}`,
      body,
      config
    );

    dispatch({ type: CHECK_IN, payload: res.data });

    dispatch(loadPassenger(fid));
  };

export const deletePassenger = (id) => async (dispatch) => {
  const body = JSON.stringify({
    name: "",
    age: "",
    address: "",
    passportNo: "",
    ancillary: "",
    checkedIn: false,
    disabled: false,
    infant: false,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await axios.patch(
    `http://localhost:8000/users/${id}`,
    body,
    config
  );

  dispatch({ type: DELETE_PASSENGER, payload: res.data });

  dispatch(loadAllPassengers());
};

export const editPassenger =
  ({
    id,
    seatNumber,
    name,
    age,
    address,
    passport,
    services,
    wheelChairValue,
    infantValue,
  }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      seat: seatNumber,
      name: name,
      age: age,
      address: address,
      passportNo: passport,
      ancillary: services,
      disabled: wheelChairValue,
      infant: infantValue,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(
      `http://localhost:8000/users/${id}`,
      body,
      config
    );

    dispatch({ type: EDIT_PASSENGER, payload: res.data });
    dispatch(loadAllPassengers());
  };

export const changeSeat =
  ({ id, seat, newSeat }) =>
  async () => {
    const res_1 = await axios.get(
      `http://localhost:8000/users?seat=${seat}&flightId=${id}`
    );

    let user_1 = { ...res_1.data[0] };

    const res_2 = await axios.get(
      `http://localhost:8000/users?seat=${newSeat}&flightId=${id}`
    );

    let user_2 = { ...res_2.data[0] };

    let temp = { ...user_2 };

    user_2 = { ...user_1 };
    user_1 = { ...temp };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.patch(
      `http://localhost:8100/users/${id}`,
      JSON.stringify({}),
      config
    );

    console.log(user_1, user_2, "from redux.....");
  };
