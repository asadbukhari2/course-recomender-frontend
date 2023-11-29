import React from "react";
import { Link } from "react-router-dom";

import CRLogo from "../../../assets/images/logo-icon-black.png";

import classes from "./Logo.module.css";

function Logo(props) {
  return (
    <Link to="/">
      <div className={classes.Logo}>
        <img src={CRLogo} alt={"JC Logo"} className={classes.LogoImg} />
        <h3 className={classes.LogoText}> Course Recommender</h3>
      </div>
    </Link>
  );
}

export default Logo;
