import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/recipeActions";

const Categories = ({ getCategories, categories }) => {
  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, []);
  return (
    <div className="category">
      <h3 className="text-big">Or pick category:</h3>
      <div className="category__grid"></div>
    </div>
  );
};

export default connect(
  state => ({ categories: state.recipeReducer.categories }),
  { getCategories }
)(Categories);
