import React from "react";
import SearchRecipes from "./SearchRecipes";
import Categories from "./Categories";

const Search = () => {
  return (
    <div className="margin-top">
      <SearchRecipes />
      <Categories />
    </div>
  );
};

export default Search;
