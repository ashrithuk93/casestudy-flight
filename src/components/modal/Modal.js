import React from "react";

import classes from "./Modal.module.css";

const Modal = (props) => {
  return <div className={classes.backdrop}>{props.children}</div>;
};

export default Modal;
