import React, { useState } from "react";

import classes from "./DegreeSemester.module.css";

import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useStore } from "../../hooks-store/store";
import baseClasses from "../../assets/css/base.module.css";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Course from "../../components/UI/Course/Course";

function DegreeSemester(props) {
	const [degree, setDegree] = useState("1");
	const [semester, setSemester] = useState("1");

	const state = useStore()[0];
	const dispatch = useStore()[1];

	const history = useHistory();

	let coursesToRender = null;

	// if (state.auth.loading) {
	//     coursesToRender = <Spinner/>
	// } else {
	//     console.log('before accessing courses global state is : ', state)
	//     if (state.course.degree !== null && state.course.semester !== null) {
	//         coursesToRender = state.course.courses.filter(
	//             filterDegreeCourses => filterDegreeCourses.degree === state.course.degree).filter(
	//             filterSemesterCourses => filterSemesterCourses.degree === state.course.semester).map(
	//             fItem =>
	//                 <div key={fItem.id}>
	//                     <Course fItem={fItem}/>
	//                 </div>
	//         )
	//         // }else if(state.course.searchedProducts.length > 0){
	//         //     coursesToRender = state.course.searchedProducts.map(fItem =>
	//         //         <div key={fItem.id}>
	//         //             <Course fItem={fItem}/>
	//         //         </div>
	//         //     )
	//     } else {
	//         coursesToRender = <div> No Courses !</div>
	//     }
	// }

	const toggleDegreeSemesterHandler = () => {
		const data = {
			degree: parseInt(degree),
			semester: parseInt(semester),
		};
		dispatch("TOGGLE_DEGREE_SEMESTER", data);
	};

	return (
		<section
			className={[classes.DegreeSemester, baseClasses.BackgroundImgTwo].join(
				" "
			)}>
			<h2 className={classes.Title}>Degree and Semester</h2>
			<div className={classes.Controller}>
				<div className={classes.Select}>
					<h3 className={classes.DSTitle}>Degree</h3>
					<select onChange={e => setDegree(e.currentTarget.value)}>
						<option value={"1"}>
							Bachelors of Science in Software Engineering
						</option>
						<option value={"2"}>
							Bachelors of Science in Computer Science
						</option>
						<option value={"3"}>
							Bachelors of Science in Computer Engineering
						</option>
					</select>
				</div>

				<div className={classes.Select}>
					<h3 className={classes.DSTitle}>Semester</h3>
					<select onChange={e => setSemester(e.currentTarget.value)}>
						<option value={"1"}>1</option>
						<option value={"2"}>2</option>
						<option value={"3"}>3</option>
						<option value={"4"}>4</option>
						<option value={"5"}>5</option>
						<option value={"6"}>6</option>
						<option value={"7"}>7</option>
						<option value={"8"}>8</option>
					</select>
				</div>
			</div>

			<div
				className={classes.SubmitButton}
				onClick={toggleDegreeSemesterHandler}>
				<NavLink to={"courses"}>
					<Button>Filter</Button>
				</NavLink>
			</div>
		</section>
	);
}

export default DegreeSemester;
