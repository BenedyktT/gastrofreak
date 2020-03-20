import NutritionTable from "../recipes/NutritionTable";
import { previewRecipe } from "../../redux/actions/recipeActions";
import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import Loader from "../layouts/Loader";
import { setAlert } from "../../redux/actions/alerts";

const PreviewRecipe = ({
  previewRecipe,
  recipe,
  history,
  loading,
  setAlert
}) => {
  const [value, setValue] = useState({
    title: "placeholderTitle",
    prep: "placeholderSteps",
    ingr: ""
  });
  const [portion, setPortion] = useState(300);
  const [isSubmit, setSubmit] = useState(false);
  const { ingr } = value;
  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    const recipe = {
      ...value,
      ingr: value.ingr
        .replace(/\r?\n|\r/g, " ")
        .trim()
        .toLowerCase()
        .split(",")
    };
    if (!ingr) {
      setAlert("Recipy required", "danger");
      return;
    }
    setSubmit(true);
    previewRecipe(recipe);
  };

  return (
    <Fragment>
      {isSubmit && loading && <Loader />}
      <div className="container">
        <h1>Calculate nutritions</h1>
        <div className="preview-grid">
          <div className="grid-left">
            <form className="add-recipe" onSubmit={onSubmit}>
              <div className="add-recipe-input">
                <textarea
                  name="ingr"
                  type="text"
                  value={ingr}
                  onChange={onChange}
                  placeholder="Please provide comma separated ingredients list (ex: 50g ham, 125g onions, 1kg lamb etc...)"
                />
              </div>

              <div className="add-recipe-submit">
                <input
                  className="btn"
                  type="submit"
                  value="Calculate Nutritions"
                />
              </div>
            </form>
          </div>
          <div className="grid-right">
            {recipe ? (
              <div className="">
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
                <NutritionTable
                  nutrients={recipe.nutrients}
                  portion={portion}
                  totalWeight={recipe.totalWeight}
                />
              </div>
            ) : (
              <h1>Enter recipy and click </h1>
            )}
            {loading && <Loader className="inline" />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(
  state => ({
    recipe: state.recipeReducer.recipe,
    loading: state.recipeReducer.loading
  }),
  {
    previewRecipe,
    setAlert
  }
)(PreviewRecipe);
