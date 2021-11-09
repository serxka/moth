import React, { FormEvent, ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";

function SideBar(props: any): JSX.Element {
	return (
		<aside>
			<h2>Search</h2>
			<SearchBar />
			{props.children}
			{props.tags === undefined || <TagList tags={props.tags} />}
		</aside>
	);
}

function SearchBar(): JSX.Element {
	let [value, setValue] = useState("");
	let history = useHistory();

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value);
	}

	function handleSubmit(event: FormEvent) {
		let tags = JSON.stringify(value.split(","));
		history.push(`/browse?l=30&p=0&s=dd&t=${encodeURIComponent(tags)}`);
		event.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				onChange={handleChange}
				type="input"
				placeholder="search for images!"
			/>
			<button>Go</button>
		</form>
	);
}

function TagList(props: { tags: string[] }) {
	let tags = props.tags.filter((e) => e.trim() !== "");
	if (tags.length === 0) return <></>;
	return (
		<>
			<h3>Tags</h3>
			<ul className="post-tags">
				{tags.map((tag, idx) => (
					<span key={idx} className="post-tag">
						{tag}
					</span>
				))}
			</ul>
		</>
	);
}

export default SideBar;
export { SearchBar, TagList };
