import React from "react";

import classes from "./Button.module.css";

import { useStore } from "../../../hooks-store/store";
import Aux from "../../../hoc/_Aux/_Aux";

function Button(props) {
	const dispatch = useStore(true)[1];

	const toggleDispatchHandler = () => {
		if (props.dispatchValue) {
			dispatch(props.dispatchAction, props.dispatchValue);
		} else if (props.dispatchValueSecond) {
			dispatch(
				props.dispatchAction,
				props.dispatchValue,
				props.dispatchValueSecond
			);
		} else {
			dispatch(props.dispatchAction);
		}
	};

	let showButton;
	if (props.dispatchAction || props.dispatchValue) {
		showButton = (
			<button
				className={[classes.Button, classes[props.btnType]].join(" ")}
				onClick={toggleDispatchHandler}>
				{props.children}
			</button>
		);
	} else {
		showButton = (
			<button
				className={[classes.Button, classes[props.btnType]].join(" ")}
				onClick={props.onclick}>
				{props.children}
			</button>
		);
	}

	return <Aux>{showButton}</Aux>;
}

export default Button;
