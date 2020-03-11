import { GET_FAVOURITE, GET_USER_RECIPES } from "./types";
import axios from "axios";
import { setAlert } from "./alerts";

export const getFavourite = () => async dispatch => {
	try {
		const res = await axios.get("/favourite");
		dispatch({ type: GET_FAVOURITE, payload: res.data });
	} catch (error) {
		setAlert("Couldn't fetch favourites, try refresh", "danger");
	}
};

export const getMyRecipes = () => async dispatch => {
	try {
		const res = await axios.get("/userRecipes");
		dispatch({ type: GET_USER_RECIPES, payload: res.data });
	} catch (error) {
		setAlert("Couldn't fetch recipes, try refresh", "danger");
	}
};
