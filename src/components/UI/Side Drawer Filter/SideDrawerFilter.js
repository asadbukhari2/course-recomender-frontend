import React, { useState } from "react";

import classes from "./SideDrawerFilter.module.css";

import Backdrop from "../../UI/BackDrop/Backdrop";
import Aux from "../../../hoc/_Aux/_Aux";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import { useStore } from "../../../hooks-store/store";
// import NavigationItems from "../NavigationItems/NavigationItems";
// import SearchBar from "../../SearchBar/SearchBar";

function SideDrawerFilter(props) {
  const [difficulty, setDifficulty] = useState("1");
  const [category, setCategory] = useState("1");

  const state = useStore()[0];
  const dispatch = useStore()[1];

  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  const toggleCategoryFilterHandler = () => {
    const data = {
      category: parseInt(category),
    };
    dispatch("TOGGLE_CATEGORY", data);
  };

  const toggleDifficultyFilterHandler = () => {
    const data = {
      difficulty: parseInt(difficulty),
    };
    dispatch("TOGGLE_DIFFICULTY", data);
  };

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <h3 className={classes.SideDrawerClose}>
          <div className={classes.SideDrawerCloseDiv} onClick={props.closed}>
            close
          </div>
        </h3>

        <h2>Filter Courses</h2>

        <div className={classes.Controller}>
          <div className={classes.Select}>
            <h3 className={classes.DSTitle}>Category</h3>
            <select onChange={(e) => setCategory(e.currentTarget.value)}>
              <option value={"1"}>Database</option>
              <option value={"2"}>Web Engineering</option>
              <option value={"3"}>Management</option>
              <option value={"4"}>Programming</option>
              <option value={"5"}>Machine Learning</option>
              <option value={"6"}>Big Data</option>
              <option value={"7"}>UI/UX</option>
              <option value={"8"}>Designing</option>
              <option value={"9"}>AI</option>
              <option value={"10"}>IOT</option>
              <option value={"11"}>Android Development</option>
            </select>

            <div
              className={classes.SubmitButton}
              onClick={toggleCategoryFilterHandler}
            >
              <NavLink to={"courses"}>
                <Button btnType={"ButtonGhost"}>Apply</Button>
              </NavLink>
            </div>
          </div>

          <div className={classes.Select}>
            <h3 className={classes.DSTitle}>Difficulty</h3>
            <select onChange={(e) => setDifficulty(e.currentTarget.value)}>
              <option value={"1"}>Beginner</option>
              <option value={"2"}>Intermediate</option>
              <option value={"3"}>Expert</option>
            </select>

            <div
              className={classes.SubmitButton}
              onClick={toggleDifficultyFilterHandler}
            >
              <NavLink to={"courses"}>
                <Button btnType={"ButtonGhost"}>Apply</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
}

export default SideDrawerFilter;
