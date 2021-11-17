import React, { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { loadPassenger } from "../../actions/flight";
import LoadingSpinner from "../UI/LoadingSpinner";

import Layout from "../UI/Layout";
import SeatLayout from "../Seat/SeatLayout";
import Amneties from "../amneties/Amneties";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.flightReducer);

  useEffect(() => {
    dispatch(loadPassenger());
  }, []);

  return (
    <Fragment>
      {data.loading ? (
        <LoadingSpinner />
      ) : (
        <Layout>
          <SeatLayout />
          <Amneties />
        </Layout>
      )}
    </Fragment>
  );
};

export default Home;
