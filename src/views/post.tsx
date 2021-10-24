import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import SideBar from "../components/sidebar";
import conf from "../config";

interface IPostData {
	id: number;
	poster: number;
	tag_vector: string[];
	create_date: string;
	modified_date: string;
	description: string;
	rating: string;
	score: number;
	views: number;
	source?: string;
	filename: string;
	ext: string;
	size: number;
	width: number;
	height: number;
	is_deleted: boolean;
}

function Post(props: any): JSX.Element {
	let [id] = useState(props.match.params.id);
	let [data, setData] = useState<IPostData | undefined>(undefined);

	useEffect(() => {
		fetch(`${conf.apiuri}/post?id=${id}`)
			.then((res) => res.json())
			.then((json) => setData(json));
	}, [id]);

	let sidebar, post;
	if (data !== undefined) {
		sidebar = (
			<SideBar>
				<TagList tags={data.tag_vector} />
				<InfoList data={data} />
			</SideBar>
		);
		post = (
			<div className="content">
				<img className="fitimage" alt="" src={format_path(data)} />
				<Description desc={data.description} />
			</div>
		);
	} else {
		sidebar = (
			<SideBar>
				<h3>Post loading...</h3>
			</SideBar>
		);
		post = null;
	}

	return (
		<div className="main">
			{sidebar}
			{post}
		</div>
	);
}

function TagList(props: { tags: string[] }) {
	return (
		<>
			<h3>Tags</h3>
			<ul className="post-tags">
				{props.tags.map((tag, idx) => (
					<span key={idx} className="post-tag">
						{tag}
					</span>
				))}
			</ul>
		</>
	);
}

function InfoList({ data }: { data: IPostData }): JSX.Element {
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

const format_path = (p: any): string => {
	return `${conf.apiuri}/s/img/${p.path}/${p.id}-${p.filename}`;
};

export default withRouter(Post);
