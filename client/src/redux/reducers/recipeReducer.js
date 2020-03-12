import {
	GET_CATEGORIES,
	GET_CATEGORY,
	GET_RECIPE,
	ADD_SUCCESS,
	DESTROY_RECIPE
} from "../actions/types";
const initialState = {
	categories: [],
	meals: [],
	recipe: ""
};
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_CATEGORIES:
			const { categories } = payload;
			return { ...state, categories };
		case GET_CATEGORY:
			return { ...state, meals: [...payload] };
		case GET_RECIPE:
			return { ...state, recipe: payload };
		case ADD_SUCCESS:
			return { ...state, recipe: payload };
		case DESTROY_RECIPE:
			return { ...state, recipe: "" };
		default:
			return state;
	}
};
