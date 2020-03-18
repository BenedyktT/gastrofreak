import {
	GET_CATEGORIES,
	GET_CATEGORY,
	GET_RECIPE,
	ADD_SUCCESS,
	DESTROY_RECIPE,
	ADD_FAIL,
	ADD_START
} from "./types";
import { setAlert } from "./alerts";
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
	} catch (error) {
		console.log(error);
	}
};
export const getUserRecipe = id => async dispatch => {
	try {
		const res = await axios.get(`/userRecipes/${id}`);
		dispatch({
			type: GET_RECIPE,
			payload: res.data
		});
	} catch (error) {
		console.log(error);
	}
};

export const addRecipe = recipe => async dispatch => {
	try {
		const res = await axios.post("/recipes", recipe);
		dispatch({ type: ADD_SUCCESS, payload: res.data });
		dispatch(setAlert("Successfully added", "success"));
	} catch (error) {
		console.error(error);
		dispatch({ type: ADD_FAIL });
		dispatch(setAlert("Something went wrong"), "danger");
	}
};

export const destroyRecipe = () => dispatch => {
	dispatch({ type: DESTROY_RECIPE });
};

export const previewRecipe = data => async dispatch => {
	dispatch({ type: ADD_START });
	try {
		const res = await axios.post("/recipes/preview", data);
		dispatch({ type: ADD_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch(setAlert("Please include valid recipy", "danger"));
		dispatch({ type: ADD_FAIL });
	}
};
