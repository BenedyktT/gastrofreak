import React, { useEffect } from "react";
import { connect } from "react-redux";
/* import { getCategory } from "../../redux/actions/recipeActions"; */
/* import CategoryListItem from "./CategoryListItem"; */
import GoBack from "../layouts/GoBack";

import CategoryListItem from "../search/CategoryListItem";

const FavouriteList = ({ history, getRecipeList, recipes, idType }) => {
  useEffect(() => {
    getRecipeList();
  }, [getRecipeList]);
  return (
    <div className="category-wrapper">
      <GoBack history={history} />
      <ul className="meals__grid">
        {recipes.length ? (
          recipes.map(({ title, titleThumb, recipeId, _id }) => (
            <CategoryListItem
              key={_id}
              className="categories_item"
              thumb={titleThumb}
              title={title}
              id={recipeId ? recipeId : _id}
              idType={idType}
              recipeId={recipeId}
              mealsList={recipes}
            />
          ))
        ) : (
          <div>Nothing here...</div>
        )}
      </ul>
    </div>
  );
};

export default connect(state => ({
  favourite: state.favouriteReducer.favourite
}))(FavouriteList);
