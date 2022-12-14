import React from "react";

import classes from "./SideDrawer.module.css";

import Logo from "../../UI/Logo/Logo";
import Backdrop from "../../UI/BackDrop/Backdrop";
import Aux from "../../../hoc/_Aux/_Aux";
import NavigationItems from "../NavigationItems/NavigationItems";
// import SearchBar from "../../SearchBar/SearchBar";

function SideDrawer(props) {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(" ")} onClick={props.closed}>
				<div className={classes.Logo}>
					<Logo />
				</div>

				<div onClick={props.opened} className={classes.SearchBar}>
					{/*<div className={classes.SearchBar}>*/}
					{/*    <SearchBar/>*/}
				</div>

				<nav>
					<NavigationItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</Aux>
	);
}

export default SideDrawer;
