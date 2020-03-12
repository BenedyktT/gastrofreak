import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import NutritionTable from "./NutritionTable";
import {
  getRecipe,
  destroyRecipe,
  getUserRecipe
} from "../../redux/actions/recipeActions";
import GoBack from "../layouts/GoBack";
import { Link } from "react-router-dom";

const EditRecipe = ({
  getRecipe,
  recipe,
  match,
  history,
  destroyRecipe,
  getUserRecipe
}) => {
  const {
    prep,
    title,
    ingr,
    calories,
    totalWeight,
    healthLabels,
    nutrients
  } = recipe;
  const [ingredients, setingredients] = useState(ingr);
  const [portion, setPortion] = useState(300);
  const initialValue = {
    title: false,
    prep: false,
    ingr: false
  };
  const [isEditMode, setEditMode] = useState(initialValue);
  const [isFinishEditing, setFinishEditing] = useState(initialValue);
  const [recipeValue, setrecipeValue] = useState({ title, prep, ingr });

  const onChange = e => {
    setrecipeValue({ ...recipeValue, [e.target.name]: e.target.value });

    if (isFinishEditing) {
      setFinishEditing(false);
    }
  };
  const submitChanges = e => {
    const name = e.target.name.split("_")[1];
    if (recipe[name] === recipeValue[name]) {
      setFinishEditing({ ...isFinishEditing, [name]: true });
      setEditMode(initialValue);
      setFinishEditing({ ...isFinishEditing, [name]: false });
      return;
    }
    if (name === "ingr") {
      setingredients(recipeValue.ingr.split(","));
    }

    setFinishEditing({ ...isFinishEditing, [name]: true });
    setEditMode(initialValue);
    setFinishEditing({ ...isFinishEditing, [name]: false });
  };
  const render = () => {
    return (
      <div className="recipe">
        <GoBack history={history} />

        <div className="recipe__title">
          {!isEditMode.title && (
            <button onClick={() => setEditMode({ ...isEditMode, title: true })}>
              Edit
            </button>
          )}
          {isEditMode.title && !isFinishEditing.title ? (
            <Fragment>
              <input
                className="edit-input title-edit"
                name="title"
                value={recipeValue.title}
                onChange={onChange}
              ></input>
              {
                <input
                  type="submit"
                  name="edit_title"
                  onClick={submitChanges}
                  value="submit changes"
                />
              }
            </Fragment>
          ) : (
            <div className="recipe__title">{recipeValue.title}</div>
          )}
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
        <div className="recipe__prep">
          <h3>Prep:</h3>
          {!isEditMode.prep && (
            <button onClick={() => setEditMode({ ...isEditMode, prep: true })}>
              Edit
            </button>
          )}
          {isEditMode.prep && !isFinishEditing.prep ? (
            <Fragment>
              <textarea
                className="edit-input prep-edit"
                name="prep"
                value={recipeValue.prep}
                onChange={onChange}
              ></textarea>
              {
                <input
                  type="submit"
                  name="edit_prep"
                  onClick={submitChanges}
                  value="submit changes"
                />
              }
            </Fragment>
          ) : (
            <p>{recipeValue.prep}</p>
          )}
        </div>
        <div className="recipe__ingredients">
          {!isEditMode.ingr && (
            <button onClick={() => setEditMode({ ...isEditMode, ingr: true })}>
              Edit
            </button>
          )}
          {isEditMode.ingr && !isFinishEditing.ingr ? (
            <Fragment>
              <textarea
                className="edit-input ingr-edit"
                name="ingr"
                value={recipeValue.ingr}
                onChange={onChange}
              ></textarea>
              <input
                type="submit"
                name="edit_ingr"
                onClick={submitChanges}
                value="submit changes"
              />
            </Fragment>
          ) : (
            <ul className="ingredient__elements">
              {ingredients.map(e => (
                <li key={Math.random()} className="ingredient__element">
                  {e}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
  return recipe ? render() : <div className="">Loading...</div>;
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
)(EditRecipe);
