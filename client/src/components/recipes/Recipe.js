import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NutritionTable from "./NutritionTable";
import {
  getRecipe,
  destroyRecipe,
  getUserRecipe
} from "../../redux/actions/recipeActions";
import GoBack from "../layouts/GoBack";
import { Link } from "react-router-dom";
import moduleName from "module";
import Loader from "../layouts/Loader";
import { ReactComponent as Edit } from "../../assets/edit.svg";

const Recipe = ({
  getRecipe,
  recipe,
  match,
  history,
  destroyRecipe,
  getUserRecipe
}) => {
  useEffect(() => {}, []);
  useEffect(() => {
    const isExternalRecipe = history.location.pathname.includes("meal");
    if (isExternalRecipe) {
      getRecipe(match.params.id);
    } else {
      getUserRecipe(match.params.id);
    }
    return () => {
      destroyRecipe();
    };
  }, []);
  const [portion, setPortion] = useState(300);
  const render = () => {
    const {
      prep,
      title,
      ingr,
      calories,
      totalWeight,
      healthLabels,
      nutrients
    } = recipe;

    return (
      <div className="recipe">
        <GoBack history={history} />
        <div className=" recipe__element recipe__title">
          <h1>{title}</h1> <Edit className="edit-svg" />
        </div>
        <div className="recipe__health-labels">
          <h3>Health labels:</h3>
          <p className="recipe__health-labels-elements">
            {healthLabels.map(e => `${e.toLowerCase().replace(/_+/g, " ")},`)}
          </p>
        </div>
        <div className="recipe__nutrition-summary">
          <span>
            <label htmlFor="portion">Portion:</label>
            <input
              style={{ width: "100px" }}
              name="portion"
              type="number"
              value={portion}
              onChange={e => setPortion(e.target.value)}
            />
            g
          </span>
          <span>Total weight: {parseInt(totalWeight)}g</span>
          <span>Kcal: {calories}</span>
        </div>
        <div className="recipe__nutrition-details">
          <NutritionTable
            nutrients={nutrients}
            portion={portion}
            totalWeight={totalWeight}
          />
        </div>
        <div className="recipe__element recipe__prep">
          <h3>Prep:</h3>
          <p>{prep}</p>
          <Edit className="edit-svg" />
        </div>
        <div className="recipe__element recipe__ingredients">
          <ul className="ingredient__elements">
            {ingr.map(e => (
              <li key={Math.random()} className="ingredient__element">
                {e}
              </li>
            ))}
          </ul>
          <Edit className="edit-svg" />
        </div>
      </div>
    );
  };
  return recipe ? (
    render()
  ) : (
    <div className="">
      <Loader />
    </div>
  );
};

export default connect(
  state => ({
    recipe: state.recipeReducer.recipe
  }),
  {
    getRecipe,
    destroyRecipe,
    getUserRecipe
  }
)(Recipe);
