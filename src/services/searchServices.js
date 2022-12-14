import Axios from "../axios-request";

export const Search = data => {
	let value;
	if (data.search_type === "men") {
		value = 1;
	} else if (data.search_type === "women") {
		value = 2;
	} else {
		value = null;
	}

	return Axios.get("product", {
		params: { category: value, tag: data.search_input },
	})
		.then(response => {
			console.log(
				"response of Search products through query params : ",
				response
			);
			return response.data;
		})
		.catch(error => {
			console.log("error of Search products through query params : ", error);
			return error;
		});
};
