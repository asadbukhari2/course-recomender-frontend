import React from "react";

import classes from "./EnrolledCourse.module.css";
import Aux from "../../../hoc/_Aux/_Aux";

function EnrolledCourse(props) {
  const { course } = props;
  return (
    <Aux>
      <div className={classes.Container}>
        <img
          className={classes.Image}
          src={course.photo}
          alt={"Featured Item"}
        />
        <div className={classes.DetailView}>
          <div className={classes.Title}>
            <span>{course.name}</span>
          </div>
          <div className={classes.Price}>
            <span>Rs: {" " + Math.floor(course.price)}</span>
          </div>
        </div>
        <div className={classes.ModalDescriptionText}>
          <h5 style={{ marginBottom: "5px" }}>Description:</h5>
          <p style={{ marginBottom: "5px", fontSize: "14px" }}>
            {course.description.substring(0, 50)}...
          </p>
        </div>
        {course.study_mode === 2 ? (
          <div className={classes.LinkBtn}>
            <a href={course.drive_link} target="_blank" rel="noreferrer">
              goto course
            </a>
          </div>
        ) : (
          <div className={classes.LinkBtn}>
            <span>on campus</span>
          </div>
        )}
      </div>
    </Aux>
  );
}

export default React.memo(EnrolledCourse);
