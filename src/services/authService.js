import Axios from "../axios-request";

import ParseJwt from "../shared/JwtParser";
import { authHeader } from "./authHeader";

// import {useStore} from "../hooks-store/store";

export const Register = (user, contact_no, city_name) => {
	return Axios.post("student", { user, contact_no, city_name }).then(
		response => {
			if (response.data.token) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return response.data;
		}
	);
};

export const VerifyUser = () => {
	const token = getCurrentUser().token;

	return Axios.post("api-token-verify", { token })
		.then(response => {
			if (response.status === 200) {
				return true;
			} else if (response.status === 400) {
				return false;
			}
		})
		.catch(error => {
			console.log("api token verify error is : ", error);
		});
};

export const Login = (username, password, login_as) => {
	// const dispatch = useStore()[1]
	return Axios.post("auth", {
		username,
		password,
		login_as,
	}).then(response => {
		console.log(
			"before storing token into local storage response is : ",
			response
		);
		if (response.data.token) {
			localStorage.setItem("user", JSON.stringify(response.data));
			// dispatch('AUTH_SUCCESS', getCurrentUser().token)
		}

		if (response.status === 200) {
			console.log("response status is : ", response.status);
			alert("Successfully Login !");
		} else {
			console.log("response status is : ", response.status);
			alert("Invalid Login !");
		}

		return response.data;
	});
};

export const FetchLogedInUser = userId => {
	return Axios.get("student/" + userId, authHeader())
		.then(response => {
			// console.log('FetchLogedInUser response is : ', response)
			return response.data;
		})
		.catch(error => {
			console.log("Error in FetchedLogedInUser is : ", error);
			return error;
		});
};

export const LogoutService = () => {
	localStorage.removeItem("user");
	window.location.reload();
};

export const getCurrentUser = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	let token, decodeUser;
	if (user) {
		token = user.token;
		decodeUser = ParseJwt(token);
		return { token, decodeUser };
	}
	return {};
};
