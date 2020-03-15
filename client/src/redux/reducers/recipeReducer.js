import {
	GET_CATEGORIES,
	GET_CATEGORY,
	GET_RECIPE,
	ADD_SUCCESS,
	DESTROY_RECIPE,
	ADD_FAIL
} from "../actions/types";
const initialState = {
	categories: [],
	meals: [],
	recipe: "",
	loading: true
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
			return { ...state, recipe: payload, loading: false };
		case DESTROY_RECIPE:
			return { ...state, recipe: "", loading: false };
		case ADD_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};
