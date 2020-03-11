import React from "react";
import SearchRecipes from "../search/SearchRecipes";
import FavouriteList from "../favourite/FavouriteList";
import { connect } from "react-redux";
import { getMyRecipes } from "../../redux/actions/favouriteActions";

const MyRecipes = ({ history, getMyRecipes, myRecipes }) => {
	return (
		<div>
			<SearchRecipes title={"Your own recipes: "} />
			<FavouriteList
				history={history}
				getRecipeList={getMyRecipes}
				recipes={myRecipes}
				idType="_id"
			/>
		</div>
	);
};

export default connect(
	state => ({ myRecipes: state.favouriteReducer.myRecipes }),
	{ getMyRecipes }
)(MyRecipes);
