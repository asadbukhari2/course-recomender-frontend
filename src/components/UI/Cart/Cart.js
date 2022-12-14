import React, { useState } from "react";

import classes from "./Cart.module.css";

import { NavLink } from "react-router-dom";
import { useStore } from "../../../hooks-store/store";

import BagSVG from "../../../hoc/SVGIcons/BagSVG";
import Button from "../Button/Button";
import MyCart from "../../../containers/MyCart/MyCart";

function Cart(props) {
	const [view, setView] = useState(false);

	const state = useStore()[0];

	const cartItems = state.cart.items;

	const toggleDetailViewHandler = () => {
		setView(!view);
	};

	let items,
		totalPrice = 0;

	if (cartItems) {
		items = cartItems.length;
		cartItems.map(cartItem => {
			return (totalPrice += parseInt(cartItem.total_price));
		});
	} else {
		items = 0;
		totalPrice = 0;
	}

	return (
		<ul className={classes.NavIcons}>
			<li>
				<button className={classes.Cart} type={"submit"}>
					<a href={"#"} title={""} onClick={event => event.preventDefault()}>
						<div className={classes.SvgBag} onClick={toggleDetailViewHandler}>
							<BagSVG
								name={"bag"}
								fill={"#bdc3c7"}
								width={60}
								className={classes.BagSVG}
							/>
							<div className={classes.SvgBagItems}>
								{state.cart.items.length}
							</div>
						</div>
					</a>
				</button>
				<div className={classes.DropDownCart}>
					<div
						// className={classes.DropDownCartDetail}>
						className={
							window.innerWidth >= 500
								? classes.DropDownCartDetail
								: classes.DropDownCartDetailV2
						}>
						{/*className={window.innerWidth >= 500 ? classes.DropDownCartDetail : view === true ? classes.DropDownCartDetailV2 : classes.NoneDisplay}>*/}
						<div className={classes.DropDownCartDetailItems}>
							{/*<OrderDetail styleFor={'hover'}/>*/}
							<MyCart styleFor={"hover"} />
						</div>
						{/*<div className={state.auth.token || state.cart.items.length > 0 ? classes.DropDownButtons : classes.DropDownButton}>*/}
						{/*<div className={state.auth.token || localStorage.getItem('cart').length > 2 ? classes.DropDownButtons : classes.DropDownButton}>*/}
						<div
							className={
								state.cart.items.length > 0
									? classes.DropDownButtons
									: classes.NoneDisplay
							}>
							<div>
								<NavLink
									// exact={props.exact}
									to={"/cart"}>
									<Button>View Cart</Button>
								</NavLink>
							</div>
							{/*{state.auth.token || state.cart.items.length > 0 ?*/}
							{state.cart.items.length > 0 ? (
								<div>
									<NavLink
										// exact={props.exact}
										to={"/checkout"}>
										<Button>Check Out</Button>
									</NavLink>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</li>
			{window.innerWidth > 500 ? (
				<li className={classes.Cart}>
					<NavLink
						// exact={props.exact}
						to={"/cart"}>
						<div className={classes.CartDescription}>
							<p>My Cart</p>
							<p className={classes.Text}>
								<span className={classes.Price}>{items}&nbsp;</span>
								items
								<br />
								<span className={classes.Price}>Rs:{totalPrice}</span>
							</p>
						</div>
					</NavLink>
				</li>
			) : null}
		</ul>
	);
}

export default React.memo(Cart);
