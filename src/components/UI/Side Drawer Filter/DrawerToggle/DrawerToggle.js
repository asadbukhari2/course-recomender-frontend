import React from "react";

import classes from "./DrawerToggle.module.css";

function DrawerToggle(props) {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div />
      <div />
      <div>Filter</div>
    </div>
  );
}

export default DrawerToggle;
