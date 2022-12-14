import React from "react";

import classes from "./Card.module.css";

function Card(props) {
	return (
		<div className={classes.Card}>
			<img src={props.avatar} alt={"Avatar"} className={classes.Image} />
			<div className={classes.Container}>
				<h4>
					<b>{props.cName}</b>
				</h4>
				<p>{props.cSlogan}</p>
			</div>
		</div>
	);
}

export default Card;
