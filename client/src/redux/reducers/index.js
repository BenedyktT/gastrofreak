import { combineReducers } from "redux";
import recipeReducer from "./recipeReducer";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import favouriteReducer from "./favouriteReducer";

export default combineReducers({
	recipeReducer,
	alertReducer,
	authReducer,
	favouriteReducer
});
