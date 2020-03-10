import React, { useEffect } from "react";
import { connect } from "react-redux";
/* import { getCategory } from "../../redux/actions/recipeActions"; */
/* import CategoryListItem from "./CategoryListItem"; */
import GoBack from "../layouts/GoBack";
import { getFavourite } from "../../redux/actions/favouriteActions";
import FavouriteListItem from "../search/CategoryListItem";

const FavouriteList = ({ history, getFavourite, favourite }) => {
	useEffect(() => {
		getFavourite();
	}, []);
	return (
		<div className="category-wrapper">
			<GoBack history={history} />
			<ul className="meals__grid">
				{favourite.length &&
					favourite.map(({ title, titleThumb, recipeId }) => (
						<FavouriteListItem
							key={recipeId}
							className="categories_item"
							thumb={titleThumb}
							title={title}
							id={recipeId}
							isFavourite={true}
						/>
					))}
			</ul>
		</div>
	);
};

export default connect(
	state => ({ favourite: state.favouriteReducer.favourite }),
	{ getFavourite }
)(FavouriteList);
