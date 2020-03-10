import React from "react";
import SearchRecipes from "../search/SearchRecipes";
import FavouriteList from "./FavouriteList";

const Favourite = ({ history }) => {
	return (
		<div>
			<SearchRecipes title={"Search for your favourite recipe: "} />
			<FavouriteList history={history} />
		</div>
	);
};

export default Favourite;
