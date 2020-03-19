import {
	GET_CATEGORIES,
	GET_CATEGORY,
	GET_RECIPE,
	ADD_SUCCESS,
	DESTROY_RECIPE,
	ADD_FAIL,
	ADD_START,
	ENTER_EDIT_MODE,
	EXIT_EDIT_MODE
} from "../actions/types";
const initialState = {
	categories: [],
	meals: [],
	recipe: "",
	loading: true,
	isEditMode: false
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
		case ADD_START:
			return { ...state, loading: true };
		case ENTER_EDIT_MODE:
			return { ...state, isEditMode: payload };
		case EXIT_EDIT_MODE:
			return { ...state, isEditMode: false };
		default:
			return state;
	}
};
