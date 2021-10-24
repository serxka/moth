import React from "react";

import SideBar from "../components/sidebar";
// import conf from "../config";

function Browse(): JSX.Element {
	let sidebar;
	sidebar = <SideBar />;

	return (
		<div className="main">
			{sidebar}
			<h1>Browse Page</h1>
		</div>
	);
}

export default Browse;
