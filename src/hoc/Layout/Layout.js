import React, { useState } from "react";

import classes from "./Layout.module.css";
import Aux from "../_Aux/_Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/Side Drawer/SideDrawer";
import Footer from "../../components/Footer/Footer";

function Layout(props) {
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

	const sideDrawerOpenHandler = e => {
		e.stopPropagation();
	};

	const sideDrawerClosedHandler = () => {
		setSideDrawerIsVisible(false);
	};

	const sideDrawerToggleHandler = () => {
		setSideDrawerIsVisible(!sideDrawerIsVisible);
	};

	return (
		<Aux>
			<Toolbar
				isAuth={props.isAuthenticated}
				drawerToggleClicked={sideDrawerToggleHandler}
				isSideDrawerVisible={sideDrawerIsVisible}
			/>

			<SideDrawer
				isAuth={props.isAuthenticated}
				open={sideDrawerIsVisible}
				closed={sideDrawerClosedHandler}
				opened={sideDrawerOpenHandler}
			/>

			<main className={classes.Content}>{props.children}</main>

			<Footer />
		</Aux>
	);
}

export default Layout;
