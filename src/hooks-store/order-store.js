import { initStore } from "./store";

const configureOrderStore = () => {
	const actions = {
		FETCH_ORDERS: (currState, orders) => {
			console.log("FETCH_ORDERS");

			currState.order.orders = orders;

			return currState;
		},

		INITIATING_ORDER: (currState, data) => {
			console.log("INITIATING_ORDER");

			currState.order.data = data;

			return currState;
		},

		SUBMIT_ORDER: currState => {
			console.log("SUBMIT_ORDER");

			currState.order.data.customer = currState.auth.userId;
			currState.order.data.order[0].customer = currState.auth.userId;

			return currState;
		},

		SUBMIT_ORDER_SUCCESS: currState => {
			console.log("SUBMIT_ORDER_SUCCESS");

			currState.order.data = {};

			return currState;
		},

		DETAILED_ORDER: (currState, data) => {
			console.log("DETAILED_ORDER", data);

			currState.order.orderDetail = data;

			return currState;
		},

		/*not in use at the moment*/
		SUBMIT_ORDER_END: currState => {
			console.log("SUBMIT_ORDER_END");

			currState.order.purchased = false;

			return currState;
		},
	};

	initStore(actions, {
		order: {
			orders: [],
			data: null,
			orderDetail: null,
			// grandTotal: null,
			loading: false,
			purchased: false,
		},
	});
};

export default configureOrderStore;
