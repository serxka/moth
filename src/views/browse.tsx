import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { IPost } from "watame";

import ClientContext from "../client";
import SideBar from "../components/sidebar";
import { useEffectDeep } from "../util";

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
		sidebar = <SideBar tags={tags} />;
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
	const client = ClientContext();
	return (
		<div className="grid-thumbnail">
			<Link to={`/post/${post.id}`}>
				<img
					src={client.getThumbnailPath(post)}
					width="250"
					alt={`post.${post.id}`}
				/>
			</Link>
		</div>
	);
}

export default withRouter(Browse);
