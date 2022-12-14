import Axios from "../axios-request";
import { authHeader } from "./authHeader";

export const FetchCart = () => {
	return Axios.get("cart", authHeader()).then(response => {
		// console.log('response in fetchCart is : ', response)
		return response;
	});
};

// export const SubmitCart = (data) => {
//     // const cart = JSON.parse(localStorage.getItem('cart'))
//
//     return Axios.post('cart', data)
//         .then()((response)=> {
//             console.log('cart submit response is : ', response)
//             return response.data
//         })
// }
