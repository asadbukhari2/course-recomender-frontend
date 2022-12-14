import Axios from "../axios-request";
import { authHeader } from "./authHeader";

export const UploadAvatar = data => {
	return Axios.patch("customer/" + data.user.id, data, authHeader())
		.then(response => {
			console.log("Response of UploadAvatar is : ", response);
			return response.data;
		})
		.catch(error => {
			console.log("Error of UploadAvatar is : ", error);
			return error;
		});
};

export const UpdateUserProfile = data => {
	return Axios.patch("customer/" + data.user.id, data, authHeader())
		.then(response => {
			console.log("Response of EditUserName is : ", response);
			return response.data;
		})
		.catch(error => {
			console.log("Error of EditUserName is : ", error);
			return error;
		});
};

export const UpdateUserPassword = data => {
	return Axios.put("change-password", data, authHeader())
		.then(response => {
			console.log("Response of UpdateUserPassword is : ", response);
			return response;
		})
		.catch(error => {
			console.log("Error of UpdateUserPassword is : ", error);
			return error;
		});
};
