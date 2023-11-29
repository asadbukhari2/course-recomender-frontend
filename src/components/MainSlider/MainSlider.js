import React, { useState } from "react";

import classes from "./MainSlider.module.css";

import ImageSlider from "../UI/ImageSlider/ImageSlider";

import img1 from "../../assets/images/g4.jpg";
import img2 from "../../assets/images/g5.jpg";
import img3 from "../../assets/images/g6.jpg";
import img4 from "../../assets/images/g7.jpg";

function MainSlider(props) {
  // eslint-disable-next-line no-unused-vars
  const [images, setImages] = useState([img1, img2, img3, img4]);

  return (
    <section className={classes.MainSlider}>
      <ImageSlider images={images} display={"main"} />
    </section>
  );
}

export default MainSlider;
