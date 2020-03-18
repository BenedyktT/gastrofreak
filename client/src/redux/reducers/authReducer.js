import {
	LOGIN_USER,
	USER_LOADED,
	LOGOUT_USER,
	REGISTER_USER,
	REGISTER_USER_FAIL,
	REGISTER_USER_SUCCESS
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	loading: true,
	user: null,
	isRegistered: null
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_USER:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				isAuthenticated: true,
				loading: false
			};
		case USER_LOADED:
			return {
				...state,
				user: payload,
				isAuthenticated: true,
				loading: false
			};
		case LOGOUT_USER:
			localStorage.removeItem("token");
			return {
				...state,
				user: null,
				isAuthenticated: false,
				loading: false,
				token: null,
				isRegistered: null
			};
		case REGISTER_USER || REGISTER_USER_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				isRegistered: true,
				loading: false
			};
		case REGISTER_USER_FAIL:
			return { ...state, isRegistered: false, loading: false };

		default:
			return state;
	}
};
