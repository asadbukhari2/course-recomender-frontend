import React from "react";
import Modal from "react-modal";

import classes from "./Course.module.css";

import { useStore } from "../../../hooks-store/store";

import BagSVG from "../../../hoc/SVGIcons/BagSVG";
import Aux from "../../../hoc/_Aux/_Aux";

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

function Course(props) {
	const dispatch = useStore()[1];
	const state = useStore()[0];

	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	console.log(props.fItem);
	const toggleCartHandler = () => {
		if (state.cart.items.length > 0) {
			state.cart.items
				.filter(item => item.id === props.fItem.id)
				.map(() => {
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

	return (
		<Aux>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
				ariaHideApp={false}>
				<div className={classes.Modal}>
					<div className={classes.ModalImg}>
						<img src={props.fItem.photo} alt={"Featured Item"} />
					</div>
					<div className={classes.ModalDescription}>
						<div className={classes.ModalTitle}>
							{props.fItem.name.toUpperCase()}
						</div>
						<div className={classes.ModalPrice}>
							Rs:
							{" " + Math.floor(props.fItem.price)}
						</div>
					</div>
					<div className={classes.ModalRating}>
						<h5>Rating</h5>
						<div className={classes.ModalRatingNumber}>
							{Math.floor(props.fItem.rating)}
						</div>
					</div>
					<div className={classes.ModalDescriptionText}>
						<h5 style={{ marginBottom: "10px" }}>Description:</h5>
						<p style={{ marginBottom: "10px" }}>{props.fItem.description}</p>
					</div>
				</div>
			</Modal>

			<div className={classes.Container}>
				<img
					className={classes.Image}
					src={props.fItem.photo}
					alt={"Featured Item"}
					onClick={openModal}
				/>

				<div className={classes.Middle}>
					<div className={classes.ToolTip} onClick={toggleCartHandler}>
						<span className={classes.ToolTipText}>Add to Cart</span>
						<BagSVG
							name={"bag"}
							fill={"transparent"}
							width={35}
							className={
								props.fItem.sku > 0 ? classes.BagSVG : classes.BagSVGNotAllowed
							}
						/>
					</div>
				</div>

				<div className={classes.Rating}>
					<span>&#9733;</span>
					<span>&#9733;</span>
					<span>&#9733;</span>
					<span>&#9733;</span>
					<span>&#9734;</span>
				</div>

				<div className={classes.DetailView}>
					<div className={classes.Title}>
						<span>{props.fItem.name}</span>
					</div>
				</div>
			</div>
		</Aux>
	);
}

export default React.memo(Course);
