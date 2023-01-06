import React, { useState, useEffect, useRef, Suspense } from "react";

import { Route, Switch, withRouter } from "react-router-dom";

import { useStore } from "./hooks-store/store";
import { VerifyUser } from "./services/authService";
import { FetchCart } from "./services/cartService";
import { getCurrentUser } from "./services/authService";

import Layout from "./hoc/Layout/Layout";
import MainView from "./containers/MainView/MainView";
import Logout from "./containers/Auth/Logout/Logout";
import SignUp from "./containers/Auth/SignUp/SignUp";
import SignIn from "./containers/Auth/SignIn/SignIn";
import Spinner from "./components/UI/Spinner/Spinner";
import { fetchCourses } from "./services/courseSerivces";

const Courses = React.lazy(() => {
	return import("./components/Courses/Courses");
});
const Dashboard = React.lazy(() => {
	return import("./components/Dashboard/Dashboard");
});

const DegreeSemester = React.lazy(() => {
	return import("./containers/DegreeSemester/DegreeSemester");
});

const MyCart = React.lazy(() => {
	return import("./containers/MyCart/MyCart");
});

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const dispatch = useStore(true)[1];
	const state = useStore()[0];

	const _Mounted = useRef(true);

	useEffect(() => {
		if (_Mounted.current === true) {
			fetchCourses().then(courses => {
				console.log("response after hitting courses endpoint : ", courses);
				dispatch("FETCH_COURSES", courses);
			});

			console.log("state after fetching courses is : ", state);

			if (localStorage.getItem("user")) {
				VerifyUser().then(response => {
					if (_Mounted.current) {
						if (response) {
							setIsAuthenticated(response);
							dispatch("AUTH_SUCCESS", getCurrentUser().token);

							// FetchLogedInUser(getCurrentUser().decodeUser.user_id)
							//     .then((response) => {
							//         dispatch('FETCH_USER', response)
							//         // console.log('fetched LoginIn user in App.js Is : ', response)
							//     })

							// FetchWishList().then((response) => {
							//     // console.log('Fetching WishList', response)
							//     if (_Mounted.current) {
							//         dispatch('FETCH_WISHLIST', response)
							//     }
							// })

							// FetchOrders().then((response) => {
							//     // console.log('Fetching order')
							//     if (_Mounted.current) {
							//         dispatch('FETCH_ORDERS', response)
							//     }
							// })

							FetchCart().then(response => {
								// console.log('Fetching cart')
								let newUpdatedCart = [];

								if (localStorage.getItem("cart")) {
									const oldCart = JSON.parse(localStorage.getItem("cart"));
									dispatch("FETCH_CART", oldCart);
								} else {
									dispatch("FETCH_CART", newUpdatedCart);
								}
							});
						} else {
							if (localStorage.getItem("cart")) {
								const oldCart = JSON.parse(localStorage.getItem("cart"));
								dispatch("FETCH_CART", oldCart);
							}
							setIsAuthenticated(false);
							localStorage.removeItem("user");
						}
					}
				});
			} else if (localStorage.getItem("cart")) {
				const oldCart = JSON.parse(localStorage.getItem("cart"));
				dispatch("FETCH_CART", oldCart);
				setIsAuthenticated(false);
			} else {
				setIsAuthenticated(false);
			}

			return () => {
				_Mounted.current = false;
			};
		}
	}, [VerifyUser]);

	let routes = (
		<Switch>
			<Route path={"/auth"} render={props => <SignIn />} />
			<Route path={"/sign_up"} render={props => <SignUp />} />
			<Route path={"/"} exact component={MainView} />
		</Switch>
	);

	if (isAuthenticated) {
		routes = (
			<Switch>
				<Route path={"/"} exact component={MainView} />
				<Route path={"/courses"} render={props => <Courses {...props} />} />
				<Route
					path={"/degree_semester"}
					render={props => <DegreeSemester {...props} />}
				/>
				<Route path={"/cart"} render={props => <MyCart {...props} />} />
				<Route path={"/logout"} component={Logout} />
				<Route path={"/dashboard"} exact component={Dashboard} />
			</Switch>
		);
	}

	return (
		<div>
			<Layout isAuthenticated={isAuthenticated}>
				{console.log("global State in app.js", state)}
				<Suspense fallback={<Spinner />}>{routes}</Suspense>
			</Layout>
		</div>
	);
}

export default withRouter(App);
