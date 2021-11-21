import axios from "axios";
import {
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
  try {
    const res = await axios.get(`http://localhost:8000/flight/${fid}`);
    dispatch({ type: FLIGHT_DETAIL, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const loadFlight = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/flight");
    dispatch({ type: LOAD_FLIGHT, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const loadPassenger = (fid) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8000/flight/${fid}/users`);
    dispatch({ type: LOAD_PASSENGER, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const loadAllPassengers = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8000/users`);
    dispatch({ type: LOAD_ALL_PASSENGERS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const currentUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8000/users/${id}`);
    dispatch({ type: CURRENT_USER, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const checkIn =
  ({ id, fid, check }) =>
  async (dispatch) => {
    try {
      const data = { checkedIn: !check };

      const body = JSON.stringify(data);
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
    } catch (err) {
      console.log(err);
    }
  };

export const deletePassenger = (id, history) => async (dispatch) => {
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

  try {
    const res = await axios.patch(
      `http://localhost:8000/users/${id}`,
      body,
      config
    );

    dispatch({ type: DELETE_PASSENGER, payload: res.data });

    dispatch(loadAllPassengers());

    history.push("/manage");
  } catch (err) {
    console.log(err);
  }
};

export const editPassenger =
  (
    {
      id,
      seatNumber,
      name,
      age,
      address,
      passport,
      services,
      wheelChairValue,
      infantValue,
    },
    history
  ) =>
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

    try {
      const res = await axios.patch(
        `http://localhost:8000/users/${id}`,
        body,
        config
      );

      dispatch({ type: EDIT_PASSENGER, payload: res.data });

      dispatch(loadAllPassengers());

      history.push("/manage");
    } catch (err) {
      console.log(err);
    }
  };

export const changeSeat = (id, seat, newSeat, history) => async () => {
  try {
    const res_1 = await axios.get(
      `http://localhost:8000/users?seat=${seat}&flightId=${id}`
    );

    let user_1 = { ...res_1.data[0] };

    const res_2 = await axios.get(
      `http://localhost:8000/users?seat=${newSeat}&flightId=${id}`
    );

    let user_2 = { ...res_2.data[0] };

    let temp = { ...user_2 };

    user_2 = {
      ...user_2,
      name: user_1.name,
      age: user_1.age,
      address: user_1.address,
      passportNo: user_1.passportNo,
      ancillary: user_1.ancillary,
      checkedIn: user_1.checkedIn,
      disabled: user_1.disabled,
      infant: user_1.infant,
    };
    user_1 = {
      ...user_1,
      name: temp.name,
      age: temp.age,
      address: temp.address,
      passportNo: temp.passportNo,
      ancillary: temp.ancillary,
      checkedIn: temp.checkedIn,
      disabled: temp.disabled,
      infant: temp.infant,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.patch(
      `http://localhost:8000/users/${user_1.id}`,
      JSON.stringify(user_1),
      config
    );

    await axios.patch(
      `http://localhost:8000/users/${user_2.id}`,
      JSON.stringify(user_2),
      config
    );

    history.push(`/flight/${id}`);
  } catch (err) {
    console.log(err);
  }
};
