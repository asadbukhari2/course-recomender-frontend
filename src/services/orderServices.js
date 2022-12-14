import Axios from "../axios-request";
import { authHeader } from "./authHeader";

export const FetchOrders = () => {
	return Axios.get("order", authHeader()).then(response => {
		return response.data;
	});
};

// export const SubmitOrder = (data) => {
export function SubmitOrder(data) {
	return Axios.post("order", data, authHeader()).then(response => {
		return response.data;
	});
}
