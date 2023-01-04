import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import configureAuthStore from "./hooks-store/auth-store";
import configureCoursesStore from "./hooks-store/course-store";
import configureCartStore from "./hooks-store/cart-store";

configureAuthStore();
configureCoursesStore();
configureCartStore();

const app = (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

ReactDOM.render(
	<React.StrictMode>{app}</React.StrictMode>,
	document.getElementById("root")
);

//
