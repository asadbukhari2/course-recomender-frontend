import React from "react";
import Modal from "react-modal";

import classes from "./EnrolledCourse.module.css";
import { useStore } from "../../../hooks-store/store";
import BagSVG from "../../../hoc/SVGIcons/BagSVG";
import image from "../../../assets/images/a3.jpg";
import Aux from "../../../hoc/_Aux/_Aux";
import Button from "../Button/Button";
import { Redirect } from "react-router-dom";

const customStyles = {
	content: {
		width: "50%",
		top: "52%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

function EnrolledCourse(props) {
	const dispatch = useStore()[1];
	const state = useStore()[0];

	const { course } = props;
	console.log(course, "fghdfiughdfghiuf");
	const string =
		"is simply dummy text of the printing and typesetting industry. LoremIpsum";
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const toggleCartHandler = () => {
		if (state.cart.items.length > 0) {
			state.cart.items
				.filter(item => item.id === props.fItem.id)
				.map(filterItem => {
					if (localStorage.getItem("cart")) {
						localStorage.removeItem("cart");
					}
					dispatch("ADDITION_CART", props.fItem);
					// alert("Added to Cart Successfully!");
					localStorage.setItem("cart", JSON.stringify(state.cart.items));
				});

			if (
				!(
					state.cart.items.filter(item => item.id === props.fItem.id).length > 0
				)
			) {
				if (localStorage.getItem("cart")) {
					localStorage.removeItem("cart");
				}
				dispatch("ADD_CART", props.fItem);
				// alert("Added to Cart Successfully!");
				localStorage.setItem("cart", JSON.stringify(state.cart.items));
			}
		} else {
			if (localStorage.getItem("cart")) {
				localStorage.removeItem("cart");
			}
			dispatch("INITIATING_CART", props.fItem);
			// alert("Added to Cart Successfully!");
			localStorage.setItem("cart", JSON.stringify(state.cart.items));
		}
	};

	console.log("pops in course component before return : ", props);

	return (
		<Aux>
			<div className={classes.Container}>
				<img
					className={classes.Image}
					// src={props.fItem.photo}
					src={course.photo}
					alt={"Featured Item"}
				/>
				<div className={classes.DetailView}>
					<div className={classes.Title}>
						<span>{course.name}</span>
					</div>
					<div className={classes.Price}>
						<span>Rs: {" " + Math.floor(course.price)}</span>
					</div>
				</div>
				<div className={classes.ModalDescriptionText}>
					<h5 style={{ marginBottom: "5px" }}>Description:</h5>
					<p style={{ marginBottom: "5px", fontSize: "14px" }}>
						{string.substring(0, 50)}...
					</p>
				</div>
				{course.study_mode === 2 && (
					<div className={classes.LinkBtn}>
						<a href="https://www.youtube.com" target="_blank" rel="noreferrer">
							goto course
						</a>
					</div>
				)}
			</div>
		</Aux>
	);
}

export default React.memo(EnrolledCourse);
