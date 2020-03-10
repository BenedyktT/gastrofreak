import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddFavourite from "../favourite/AddFavourite";
import { connect } from "react-redux";
import { getFavourite } from "../../redux/actions/favouriteActions";

const CategoryListItem = ({
	thumb,
	title,
	id,
	favourite,
	getFavourite,
	loading,
	isAuthenticated
}) => {
	const [isFavourite, setisFavourite] = useState(false);
	let thumbSource = null;
	useEffect(() => {
		if (!loading) {
			const find = favourite.find(e => e.recipeId === parseInt(id))
				? true
				: false;

			setisFavourite(find);
		}
	}, [loading, favourite]);
	if (thumb) {
		{
			thumbSource = { backgroundImage: `url(${thumb})` };
		}
	}
	return (
		<li className="item-container">
			<Link className="category__item" to={`/meal/${id}`}>
				<div className="category__item-bg" style={thumbSource}></div>
				<div className="category__item-overlay"></div>
				<h3 className="category__item-title">{title}</h3>
			</Link>
			{isAuthenticated && <AddFavourite id={id} isFavourite={isFavourite} />}
		</li>
	);
};

export default connect(
	state => ({
		favourite: state.favouriteReducer.favourite,
		loading: state.favouriteReducer.loading,
		isAuthenticated: state.authReducer.isAuthenticated
	}),
	{ getFavourite }
)(CategoryListItem);
