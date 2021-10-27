import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { IPost } from "watame";

import ClientContext from "../client";
import SideBar from "../components/sidebar";
import conf, { useEffectDeep } from "../util";

function Browse(props: any): JSX.Element {
	let [posts, setPosts] = useState<IPost[]>([]);
	const client = ClientContext();

	// Get our post tags from prop
	const tags = JSON.parse(
		new URLSearchParams(props.location.search).get("t") ?? "[]"
	) as string[];

	useEffectDeep(() => {
		if (client === undefined) return;
		const fetchPosts = async () => setPosts(await client.searchPosts(tags));
		fetchPosts();
	}, [client, tags]);

	let sidebar, view;
	if (posts !== undefined) {
		sidebar = <SideBar />;
		view = <ImageGrid posts={posts} />;
	} else {
		sidebar = <SideBar />;
		view = null;
	}

	return (
		<div className="main">
			{sidebar}
			{view}
		</div>
	);
}

function ImageGrid({ posts }: { posts: IPost[] }): JSX.Element {
	return (
		<div className="grid">
			{posts.map((post) => (
				<GridPost key={post.id} post={post} />
			))}
		</div>
	);
}

function GridPost({ post }: { post: IPost }): JSX.Element {
	return (
		<div className="grid-thumbnail">
			<a href={`/post/${post.id}`}>
				<img
					src={format_path(post)}
					width="250"
					alt={`post.${post.id}`}
				/>
			</a>
		</div>
	);
}

const format_path = (p: IPost): string => {
	return `${conf.apiuri}/s/tmb/${p.path}/${p.id}.jpg`;
};

export default withRouter(Browse);
