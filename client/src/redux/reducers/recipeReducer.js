import { GET_CATEGORIES, GET_CATEGORY, GET_RECIPE } from "../actions/types";
const initialState = {
	categories: [],
	meals: []
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

		default:
			return state;
	}
};
