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

			currState.auth.token = token;
			currState.auth.userId = userId;

			return currState;
		},

		AUTH_SUCCESS: (currState, token) => {
			console.log("AUTH_SUCCESS");

			const userId = getCurrentUser().decodeUser.user_id;
			const user = getCurrentUser().decodeUser;

			currState.auth.token = token;
			currState.auth.userId = userId;
			currState.auth.user = user;
			currState.auth.error = null;
			currState.auth.loading = false;

			return currState;
		},

		LOGOUT: currState => {
			console.log("LOGOUT");

			currState.auth.token = null;
			currState.auth.userId = null;

			return currState;
		},
	};

	initStore(actions, {
		auth: {
			token: null,
			userId: null,
			error: null,
			loading: false,
			// authRedirectPath: "/",
		},
	});
};

export default configureAuthStore;
