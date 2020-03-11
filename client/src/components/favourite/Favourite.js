import React from "react";
import SearchRecipes from "../search/SearchRecipes";
import FavouriteList from "./FavouriteList";
import { getFavourite } from "../../redux/actions/favouriteActions";
import { connect } from "react-redux";
const Favourite = ({ history, getFavourite, favourite }) => {
	return (
		<div>
			<SearchRecipes title={"Search for your favourite recipe: "} />
			<FavouriteList
				history={history}
				getRecipeList={getFavourite}
				recipes={favourite}
				idType="recipeId"
			/>
		</div>
	);
};

export default connect(
	state => ({ favourite: state.favouriteReducer.favourite }),
	{ getFavourite }
)(Favourite);
