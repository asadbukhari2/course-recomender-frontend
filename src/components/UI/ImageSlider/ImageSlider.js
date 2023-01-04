import React, { useState } from "react";

import baseClasses from "../../../assets/css/base.module.css";
import classes from "./ImageSlider.module.css";

import Aux from "../../../hoc/_Aux/_Aux";

function ImageSlider(props) {
	const [index, setIndex] = useState(0);

	console.log("images in imageslider is : ", props);

	let propsChildren = [];
	if (props && props.children && props.children.length > 0) {
		propsChildren = props.children;
	}

	let productToView = propsChildren.slice(index, index + 1).map(child => {
		propsChildren.push(child);
		return child;
	});

	const slideLeft = () => {
		setIndex((index + 1) % props.images.length);
	};

	const slideRight = () => {
		const nextIndex = index - 1;
		if (nextIndex < 0) {
			setIndex(props.images.length - 1);
		} else {
			setIndex(nextIndex);
		}
	};

	let images;
	if (props.display === "main") {
		images = props.images.length > 0 && (
			<Aux>
				<div
					className={[
						classes.SlideShowContainer,
						baseClasses.BackgroundImgOne,
					].join(" ")}>
					<div className={classes.Fade}>
						{/* <div className={classes.NumberText}>
							{index + 1}/{props.images.length}
						</div> */}
						<img
							src={props.images[index]}
							alt={index}
							style={{
								objectCover: "cover",
								width: "",
							}}
						/>
						{/*{productToView}*/}
						{/* <div className={classes.Text}>image {index + 1}</div> */}
					</div>
					<button
						className={[classes.Prev, classes.Fade].join(" ")}
						onClick={slideLeft}>
						&#10094;
					</button>
					<button className={classes.Next} onClick={slideRight}>
						&#10095;
					</button>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a className={classes.Prev} onClick={slideRight}>
						&#10094;
					</a>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a className={classes.Next} onClick={slideLeft}>
						&#10095;
					</a>
				</div>

				{/*<br/>*/}

				{/*<div style={{textAlign: "center"}}>*/}
				{/*    <span className={classes.Dot} onClick={() => setIndex(0)}/>*/}
				{/*    <span className={classes.Dot} onClick={() => setIndex(1)}/>*/}
				{/*    <span className={classes.Dot} onClick={() => setIndex(2)}/>*/}
				{/*    <span className={classes.Dot} onClick={() => setIndex(3)}/>*/}
				{/*</div>*/}
			</Aux>
		);
	}

	// setTimeout(slideLeft, 3000)

	return (
		props.images.length > 0 && (
			<section className={classes.ImageSlider}>{images}</section>
		)
	);
}

export default ImageSlider;
