import React, { FormEvent, ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";

function SideBar(props: any): JSX.Element {
	return (
		<aside>
			<h2>Search</h2>
			<SearchBar />
			{props.children}
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

export default SideBar;
export { SearchBar };
