import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setAlert } from "../../redux/actions/alerts";
import { getFavourite } from "../../redux/actions/favouriteActions";

const AddFavourite = ({
	id,
	isFavourite,
	favourite,
	setAlert,
	getFavourite
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
		try {
			await axios.delete(`/favourite/${id}`);
			getFavourite();
			setAlert("Successfully deleted from favourites", "success");
		} catch (error) {
			setAlert("Couldn't add to favourite, please try refresh page");
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
	{ setAlert, getFavourite }
)(AddFavourite);
