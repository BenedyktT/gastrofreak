import { GET_CATEGORIES, GET_CATEGORY, GET_RECIPE } from "./types";
import axios from "axios";

export const getCategories = () => async dispatch => {
	const res = await axios.get("/categories");
	dispatch({
		type: GET_CATEGORIES,
		payload: res.data
	});
};

export const getCategory = category => async dispatch => {
	const res = await axios.get(`/categories/${category}`);
	dispatch({
		type: GET_CATEGORY,
		payload: res.data.meals
	});
};

export const getRecipe = id => async dispatch => {
	try {
		const res = await axios.get(`/recipes/${id}`);
		dispatch({
			type: GET_RECIPE,
			payload: res.data
		});
	} catch (error) {}
};
