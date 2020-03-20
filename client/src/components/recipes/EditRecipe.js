import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { addRecipe, updRecipe } from "../../redux/actions/recipeActions";
import Loader from "../layouts/Loader";
import { setAlert } from "../../redux/actions/alerts";

const EditRecipe = ({
  addRecipe,
  editRecipe,
  history,
  loading,
  match,
  updRecipe,
  recipe
}) => {
  const { title, prep, ingr } = editRecipe;
  const { external, id } = match.params;
  const [value, setValue] = useState({ title, prep, ingr: ingr.join(",") });
  const [isSubmit, setSubmit] = useState(false);
  const isExternal = external === "true" ? true : false;
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

    if (isExternal) {
      try {
        addRecipe(recipe);
        setSubmit(true);

        return;
      } catch (error) {
        setSubmit(false);
        setAlert("Error, try again", "danger");
      }
    }
    try {
      updRecipe(id, recipe);
      setSubmit(true);
      return;
    } catch (error) {
      setSubmit(false);
      setAlert("Error, try again", "danger");
    }
  };
  useEffect(() => {
    if (isSubmit && !loading && recipe) {
      history.push("/myRecipes");
    }
  }, [loading, recipe, isSubmit]);
  return (
    <Fragment>
      {isSubmit && loading && <Loader />}
      <div className="container">
        <h1>Add your own Recipe</h1>

        <div className="add-container">
          <form className="add-recipe" onSubmit={onSubmit}>
            <div className="form__element">
              {" "}
              <label htmlFor="title">Title: </label>
              <input
                name="title"
                type="text"
                value={value.title}
                onChange={onChange}
                placeholder="Title"
              />
            </div>
            <div className="form__element form__element--textarea">
              <label htmlFor="prep">Preparation: </label>
              <textarea
                name="prep"
                type="text"
                value={value.prep}
                onChange={onChange}
                placeholder="Please provide preparations step"
              />
            </div>
            <div className="form__element form__element--textarea">
              <label htmlFor="ingr">Ingredienties: </label>
              <textarea
                name="ingr"
                type="text"
                value={value.ingr}
                onChange={onChange}
                placeholder="Please provide comma separated ingredients list (ex: 50g ham, 125g onions, 1kg lamb etc...)"
              />
            </div>
            <div className="form__element form__element--submit">
              <div className=""></div>
              <input type="submit" value="submit" />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(
  state => ({
    editRecipe: state.recipeReducer.editRecipe,
    loading: state.recipeReducer.loading,
    recipe: state.recipeReducer.recipe
  }),
  {
    addRecipe,
    updRecipe
  }
)(EditRecipe);
