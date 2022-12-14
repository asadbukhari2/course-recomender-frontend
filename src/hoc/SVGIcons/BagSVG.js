import React from "react";

const BagSVG = ({
	style = {},
	fill = "#000",
	width = "100%",
	className = "",
	viewBox = "0 0 512 512",
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={width}
		fill={fill}
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1"
		className="feather feather-shopping-bag"
		viewBox="0 0 24 24">
		<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
		<path d="M3 6L21 6" />
		<path d="M16 10a4 4 0 01-8 0" />
	</svg>
);

export default BagSVG;
