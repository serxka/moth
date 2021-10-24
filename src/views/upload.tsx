import React from "react";

import SideBar from "../components/sidebar";
// import conf from "../config";

function Upload(): JSX.Element {
	let sidebar;
	sidebar = <SideBar />;

	return (
		<div className="main">
			{sidebar}
			<h1>Upload Page</h1>
		</div>
	);
}

export default Upload;
