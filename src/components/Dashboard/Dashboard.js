import React, { useEffect, useState } from "react";

import { useStore } from "../../hooks-store/store";
import img1 from "../../assets/images/te6.jpg";
import EnrolledCourse from "../UI/EnrolledCourse/EnrolledCourse";

import classes from "./Dashboard.module.css";
import { FetchLogedInUser } from "../../services/authService";

const Dashboard = () => {
	const state = useStore()[0];
	const [userDetails, setUserDetails] = useState({});

	const currentLoggedInuser = state.auth.user;

	const courses = state.cart.items;

	useEffect(() => {
		const get = async () => {
			const users = await FetchLogedInUser(9);
			const user = users.filter(
				ele => currentLoggedInuser.user_id === ele.user.id
			)[0];
			console.log(user);
			setUserDetails({
				userName: user.user.first_name + " " + user.user.last_name,
				userEmail: user.user.email,
				userContact: user.contact_no,
				userStreetAddress:
					user.street_address === null
						? "No Street Address provided"
						: user.street_address,
				userCityState:
					user.city_name +
					"  " +
					(user.state !== null ? user.state : " ") +
					" ," +
					(user.country !== null ? user.country : ""),
				userImage: user.avatar === null ? img1 : user.avatar,
			});
		};
		get();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {
		userName,
		userEmail,
		userContact,
		userStreetAddress,
		userCityState,
		userImage,
	} = userDetails;

	return (
		<>
			<section className={classes.Contaner}>
				{!userDetails ? (
					""
				) : (
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
									<span>{userCityState}</span>
								</div>
							</div>
						</div>
					</div>
				)}
				<div className={classes.EnrolledCourses}>
					<h4>ENROLLED COURSES</h4>
					<div className={classes.Cards}>
						{courses?.length > 0 ? (
							courses?.map(course => (
								<EnrolledCourse key={course.name} course={course} />
							))
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
