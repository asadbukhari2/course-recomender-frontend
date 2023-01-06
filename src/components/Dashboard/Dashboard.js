import React from "react";

import { useStore } from "../../hooks-store/store";
import img1 from "../../assets/images/a3.jpg";
import EnrolledCourse from "../UI/EnrolledCourse/EnrolledCourse";

import classes from "./Dashboard.module.css";
import { getCurrentUser } from "../../services/authService";
const Dashboard = () => {
	const state = useStore()[0];
	const dispatch = useStore()[1];

	// const user = getCurrentUser();

	const user = state.auth.user;
	console.log({ user }, "this is a state");

	const userImage = img1;
	const userName = "Asad Bukhari";
	const userEmail = user.email;
	const userContact = "03045380199";
	const userStreetAddress = "qainchi main bazar";
	const userCity = "Lahore";

	const courses = state.cart.items || [];

	return (
		<>
			<section className={classes.Contaner}>
				<div className={classes.StudentDetail}>
					<div className={classes.Picture}>
						<img src={userImage} alt="Student Pic" />
					</div>
					<div className={classes.Detail}>
						<div className={classes.DetailLeft}>
							<div className={classes.Name}>
								<h5>Name</h5>
								<span>{userName}</span>
							</div>
							<div className={classes.Content}>
								<h5>Email</h5>
								<span>{userEmail}</span>
							</div>
							<div className={classes.Content}>
								<h5>Contact</h5>
								<span>{userContact}</span>
							</div>
						</div>
						<div className={classes.DetailRight}>
							<div className={classes.Content}>
								<h5>Street Address</h5>
								<span>{userStreetAddress}</span>
							</div>
							<div className={classes.Content}>
								<h5>City</h5>
								<span>{userCity}</span>
							</div>
						</div>
					</div>
				</div>
				<div className={classes.EnrolledCourses}>
					<h4>ENROLLED COURSES</h4>
					<div className={classes.Cards}>
						{courses?.length > 0 ? (
							courses?.map(course => <EnrolledCourse course={course} />)
						) : (
							<h4 style={{ marginTop: "20px" }}>Not enrolled in any course</h4>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default Dashboard;
