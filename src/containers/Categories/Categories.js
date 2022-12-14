import React from "react";
import { NavLink } from "react-router-dom";

import baseClasses from "../../assets/css/base.module.css";
import classes from "./Categories.module.css";

import { useStore } from "../../hooks-store/store";

import Card from "../../components/UI/Card/Card";

import menImg from "../../assets/images/p1.jpg";
import womenImg from "../../assets/images/p3.jpg";

function Categories(props) {
	const state = useStore()[0];
	const dispatch = useStore()[1];

	const toggleCampusCategoryHandler = () => {
		dispatch("TOGGLE_CAMPUS");
	};

	const toggleOnlineCategoryHandler = () => {
		dispatch("TOGGLE_ONLINE");
	};

	return (
		<section
			className={[classes.Categories, baseClasses.BackgroundImgTwo].join(" ")}>
			<h2 className={classes.Title}>Courses Categories</h2>

			<div className={classes.Cards}>
				<div className={classes.Card} onClick={toggleCampusCategoryHandler}>
					<NavLink to={"/degree_semester"}>
						<Card
							avatar={menImg}
							cName={"Campus Courses"}
							cSlogan={"Learn through physical learning environment"}
						/>
					</NavLink>
				</div>

				<div className={classes.Card} onClick={toggleOnlineCategoryHandler}>
					<NavLink to={"/degree_semester"}>
						<Card
							avatar={womenImg}
							cName={"Online Courses"}
							cSlogan={"Learn through online learning environment"}
						/>
					</NavLink>
				</div>
			</div>
		</section>
	);
}

export default Categories;
