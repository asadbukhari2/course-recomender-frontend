// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import classes from "./Auth.module.css";
import SignIn from "./SignIn/SignIn";

function Auth(props) {
	// eslint-disable-next-line no-unused-vars
	const [controls, setControls] = useState({
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "E-mail Address",
			},
			value: "",
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: "input",
			elementConfig: {
				type: "password",
				placeholder: "Password",
			},
			value: "",
			validation: {
				required: true,
				minLength: 8,
			},
			valid: false,
			touched: false,
		},
	});

	return (
		<div className={classes.Auth}>
			<SignIn link={"/sign_up"} />
		</div>
	);
}

export default Auth;
