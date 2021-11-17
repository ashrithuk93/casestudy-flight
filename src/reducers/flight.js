import {
  LOAD_DATA,
  CHECK_IN,
  DELETE_PASSENGER,
  EDIT_PASSENGER,
  CHANGE_SEAT,
  LOAD_FLIGHT,
  LOAD_PASSENGER,
  FLIGHT_DETAIL,
  LOAD_ALL_PASSENGERS,
  CURRENT_USER,
} from "../actions/types";

const initalState = {
  loading: true,
  detail: {},
  flight: [],
  user: [],
  all_users: [],
  current_user: {},
};

export default function flight(state = initalState, action) {
  const { type, payload } = action;

  if (type === LOAD_FLIGHT) {
    return { ...state, loading: false, flight: payload };
  }

  if (type === LOAD_PASSENGER) {
    return { ...state, loading: false, user: payload };
  }

  if (type === FLIGHT_DETAIL) {
    return {
      ...state,
      loading: false,
      detail: payload,
    };
  }

  if (type === LOAD_ALL_PASSENGERS) {
    return {
      ...state,
      loading: false,
      all_users: payload,
    };
  }

  if (type === CURRENT_USER) {
    return { ...state, loading: false, current_user: payload };
  }

  if (type === LOAD_DATA) {
    localStorage.setItem("flightData", JSON.stringify(payload));
    return [...payload];
  }

  if (
    type === CHECK_IN ||
    type === EDIT_PASSENGER ||
    type === DELETE_PASSENGER
  ) {
    return { ...state, loading: false, current_user: payload };
  }

  if (type === CHANGE_SEAT) {
    const updatedState = [...state];

    const fIndex = updatedState.findIndex((flight) => flight.id === payload.id);
    const pIndex = updatedState[fIndex].passengers.findIndex(
      (passenger) => passenger.seat === payload.seat
    );
    const nIndex = updatedState[fIndex].passengers.findIndex(
      (passenger) => passenger.seat === Number(payload.newSeat)
    );

    // const seat_1 = payload.seat;
    const name_1 = updatedState[fIndex].passengers[nIndex].name;
    const age_1 = updatedState[fIndex].passengers[nIndex].age;
    const address_1 = updatedState[fIndex].passengers[nIndex].address;
    const passportNo_1 = updatedState[fIndex].passengers[nIndex].passportNo;
    const ancillary_1 = updatedState[fIndex].passengers[nIndex].ancillary;
    const checkedIn_1 = updatedState[fIndex].passengers[nIndex].checkedIn;
    const disabled_1 = updatedState[fIndex].passengers[nIndex].disabled;
    const infant_1 = updatedState[fIndex].passengers[nIndex].infant;

    // const seat_2 = payload.seat;
    const name_2 = updatedState[fIndex].passengers[pIndex].name;
    const age_2 = updatedState[fIndex].passengers[pIndex].age;
    const address_2 = updatedState[fIndex].passengers[pIndex].address;
    const passportNo_2 = updatedState[fIndex].passengers[pIndex].passportNo;
    const ancillary_2 = updatedState[fIndex].passengers[pIndex].ancillary;
    const checkedIn_2 = updatedState[fIndex].passengers[pIndex].checkedIn;
    const disabled_2 = updatedState[fIndex].passengers[pIndex].disabled;
    const infant_2 = updatedState[fIndex].passengers[pIndex].infant;

    const updatedState_1 = [
      ...updatedState.slice(0, fIndex),
      {
        ...updatedState[fIndex],
        passengers: [
          ...updatedState[fIndex].passengers.slice(0, pIndex),
          {
            ...updatedState[fIndex].passengers[pIndex],
            name: name_1,
            age: age_1,
            address: address_1,
            passportNo: passportNo_1,
            ancillary: ancillary_1,
            checkedIn: checkedIn_1,
            disabled: disabled_1,
            infant: infant_1,
          },
          ...updatedState[fIndex].passengers.slice(pIndex + 1),
        ],
      },
      ...updatedState.slice(fIndex + 1),
    ];

    const updatedState_2 = [
      ...updatedState_1.slice(0, fIndex),
      {
        ...updatedState_1[fIndex],
        passengers: [
          ...updatedState_1[fIndex].passengers.slice(0, nIndex),
          {
            ...updatedState_1[fIndex].passengers[nIndex],
            name: name_2,
            age: age_2,
            address: address_2,
            passportNo: passportNo_2,
            ancillary: ancillary_2,
            checkedIn: checkedIn_2,
            disabled: disabled_2,
            infant: infant_2,
          },
          ...updatedState_1[fIndex].passengers.slice(nIndex + 1),
        ],
      },
      ...updatedState_1.slice(fIndex + 1),
    ];

    console.log(updatedState_2, "fkjfkfkjdfdhfjkh");

    localStorage.setItem("flightData", JSON.stringify(updatedState_2));

    return updatedState_2;
  }

  localStorage.setItem("flightData", JSON.stringify(state));

  return state;
}
