import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setAlert } from "../../redux/actions/alerts";
import {
	getFavourite,
	getMyRecipes
} from "../../redux/actions/favouriteActions";

const AddFavourite = ({
	id,
	isFavourite,
	idType,
	setAlert,
	getFavourite,
	getMyRecipes
}) => {
	const addFavourite = async id => {
		try {
			await axios.post(`/favourite/${id}`);

			getFavourite();
			setAlert("Successfully added to favourites", "success");
		} catch (error) {
			setAlert("Couldn't add to favourite, please try refresh page");
		}
	};
	const removeFavourite = async id => {
		console.log(idType);
		try {
			if (idType === "_id") {
				await axios.delete(`/recipes/${id}`);
				getMyRecipes();
				setAlert("Successfully deleted from my Recipes", "success");
			}
			if (idType === "recipeId") {
				await axios.delete(`/favourite/${id}`);
				getFavourite();
				setAlert("Successfully deleted from favourites", "success");
				return;
			}
		} catch (error) {
			setAlert("Couldn't delete, please try refresh page");
		}
	};

	return (
		<div className="category__item-button">
			{isFavourite ? (
				<button onClick={() => removeFavourite(id)}>-</button>
			) : (
				<button onClick={() => addFavourite(id)}>+</button>
			)}
		</div>
	);
};

export default connect(
	state => ({
		favourite: state.favouriteReducer.favourite
	}),
	{ setAlert, getFavourite, getMyRecipes }
)(AddFavourite);
