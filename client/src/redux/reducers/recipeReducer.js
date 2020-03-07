import { GET_CATEGORIES } from "../actions/types";
const initialState = {
  categories: []
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORIES:
      const { categories } = payload;
      return { ...state, categories };

    default:
      return state;
  }
};
