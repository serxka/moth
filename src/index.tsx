import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./styles/index.css";

import Browse from "./views/browse";
import Landing from "./views/landing";
import NotFound from "./views/notfound";
import Post from "./views/post";
import Upload from "./views/upload";

import MenuBar from "./components/menubar";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				{/* Index Page */}
				<Route path="/" exact component={Landing} />

				{/* Post Browsing */}
				<Route path="/browse">
					<MenuBar />
					<Browse />
				</Route>

				{/* View a Specific Post */}
				<Route path="/post/:id">
					<MenuBar />
					<Post />
				</Route>

				{/* Uploading a Post */}
				<Route path="/upload" exact>
					<MenuBar />
					<Upload />
				</Route>

				{/* Default Page (404) */}
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
