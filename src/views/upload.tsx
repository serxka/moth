import React, { useState } from "react";
import { IPostPartial } from "watame";

import ClientContext from "../client";
import SideBar from "../components/sidebar";
// import conf from "../util";

function Upload(): JSX.Element {
	let [uploaded, setUploaded] = useState(-1);
	const client = ClientContext();

	function handleSubmit(event: any) {
		const file = event.target[0].files[0];
		const body = {
			tags: event.target[1].value.split(","),
			description: event.target[2].value,
		};

		client.uploadPost(body, file, file.filename).then((p: IPostPartial) => {
			setUploaded(p.id);
		});

		event.preventDefault();
	}

	return (
		<div className="main">
			<SideBar />
			<form onSubmit={handleSubmit}>
				<label>
					<strong>Image: </strong>
					<input type="file" accept="image/*" required />
				</label>
				<label>
					<strong>Tags: </strong>
					<textarea
						placeholder="comma separated tags go here"
						required
					></textarea>
				</label>
				<label>
					<strong>Description: </strong>
					<textarea placeholder="An image description, optional"></textarea>
				</label>
				<button>Upload</button>
				{uploaded < 0 || (
					<strong>
						Uploaded post! <a href={`/post/${uploaded}`}>view</a>{" "}
					</strong>
				)}
			</form>
		</div>
	);
}

export default Upload;
