import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
	Suspense,
} from "react";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import { useStore } from "./hooks-store/store";
import { FetchLogedInUser, VerifyUser } from "./services/authService";
import { FetchCart } from "./services/cartService";
// import { FetchOrders } from "./services/orderServices";
import { getCurrentUser } from "./services/authService";

import Layout from "./hoc/Layout/Layout";
import MainView from "./containers/MainView/MainView";
import Logout from "./containers/Auth/Logout/Logout";
import SignUp from "./containers/Auth/SignUp/SignUp";
import SignIn from "./containers/Auth/SignIn/SignIn";
// import { FetchWishList } from "./services/wishListService";
import { fetchCourses } from "./services/courseSerivces";
// import { FetchSale } from "./services/saleServices";
import Spinner from "./components/UI/Spinner/Spinner";

const Courses = React.lazy(() => {
	return import("./components/Courses/Courses");
});

const DegreeSemester = React.lazy(() => {
	return import("./containers/DegreeSemester/DegreeSemester");
});

// const Checkout = React.lazy(() => {
//     return import("./containers/Checkout/Checkout")
// })

// const Orders = React.lazy(() => {
//     return import("./containers/Orders/Orders")
// })

// const OrderDetail = React.lazy(() => {
//     return import("./components/OrderDetail/OrderDetail")
// })

const MyCart = React.lazy(() => {
	return import("./containers/MyCart/MyCart");
});

// const DetailView = React.lazy(() => {
//     return import("./components/UI/DetailView/DetailView")
// })

// const Auth = React.lazy(() => {
//     return import("./containers/Auth/Auth")
// })

// const Account = React.lazy(() => {
//     return import("./containers/Account/Account")
// })

// const WishList = React.lazy(() => {
//     return import("./containers/WishList/WishList")
// })

// const LoginSecurity = React.lazy(() => {
//     return import("./containers/Account/Login&Security/LoginSecurity")
// })

// const Sale = React.lazy(() => {
//     return import("./containers/Sale/Sale")
// })
//
// const SaleDetail = React.lazy(() => {
//     return import("./components/UI/SaleDetail/SaleDetail")
// })

function App(props) {
	/*----State Section----*/
	// Local State
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Global State
	const dispatch = useStore(true)[1];
	const state = useStore()[0];

	const _Mounted = useRef(true);

	/*----Effects Section----*/

	const fetchCoursesData = useCallback(() => {
		fetchCourses().then(products => {
			dispatch("FETCH_COURSES", products);
		});

		console.log("state after fetching courses is : ", state);
	}, []);

	useEffect(() => {
		if (_Mounted.current === true) {
			// FetchSale().then((response) => {
			//     dispatch('FETCH_SALE', response)
			// })

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
			{/*<Route path={'/auth'} render={(props) => <Auth {...props}/>}/>*/}
			{/*<Route path={'/checkout'} render={(props) => <Checkout {...props}/>}/>*/}
			{/*<Route path={'/product_detail'} render={(props) => <DetailView {...props}/>}/>*/}
			<Route path={"/courses"} render={props => <Courses {...props} />} />
			<Route
				path={"/degree_semester"}
				render={props => <DegreeSemester {...props} />}
			/>
			<Route path={"/cart"} render={props => <MyCart {...props} />} />
			<Route path={"/auth"} render={props => <SignIn />} />
			<Route path={"/sign_up"} render={props => <SignUp />} />
			<Route path={"/"} exact component={MainView} />
			<Redirect to={"/"} />
		</Switch>
	);

	if (isAuthenticated) {
		routes = (
			<Switch>
				<Route path={"/products"} render={props => <Courses {...props} />} />
				{/*<Route path={'/checkout'} render={(props) => <Checkout {...props}/>}/>*/}
				<Route path={"/cart"} render={props => <MyCart {...props} />} />
				{/*<Route path={'/product_detail'} render={(props) => <DetailView {...props}/>}/>*/}
				<Route path={"/logout"} component={Logout} />
				<Route path={"/"} exact component={MainView} />
				<Redirect to={"/"} />
			</Switch>
		);
	}

	return (
		<div>
			<Layout isAuthenticated={isAuthenticated}>
				{console.log("global State in app.js", state)}
				{/*<Suspense fallback={<p>Loading</p>}>*/}
				<Suspense fallback={<Spinner />}>{routes}</Suspense>
			</Layout>
			{/*<Footer/>*/}
		</div>
	);
}

export default withRouter(App);
