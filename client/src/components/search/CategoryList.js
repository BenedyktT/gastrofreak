import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCategory } from "../../redux/actions/recipeActions";
import CategoryListItem from "./CategoryListItem";
import GoBack from "../layouts/GoBack";
import { getFavourite } from "../../redux/actions/favouriteActions";

const CategoryList = ({
	getCategory,
	meals,
	match,
	history,
	favourite,
	getFavourite
}) => {
	const { category } = match.params;
	useEffect(() => {
		getCategory(category);
		getFavourite();
	}, []);

	return (
		<div className="category-wrapper">
			<GoBack history={history} />
			<ul className="meals__grid">
				{meals.length &&
					meals.map(({ strMeal, strMealThumb, idMeal }) => (
						<CategoryListItem
							key={idMeal}
							className="categories_item"
							thumb={strMealThumb}
							title={strMeal}
							id={idMeal}
							idType={"recipeId"}
							mealsList={favourite}
						/>
					))}
			</ul>
		</div>
	);
};

export default connect(
	state => ({
		meals: state.recipeReducer.meals,
		favourite: state.favouriteReducer.favourite
	}),
	{
		getCategory,
		getFavourite
	}
)(CategoryList);
