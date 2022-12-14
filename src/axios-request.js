import Axios from "axios";

const instance = Axios.create({
	baseURL: "http://192.168.43.47:8000/api/" /*local server*/,
	// baseURL: 'http://192.168.10.14:8000/api/' /*local server*/
});

export default instance;
