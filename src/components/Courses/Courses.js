import React, { useState, useEffect } from "react";

import classes from "./Courses.module.css";

import { useStore } from "../../hooks-store/store";

import Spinner from "../UI/Spinner/Spinner";
import SideDrawerFilter from "../UI/Side Drawer Filter/SideDrawerFilter";
import Course from "../UI/Course/Course";

function Courses(props) {
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

	const state = useStore()[0];
	const dispatch = useStore()[1];

	useEffect(() => {
		dispatch("FILTERED_COURSES");
	}, []);

	const sideDrawerOpenHandler = e => {
		e.stopPropagation();
	};

	const sideDrawerClosedHandler = () => {
		setSideDrawerIsVisible(false);
	};

	const sideDrawerToggleHandler = () => {
		setSideDrawerIsVisible(!sideDrawerIsVisible);
	};
	console.log("state", state);
	let coursesToRender = null;
	if (state.auth.loading) {
		coursesToRender = <Spinner />;
	} else {
		if (state.course.difficulty === null || state.course.category === null) {
			// if (state.course.filterCategoryOrDifficulty.length > 0) {
			console.log("coursesToRender filterCategoryOrDifficulty");
			if (state.course.filterCategoryOrDifficulty.length > 0) {
				coursesToRender = state.course.filterCategoryOrDifficulty.map(fItem => (
					<div key={fItem.id}>
						<Course fItem={fItem} />
					</div>
				));
			} else {
				coursesToRender = <h3> No Courses !</h3>;
			}
		} else if (
			state.course.study_mode === null &&
			state.course.degree !== null &&
			state.course.semester !== null
		) {
			// } else if (state.course.filterItem.length > 0) {
			console.log("coursesToRender filterItem");
			coursesToRender = state.course.filterItem.map(fItem => (
				<div key={fItem.id}>
					<Course fItem={fItem} />
				</div>
			));
		} else {
			coursesToRender = <h3> No Courses !</h3>;
		}
	}

	return (
		<section className={classes.CoursesSection}>
			<div className={classes.DrawerToggle} onClick={sideDrawerToggleHandler}>
				<div />
				<div />
				<div>Filter</div>
			</div>

			<h2>Courses</h2>
			<div className={classes.Courses}>
				<SideDrawerFilter
					open={sideDrawerIsVisible}
					closed={sideDrawerClosedHandler}
					opened={sideDrawerOpenHandler}
				/>
				{coursesToRender}
			</div>
		</section>
	);
}

export default React.memo(Courses);
