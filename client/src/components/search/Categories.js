import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/recipeActions";
import Category from "./Category";

const Categories = ({ getCategories, categories }) => {
  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, [categories, getCategories]);
  return (
    <div className="category-wrapper">
      <h3 className="text-big">Or pick category:</h3>
      <ul className="categories__grid">
        {categories.map(({ strCategory, strCategoryThumb, idCategory }) => (
          <Category
            key={idCategory}
            className="categories_item"
            thumb={strCategoryThumb}
            title={strCategory}
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(
  state => ({ categories: state.recipeReducer.categories }),
  { getCategories }
)(Categories);
