import { LOGIN_USER, USER_LOADED, LOGOUT_USER, REGISTER_USER } from "./types";
import axios from "axios";
import setAuthToken from "../../setAuthToken";
import { setAlert } from "./alerts";

axios.defaults.headers.common["Content-Type"] = "application/json";
export const registerUser = data => async dispatch => {
	try {
		await axios.post("/user", data);
		dispatch({ type: REGISTER_USER });
		dispatch(setAlert("User Created", "success"));
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors && errors.length) {
			errors.forEach(e => dispatch(setAlert(e.msg, "danger")));
		}

		console.error(errors);
	}
};
export const loginUser = (email, password) => async dispatch => {
	try {
		const res = await axios.post("/auth", { email, password });
		dispatch({
			type: LOGIN_USER,
			payload: res.data
		});
		dispatch(setAlert("Success", "success"));
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors && errors.length) {
			errors.forEach(e => dispatch(setAlert(e.msg, "danger")));
		}

		console.log(errors);
	}
};

export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get("/auth");
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		const errors = error.response;
		if (errors && errors.data.errors && errors.length) {
			errors.data.errors.forEach(e => dispatch(setAlert(e.msg, "danger")));
		}
	}
};

export const logout = () => dispatch => {
	dispatch({ type: LOGOUT_USER });
};
