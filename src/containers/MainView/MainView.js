import React from "react";

// import classes from './MainView.module.css'

import Aux from "../../hoc/_Aux/_Aux";

import Categories from "../Categories/Categories";
import MainSlider from "../../components/MainSlider/MainSlider";
import About from "../../components/About/About";

function MainView(props) {
  return (
    <Aux>
      <MainSlider />

      <Categories />

      <About />
    </Aux>
  );
}

export default MainView;
