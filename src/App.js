import React, { Suspense } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import Login from "./components/pages/Login";
import Header from "./components/header/Header";
import Home from "./components/pages/Home";
import Select from "./components/pages/Select";
import Modal from "./components/modal/Modal";
import Layout from "./components/UI/Layout";
import InfoPassenger from "./components/amneties/InfoPassenger";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const Passengers = React.lazy(() => import("./components/pages/Passengers"));
const BookingForm = React.lazy(() => import("./components/forms/BookingForm"));
const Manage = React.lazy(() => import("./components/pages/Manage"));

function App() {
  // let selector = useSelector((state) => state.userReducer[0]);
  // console.log("from App.js...", selector.loggedIn);

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route path="/login">
            <Layout>
              <Login />
            </Layout>
          </Route>
          <Route path="/flight" exact>
            <Select />
          </Route>
          <Route path="/flight/:id">
            <Home />
          </Route>
          <Route path="/bookings/:id/:seat">
            <Modal>
              <Layout>
                <BookingForm />
              </Layout>
            </Modal>
          </Route>
          <Route path="/info/:id/:seat">
            <Modal>
              <Layout>
                <InfoPassenger />
              </Layout>
            </Modal>
          </Route>
          <Route path="/anscillaries/:id">
            <Manage />
          </Route>
          <Route path="/list/:id">
            <Passengers />
          </Route>
          <Route path="/manage">
            <Passengers />
          </Route>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
