import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCategory } from "../../redux/actions/recipeActions";
import CategoryListItem from "./CategoryListItem";

const CategoryList = ({ getCategory, meals, match }) => {
  const { category } = match.params;
  useEffect(() => {
    getCategory(category);
  }, []);

  return (
    <div className="category-wrapper">
      <ul className="meals__grid">
        {meals.length &&
          meals.map(({ strMeal, strMealThumb, idMeal }) => (
            <CategoryListItem
              key={idMeal}
              className="categories_item"
              thumb={strMealThumb}
              title={strMeal}
              id={idMeal}
            />
          ))}
      </ul>
    </div>
  );
};

export default connect(state => ({ meals: state.recipeReducer.meals }), {
  getCategory
})(CategoryList);
