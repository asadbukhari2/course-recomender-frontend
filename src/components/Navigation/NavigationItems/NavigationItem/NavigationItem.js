import React from "react";

import classes from "./NavigationItem.module.css";

import { NavLink } from "react-router-dom";

function NavigationItem(props) {
  return (
    <li className={classes.NavigationItem}>
      <NavLink exact={props.exact} to={props.link}>
        {props.children}
      </NavLink>
    </li>
  );
}

export default NavigationItem;
