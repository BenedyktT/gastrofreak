import { GET_FAVOURITE } from "../actions/types";

const initialState = {
	favourite: [],
	loading: true
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_FAVOURITE:
			return { ...state, favourite: payload, loading: false };

		default:
			return state;
	}
};
