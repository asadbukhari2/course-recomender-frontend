import React, { useState, useEffect } from "react";

import classes from "./MyCart.module.css";

import { NavLink } from "react-router-dom";

import { useStore } from "../../hooks-store/store";

import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import { getCurrentUser } from "../../services/authService";

function MyCart(props) {
	const [update, setUpdate] = useState(false);

	const dispatch = useStore()[1];
	const state = useStore()[0];

	const updateCartHandler = () => {
		setUpdate(!update);
	};

	const increaseHandler = product => {
		dispatch("ADDITION_CART", product);

		if (localStorage.getItem("cart").length > 0) {
			localStorage.removeItem("cart");
			localStorage.setItem("cart", JSON.stringify(state.cart.items));
		} else {
			dispatch("EMPTY_CART", props.fItem);
			localStorage.removeItem("cart");
		}

		// if (localStorage.getItem('cart')) {
		//     localStorage.removeItem('cart')
		// }
		// localStorage.setItem('cart', JSON.stringify(state.cart.items))
	};

	const decreaseHandler = product => {
		dispatch("SUBTRACTION_CART", product);

		if (localStorage.getItem("cart").length > 0) {
			localStorage.removeItem("cart");
			localStorage.setItem("cart", JSON.stringify(state.cart.items));
		} else {
			dispatch("EMPTY_CART", props.fItem);
			localStorage.removeItem("cart");
		}

		// if (localStorage.getItem('cart')) {
		//     localStorage.removeItem('cart')
		// }
		// localStorage.setItem('cart', JSON.stringify(state.cart.items))
	};

	const removeHandler = product => {
		dispatch("DELETION_CART", product);

		if (localStorage.getItem("cart").length > 2) {
			localStorage.removeItem("cart");
			localStorage.setItem("cart", JSON.stringify(state.cart.items));
		} else {
			dispatch("EMPTY_CART");
			localStorage.removeItem("cart");
		}
		// localStorage.setItem('cart', JSON.stringify(state.cart.items))
	};

	// useEffect(() => {
	//     if(state.auth.token){
	//         const userId = getCurrentUser().decodeUser
	//         const data = {customer: userId, products: state.cart.items}
	//         SubmitCart(data)
	//             .then((response) => {
	//                 console.log('cart response in useEffect is : ', response)
	//                 return response
	//             })
	//     }
	// }, [state.auth.token, state.cart.items])

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
								src={item.image}
								alt={"product"}
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
								src={item.image}
								alt={"product"}
							/>
						</td>
						{props.styleFor === "hover" ? null : <td>{item.description}</td>}
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
		// controller = (
		//     // <div className={classes.Controller}>
		//     //     <Button
		//     //         btnType={'ButtonFull'}
		//     //     >
		//     //         Check Out
		//     //     </Button>
		//     // </div>
		// )
	} else {
		controller = (
			<div className={classes.Controller}>
				{/*<h3>UPDATE</h3>*/}
				<div>
					<Button btnType={"ButtonFull"}>
						{/*<a onClick={updateCartHandler}>UPDATE</a>*/}
						<p onClick={updateCartHandler}>UPDATE</p>
					</Button>
				</div>

				<div>
					<NavLink
						// exact={props.exact}
						to={"/checkout"}>
						<Button btnType={"ButtonFull"}>CHECK OUT</Button>
					</NavLink>
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
			{/*<h2>My Cart</h2>*/}
			<div className={classes.TableContent}>
				<table>
					<thead>
						<tr>
							<th>Product</th>
							{props.styleFor === "hover" ? null : update === true ? (
								<th>Price</th>
							) : (
								<th>Description</th>
							)}
							{update === true ? <th>Qty</th> : <th>Price</th>}
							{update === true ? <th>Total</th> : <th>Qty</th>}
							{update === true ? <th>Delete</th> : <th>Total</th>}
							{/*{update === true ? <th>Delete</th> : null}*/}
							{/*{update ? <th/> : null}*/}
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

			{/*<div className={classes.Controller}>*/}
			{/*    /!*<h3>UPDATE</h3>*!/*/}
			{/*    <div>*/}
			{/*        <Button btnType={'ButtonFull'}>*/}
			{/*            <a onClick={updateCartHandler}>UPDATE</a>*/}
			{/*        </Button>*/}
			{/*    </div>*/}

			{/*    <div>*/}
			{/*        <NavLink*/}
			{/*            // exact={props.exact}*/}
			{/*            to={'/checkout'}*/}
			{/*        >*/}
			{/*            <Button btnType={'ButtonFull'}>*/}
			{/*                CHECK OUT*/}
			{/*            </Button>*/}
			{/*        </NavLink>*/}
			{/*    </div>*/}
			{/*</div>*/}
		</section>
	);
}

export default MyCart;
