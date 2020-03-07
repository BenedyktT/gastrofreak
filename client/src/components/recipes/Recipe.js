import React from "react";
import { connect } from "react-redux";
import NutritionTable from "./NutritionTable";
const Recipe = () => {
  return (
    <div className="recipe">
      <div className="recipe__title">Spaghetti Arrabiata</div>
      <div className="recipe__health-labels">
        <h3>Health labels:</h3>
        <p className="recipe__health-labels-elements">
          Vegetarian, Sugar Conscious, Peanut Free, Alcohol Free, High Carbs
        </p>
      </div>
      <div className="recipe__nutrition-summary">
        <span>Serving: 4</span>
        <span>Kcal per serving: 1200</span>
      </div>
      <div className="recipe__nutrition-details">
        <NutritionTable />
      </div>
      <div className="recipe__prep">
        <h3>Prep:</h3>
        <p>
          Bring a large pot of water to a boil. Add kosher salt to the boiling
          water, then add the pasta. Cook according to the package instructions,
          about 9 minutes a large skillet over medium-high heat, add the olive
          oil and heat until the oil starts to shimmer. Add the garlic and cook,
          stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes,
          red chile flakes, Italian seasoning and salt and pepper to taste.
          Bring to a boil and cook for 5 minutes.
        </p>
      </div>
      <div className="recipe__ingredients">
        <ul className="ingredient__elements">
          <li className="ingredient__element">300g Spaghetti</li>
          <li className="ingredient__element">1,4 tsp olive oil</li>
          <li className="ingredient__element">1 tin red chilli peppers</li>
          <li className="ingredient__element">200g chopped tomatoes</li>
        </ul>
      </div>
    </div>
  );
};

export default connect()(Recipe);
