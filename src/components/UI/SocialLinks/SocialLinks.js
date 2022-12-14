import React from "react";

import classes from "./SocialLinks.module.css";

import FacebookSVG from "../../../hoc/SVGIcons/FacebookSVG";
import TwitterSVG from "../../../hoc/SVGIcons/TwitterSVG";
import GoogleSVG from "../../../hoc/SVGIcons/GoogleSVG";
import InstagramSVG from "../../../hoc/SVGIcons/InstagramSVG";
import WhatsAppSVG from "../../../hoc/SVGIcons/WhatsAppSVG";

function SocialLinks(props) {
	let width;
	if (window.innerWidth > 600) {
		width = 50;
	} else {
		width = 40;
	}

	return (
		<div className={classes.SocialLinks}>
			<div className={classes.FooterLinks}>
				<ul className={classes.SocialLinksIcons}>
					<li>
						<a href={"https://wa.me/923316072720"}>
							<WhatsAppSVG
								name={"facebook"}
								fill={"#060606"}
								// width={window.innerWidth > 600 ? 50 : 40}
								width={width}
								className={classes.WhatsApp}
							/>
						</a>
					</li>

					<li>
						<a href={"https://www.facebook.com/JrClothsCo"}>
							<FacebookSVG
								name={"facebook"}
								fill={"#060606"}
								width={width}
								className={classes.Facebook}
							/>
						</a>
					</li>

					<li>
						<a href={"https://twitter.com/ClothsCo"}>
							<TwitterSVG
								name={"twitter"}
								fill={"#060606"}
								width={width}
								className={classes.Twitter}
							/>
						</a>
					</li>

					<li>
						<a href={"/"}>
							<GoogleSVG
								name={"google"}
								fill={"#060606"}
								width={width}
								className={classes.Google}
							/>
						</a>
					</li>

					<li>
						<a href={"/"}>
							<InstagramSVG
								name={"instagram"}
								fill={"#060606"}
								width={width}
								className={classes.Instagram}
							/>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default SocialLinks;
