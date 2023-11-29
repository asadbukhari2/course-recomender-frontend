import React from "react";

import Aux from "../../../hoc/_Aux/_Aux";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems(props) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={"/"}>Home</NavigationItem>
      {!props.isAuthenticated ? (
        <Aux>
          <NavigationItem link={"/auth"}>Login</NavigationItem>
          <NavigationItem link={"/sign_up"}>Signup</NavigationItem>
        </Aux>
      ) : (
        <Aux>
          <NavigationItem link={"/logout"}>Logout</NavigationItem>
          <NavigationItem link={"/dashboard"}>Dashboard</NavigationItem>
        </Aux>
      )}
    </ul>
  );
}

export default NavigationItems;
