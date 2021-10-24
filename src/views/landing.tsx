import React from "react";
import { Link } from "react-router-dom";

import { SearchBar } from "../components/sidebar";

function Landing(): JSX.Element {
	return (
		<div className="landing">
			<pre>{`
                 _   _     
                | | | |    
 _ __ ___   ___ | |_| |__  
| '_ \` _ \\ / _ \\| __| '_ \\.
| | | | | | (_) | |_| | | |
|_| |_| |_|\\___/ \\__|_| |_|`}</pre>
			<ul className="menu-navbar">
				<li>
					<Link className="hidden-link" to="/">
						Home
					</Link>
				</li>
				<li>
					<Link className="hidden-link" to="/browse">
						Browse
					</Link>
				</li>
				<li>
					<Link className="hidden-link" to="/upload">
						Upload
					</Link>
				</li>
			</ul>
			<SearchBar />
			<p className="hint">
				TIP: tags are separated by commas:&nbsp;
				<span>
					reg, made in abyss, shota, helmet, brown hair, robot
				</span>
			</p>
		</div>
	);
}

export default Landing;
