import { initStore } from "./store";
import { getCurrentUser } from "../services/authService";

const configureAuthStore = () => {
	const actions = {
		AUTH: currState => {
			console.log("AUTH");

			currState.auth.loading = true;
			currState.auth.error = null;

			return currState;
		},

		AUTH_START: currState => {
			console.log("AUTH_START");

			const token = getCurrentUser().token;
			const userId = getCurrentUser().decodeUser.user_id;

			// currState.auth.loading = true
			currState.auth.token = token;
			currState.auth.userId = userId;

			return currState;
		},

		AUTH_SUCCESS: (currState, token) => {
			console.log("AUTH_SUCCESS");

			const userId = getCurrentUser().decodeUser.user_id;

			currState.auth.token = token;
			currState.auth.userId = userId;
			currState.auth.error = null;
			currState.auth.loading = false;

			return currState;
		},

		// FETCH_USER: (currState, data) => {
		//     console.log('FETCH_USER')
		//
		//     currState.auth.user = data
		//
		//     return currState
		// },

		LOGOUT: currState => {
			console.log("LOGOUT");

			currState.auth.token = null;
			currState.auth.userId = null;

			return currState;
		},
		//
		// SET_AUTH_REDIRECT_PATH: (currState, path) => {
		//     return updateObject(currState, {authRedirectPath: path})
		// }
	};

	initStore(actions, {
		auth: {
			// token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2MTk1MTg1NTcsImp0aSI6ImFhbDkod3k5dHUzKXIzOW1jeXBhYTdwbmdhdz0peiZeJF9oNXJjKm9zYyVxPTFmMWFvIiwiZW1haWwiOiJhbGloYXFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbGloYXFAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MTE3NDI1NTd9.NL89vTEX-uCEkEKF5JXilub801z8rqQBgj9WOwgfXCM",
			token: null,
			// user: [],
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: "/",
		},
	});
};

export default configureAuthStore;
