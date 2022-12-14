import React from "react";

import classes from "./About.module.css";
import baseClasses from "../../assets/css/base.module.css";

function About(props) {
	return (
		<section
			className={[classes.About, baseClasses.BackgroundImgThree].join(" ")}>
			<h2 className={classes.Title}>About</h2>
			<div className={[classes.Description, baseClasses.Row].join(" ")}>
				<p className={baseClasses.LongCopy}>
					Welcome to Course Recommender, your number one source for Learning.
					We're dedicated to providing you the very best of Learning.
				</p>
				<br />
				<p className={baseClasses.LongCopy}>
					We're working to turn our passion for Learning into a booming Learning
					Platform. We hope you enjoy our courses as much as we enjoy offering
					them to you.
				</p>
			</div>
		</section>
	);
}

export default About;
