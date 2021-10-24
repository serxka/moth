import React from "react";
import { Link } from "react-router-dom";

function MenuBar(): JSX.Element {
	return (
		<header className="menu">
			<ul className="menu-navbar">
				<li>
					<h2 className="logo">moth</h2>
				</li>
				<li>
					<Link className="hidden-link dark" to="/">
						Home
					</Link>
				</li>
				<li>
					<Link className="hidden-link dark" to="/browse">
						Browse
					</Link>
				</li>
				<li>
					<Link className="hidden-link dark" to="/upload">
						Upload
					</Link>
				</li>
			</ul>
		</header>
	);
}

export default MenuBar;
