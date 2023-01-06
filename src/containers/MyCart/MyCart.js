import React, { useState } from "react";

import classes from "./MyCart.module.css";
import { useStore } from "../../hooks-store/store";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import { useHistory } from "react-router-dom";

function MyCart(props) {
	const [update, setUpdate] = useState(false);
	const history = useHistory();

	const dispatch = useStore()[1];
	const state = useStore()[0];

	const updateCartHandler = () => {
		setUpdate(!update);
	};

	const increaseHandler = course => {
		dispatch("ADDITION_CART", course);

		if (localStorage.getItem("cart").length > 0) {
			localStorage.removeItem("cart");
			localStorage.setItem("cart", JSON.stringify(state.cart.items));
		} else {
			dispatch("EMPTY_CART", props.fItem);
			localStorage.removeItem("cart");
		}
	};

	const decreaseHandler = course => {
		dispatch("SUBTRACTION_CART", course);

		if (localStorage.getItem("cart").length > 0) {
			localStorage.removeItem("cart");
			localStorage.setItem("cart", JSON.stringify(state.cart.items));
		} else {
			dispatch("EMPTY_CART", props.fItem);
			localStorage.removeItem("cart");
		}
	};

	const removeHandler = course => {
		dispatch("DELETION_CART", course);

		if (localStorage.getItem("cart").length > 2) {
			localStorage.removeItem("cart");
			localStorage.setItem("cart", JSON.stringify(state.cart.items));
		} else {
			dispatch("EMPTY_CART");
			localStorage.removeItem("cart");
		}
	};
	const onCheckOut = () => {
		dispatch("EMPTY_CART");
		history.push("/");
	};

	let cart;
	let grandTotal = 0;

	if (state.cart.items) {
		cart = state.cart.items.map(item => {
			grandTotal += item.total_price;
			if (update) {
				return (
					<tr key={item.id}>
						<td>
							<img
								className={props.styleFor ? classes.HoverImage : classes.Image}
								src={item.photo}
								alt={"course"}
							/>
						</td>
						{props.styleFor === "hover" ? null : update === true ? (
							<td>{Math.floor(item.price)}</td>
						) : (
							<td>{item.description}</td>
						)}
						{update === true ? (
							<td>
								<div className={classes.QuantityController}>
									<div
										className={classes.ValueButton}
										onClick={() => decreaseHandler(item)}>
										&minus;
									</div>

									<label className={classes.QuantityInput}>
										{item.quantity}
									</label>

									<div
										className={classes.ValueButton}
										onClick={() => increaseHandler(item)}>
										&#43;
									</div>
								</div>
							</td>
						) : (
							<td>{Math.floor(item.price)}</td>
						)}
						{update === true ? (
							<td>{item.total_price}</td>
						) : (
							<td>
								<div className={classes.QuantityController}>
									<div
										className={classes.ValueButton}
										onClick={() => decreaseHandler(item)}>
										&minus;
									</div>

									<label className={classes.QuantityInput}>
										{item.quantity}
									</label>

									<div
										className={classes.ValueButton}
										onClick={() => increaseHandler(item)}>
										&#43;
									</div>
								</div>
							</td>
						)}
						{update === true ? (
							<td>
								<div
									className={classes.Deletion}
									onClick={() => removeHandler(item)}>
									x
								</div>
							</td>
						) : (
							<td>{item.total_price}</td>
						)}
					</tr>
				);
			} else {
				return (
					<tr key={item.id}>
						<td>
							<img
								className={props.styleFor ? classes.HoverImage : classes.Image}
								src={item.photo}
								alt={"course"}
							/>
						</td>
						{props.styleFor === "hover" ? null : (
							<td style={{ fontSize: "12px" }}>
								{item.description.substring(0)}
							</td>
						)}
						<td>{Math.floor(item.price)}</td>
						<td>{item.quantity}</td>
						<td>{item.total_price}</td>
					</tr>
				);
			}
		});
	} else {
		cart = <Spinner />;
	}

	let controller;
	if (props.styleFor === "order") {
	} else {
		controller = (
			<div className={classes.Controller}>
				<div>
					<Button btnType={"ButtonFull"}>
						<p onClick={updateCartHandler}>UPDATE</p>
					</Button>
				</div>

				<div>
					<Button btnType={"ButtonFull"} onclick={onCheckOut}>
						CHECK OUT
					</Button>
				</div>
			</div>
		);
	}

	return (
		<section
			className={
				props.styleFor === "hover"
					? classes.HoverMyCart
					: props.styleFor === "order"
					? classes.MyOrderCart
					: classes.MyCart
			}>
			{props.styleFor === "order" ? <h3>My Cart</h3> : <h2>My Cart</h2>}
			<div className={classes.TableContent}>
				<table>
					<thead>
						<tr>
							<th style={{ marginRight: "10px" }}>Course</th>
							{props.styleFor === "hover" ? null : update === true ? (
								<th>Price</th>
							) : (
								<th>Description</th>
							)}
							{update === true ? <th>Qty</th> : <th>Price</th>}
							{update === true ? <th>Total</th> : <th>Qty</th>}
							{update === true ? <th>Delete</th> : <th>Total</th>}
						</tr>
					</thead>

					<tbody className={classes.MyCartBody}>{cart}</tbody>
				</table>
			</div>

			<div className={classes.Total}>
				<h3>Total&nbsp;&nbsp;</h3>
				<p>RS:</p>
				<h2>{grandTotal}</h2>
			</div>

			{controller}
		</section>
	);
}

export default MyCart;
