import {
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_RECIPE,
  ADD_SUCCESS,
  DESTROY_RECIPE,
  ADD_FAIL,
  ADD_START,
  UPDATE_START,
  UPDATE_FAIL,
  UPDATE_SUCCESS
} from "../actions/types";
const initialState = {
  categories: [],
  meals: [],
  recipe: "",
  loading: true,
  editRecipe: ""
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORIES:
      const { categories } = payload;
      return { ...state, categories };
    case GET_CATEGORY:
      return { ...state, meals: [...payload] };
    case GET_RECIPE:
      const { title, ingr, prep } = payload;
      return { ...state, recipe: payload, editRecipe: { title, ingr, prep } };
    case ADD_SUCCESS:
    case UPDATE_SUCCESS:
      return { ...state, recipe: payload, loading: false };
    case DESTROY_RECIPE:
      return { ...state, recipe: "", loading: false };
    case ADD_FAIL:
    case UPDATE_FAIL:
      return { ...state, loading: false };
    case ADD_START:
    case UPDATE_START:
      return { ...state, loading: true };
    default:
      return state;
  }
};
