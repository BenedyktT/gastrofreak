import { GET_CATEGORIES } from "./types";
import axios from "axios";

export const getCategories = () => async dispatch => {
  const res = await axios.get("/categories");
  dispatch({
    type: GET_CATEGORIES,
    payload: res.data
  });
};
