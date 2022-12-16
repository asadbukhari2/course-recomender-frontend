import React from "react";

import classes from "./Footer.module.css";
import baseClasses from "../../assets/css/base.module.css";

import FacebookSVG from "../../hoc/SVGIcons/FacebookSVG";
import GoogleSVG from "../../hoc/SVGIcons/GoogleSVG";
import InstagramSVG from "../../hoc/SVGIcons/InstagramSVG";
import TwitterSVG from "../../hoc/SVGIcons/TwitterSVG";
import WhatsAppSVG from "../../hoc/SVGIcons/WhatsAppSVG";

function Footer() {
	return (
		<footer>
			{/*<div className={classes.FooterIcons}>*/}
			<div className={[baseClasses.Row, classes.FooterIcons].join(" ")}>
				<div className={classes.FooterLinks}>
					<ul className={classes.FooterNav}>
						<li>
							<a href="/">About us</a>
						</li>
						<li>
							<a href="/">Blog</a>
						</li>
						<li>
							<a href="/">Press</a>
						</li>
						<li>
							<a href="/">iOS App</a>
						</li>
						<li>
							<a href="/">Android App</a>
						</li>
					</ul>

					<ul className={classes.SocialLinks}>
						<li>
							<a href={"/"}>
								<WhatsAppSVG
									name={"facebook"}
									fill={"#888"}
									width={25}
									className={classes.WhatsApp}
								/>
							</a>
						</li>

						<li>
							<a href={"/"}>
								<FacebookSVG
									name={"facebook"}
									fill={"#888"}
									width={25}
									className={classes.Facebook}
								/>
							</a>
						</li>

						<li>
							<a href={"/"}>
								<TwitterSVG
									name={"twitter"}
									fill={"#888"}
									width={25}
									className={classes.Twitter}
								/>
							</a>
						</li>

						<li>
							<a href={"/"}>
								<GoogleSVG
									name={"google"}
									fill={"#888"}
									width={25}
									className={classes.Google}
								/>
							</a>
						</li>

						<li>
							<a href={"/"}>
								<InstagramSVG
									name={"instagram"}
									fill={"#888"}
									width={25}
									className={classes.Instagram}
								/>
							</a>
						</li>
					</ul>
				</div>
				{/*<div className={classes.Copy}>*/}
				<div className={[baseClasses.Row, classes.Copy].join(" ")}>
					<p>
						Copyright &copy; 2021 by Course Recommender. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
