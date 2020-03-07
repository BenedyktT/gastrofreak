import { GET_CATEGORIES, GET_CATEGORY } from "../actions/types";
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

    default:
      return state;
  }
};
