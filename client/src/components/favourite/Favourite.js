import React from "react";
import SearchRecipes from "../search/SearchRecipes";
import CategoryList from "../search/CategoryList";

const Favourite = () => {
	return (
		<div>
			<SearchRecipes title={"Search for your favourite recipe: "} />
			<CategoryList />
		</div>
	);
};

export default Favourite;
