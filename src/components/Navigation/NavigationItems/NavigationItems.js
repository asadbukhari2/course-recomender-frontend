import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Aux from "../../../hoc/_Aux/_Aux";

function NavigationItems(
	props
) {
	return (
		<ul
			className={
				classes.NavigationItems
			}>
			<NavigationItem
				link={
					"/"
				}>
				Home
			</NavigationItem>
			<NavigationItem
				link={
					"/"
				}>
				About
			</NavigationItem>
			{/*{props.isAuthenticated*/}
			{/*    ? <Aux>*/}
			{/*        /!*<NavigationItem link={'/orders'}>Orders</NavigationItem>*!/*/}
			{/*        <NavigationItem link={'/account'}>Account</NavigationItem>*/}
			{/*        /!*<NavigationItem link={'/wishlist'}>WishList</NavigationItem>*!/*/}
			{/*      </Aux>*/}
			{/*    : null*/}
			{/*}*/}
			{!props.isAuthenticated ? (
				<Aux>
					<NavigationItem
						link={
							"/auth"
						}>
						Login
					</NavigationItem>
					<NavigationItem
						link={
							"/sign_up"
						}>
						Signup
					</NavigationItem>
				</Aux>
			) : (
				// : <NavigationItem link={'/account'}>Account</NavigationItem>
				<NavigationItem
					link={
						"/logout"
					}>
					Logout
				</NavigationItem>
			)}

			{/*/!*<NavigationItem link={'/account'}>Account</NavigationItem>*!/*/}
			{/*<NavigationItem link={'/orders'}>Orders</NavigationItem>*/}
			{/*<NavigationItem link={'/auth'}>Authenticate</NavigationItem>*/}
			{/*/!*<NavigationItem link={'/logout'}>Logout</NavigationItem>*!/*/}
		</ul>
	);
}

export default NavigationItems;
