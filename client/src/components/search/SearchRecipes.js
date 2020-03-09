import React, { useState } from "react";

const SearchRecipes = ({ title }) => {
	const [value, setValue] = useState("");
	const onChange = e => {
		setValue(e.target.value);
	};
	return (
		<div className="searchbar">
			<label htmlFor="searchbar">
				<h1 className="text-big">{title}</h1>
			</label>

			<input
				type="text"
				onChange={onChange}
				value={value}
				name="searchbar"
				placeholder="Search for something to cook"
			/>
		</div>
	);
};

export default SearchRecipes;
