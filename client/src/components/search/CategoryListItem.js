import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddFavourite from "../favourite/AddFavourite";
import { connect } from "react-redux";
import { getFavourite } from "../../redux/actions/favouriteActions";

const CategoryListItem = ({
	thumb,
	title,
	id,
	idType,
	mealsList,
	loading,
	isAuthenticated
}) => {
	const [isFavourite, setisFavourite] = useState(false);
	let thumbSource = null;
	useEffect(() => {
		if (!loading) {
			const find = mealsList.find(e => parseInt(e[idType]) === parseInt(id))
				? true
				: false;
			setisFavourite(find);
		}
	}, [loading, mealsList]);
	if (thumb) {
		{
			thumbSource = { backgroundImage: `url(${thumb})` };
		}
	}
	return (
		<li className="item-container">
			<Link
				className="category__item"
				to={idType === "recipeId" ? `/meal/${id}` : `/myRecipe/${id}`}
			>
				<div className="category__item-bg" style={thumbSource}></div>
				<div className="category__item-overlay"></div>
				<h3 className="category__item-title">{title}</h3>
			</Link>
			{isAuthenticated && (
				<AddFavourite idType={idType} id={id} isFavourite={isFavourite} />
			)}
		</li>
	);
};

export default connect(
	state => ({
		loading: state.favouriteReducer.loading,
		isAuthenticated: state.authReducer.isAuthenticated
	}),
	{ getFavourite }
)(CategoryListItem);
