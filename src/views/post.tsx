import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { IPost } from "watame";

import ClientContext from "../client";
import SideBar, { TagList } from "../components/sidebar";

function Post(props: any): JSX.Element {
	let [id] = useState(props.match.params.id);
	let [post, setPost] = useState<IPost | undefined>(undefined);
	const client = ClientContext();

	useEffect(() => {
		if (client === undefined) return;
		const fetchPost = async () => setPost(await client.getPostById(id));
		fetchPost();
	}, [client, id]);

	let sidebar, view;
	if (post !== undefined) {
		sidebar = (
			<SideBar>
				<TagList tags={post.tag_vector} />
				<InfoList data={post} />
			</SideBar>
		);
		view = (
			<div className="content">
				<img
					className="fitimage"
					alt=""
					src={client.getImagePath(post)}
				/>
				<Description desc={post.description} />
			</div>
		);
	} else {
		sidebar = (
			<SideBar>
				<h3>Post loading...</h3>
			</SideBar>
		);
		view = null;
	}

	return (
		<div className="main">
			{sidebar}
			{view}
		</div>
	);
}

function InfoList({ data }: { data: IPost }): JSX.Element {
	function ListItem({
		label,
		value,
	}: {
		label: string;
		value: string;
	}): JSX.Element {
		return (
			<li>
				<strong>{label}: </strong>
				<span>{value}</span>
			</li>
		);
	}

	let modified = null;
	if (data.create_date !== data.modified_date) {
		modified = (
			<ListItem
				label="Uploaded"
				value={new Date(data.modified_date).toUTCString()}
			/>
		);
	}

	return (
		<>
			<h3>Details</h3>
			<ul className="post-details">
				<ListItem label="ID" value={String(data.id)} />
				<ListItem label="Rating" value={data.rating} />
				<ListItem label="Score" value={String(data.score)} />
				<ListItem
					label="Dimensions"
					value={`${data.width} x ${data.height}`}
				/>
				<ListItem
					label="Size"
					value={human_readable_bytes(data.size)}
				/>
				<ListItem
					label="Uploaded"
					value={new Date(data.create_date).toUTCString()}
				/>
				{modified}
			</ul>
		</>
	);
}

function Description(props: { desc: string }): JSX.Element {
	return (
		<>
			<h3>Description</h3>
			<p>{props.desc === "" ? "No Description Provided" : props.desc}</p>
		</>
	);
}

const human_readable_bytes = (size: number): string => {
	if (size / 1000 > 1000) return `${(size / 1000 / 1000).toFixed(1)}MB`;
	else return `${Math.round(size / 1000)}KB`;
};

export default withRouter(Post);
