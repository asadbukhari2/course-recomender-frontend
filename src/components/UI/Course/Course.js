import React from "react";
import ReactStars from "react-rating-stars-component";
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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

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

	console.log("pops in course component before return : ", props);

	return (
		<Aux>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal">
				<div className={classes.Modal}>
					<div className={classes.ModalImg}>
						<img
							// className={classes.Image}
							src={props.fItem.photo}
							alt={"Featured Item"}
						/>
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
						<p style={{ marginBottom: "10px" }}>
							is simply dummy text of the printing and typesetting industry.
							Lorem Ipsum has been the industry's standard dummy text ever since
							the 1500s, when an unknown printer took a galley of type and
							scrambled it to make a type specimen book. It has survived not
							only five centuries, but
						</p>
					</div>
				</div>
			</Modal>

			<div className={classes.Container} onClick={openModal}>
				<img
					className={classes.Image}
					src={props.fItem.photo}
					alt={"Featured Item"}
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

				{/* <div className={classes.Rating}>
					<span>&#9733;</span>
					<span>&#9733;</span>
					<span>&#9733;</span>
					<span>&#9733;</span>
					<span>&#9734;</span>
				</div> */}

				<div className={classes.DetailView}>
					<div className={classes.Title}>
						<span>{props.fItem.name}</span>
					</div>
					{/* <div className={classes.Price}>
						<span>
							Rs:
							{Math.floor(props.fItem.price)}
						</span>
					</div> */}
				</div>
			</div>
		</Aux>
	);
}

export default React.memo(Course);
