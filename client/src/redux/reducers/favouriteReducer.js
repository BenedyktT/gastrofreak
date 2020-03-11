import { GET_FAVOURITE, GET_USER_RECIPES } from "../actions/types";

const initialState = {
	favourite: [],
	loading: true,
	myRecipes: []
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_FAVOURITE:
			return { ...state, favourite: payload, loading: false };
		case GET_USER_RECIPES:
			return { ...state, myRecipes: payload, loading: false };
		default:
			return state;
	}
};
