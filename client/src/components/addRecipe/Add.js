import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { addRecipe } from "../../redux/actions/recipeActions";
import Loader from "../layouts/Loader";

const Add = ({ addRecipe, recipe, history, loading }) => {
	const [value, setValue] = useState({ title: "", prep: "", ingr: "" });
	const [isSubmit, setSubmit] = useState(false);
	const { title, prep, ingr } = value;
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
		setSubmit(true);
		addRecipe(recipe);
	};
	useEffect(() => {
		if (recipe && isSubmit) {
			history.push(`/myrecipe/`);
		}
	}, [recipe, loading]);
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
								value={title}
								onChange={onChange}
								placeholder="Title"
							/>
						</div>
						<div className="form__element form__element--textarea">
							<label htmlFor="prep">Preparation: </label>
							<textarea
								name="prep"
								type="text"
								value={prep}
								onChange={onChange}
								placeholder="Please provide preparations step"
							/>
						</div>
						<div className="form__element form__element--textarea">
							<label htmlFor="ingr">Ingredienties: </label>
							<textarea
								name="ingr"
								type="text"
								value={ingr}
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
		recipe: state.recipeReducer.recipe,
		loading: state.recipeReducer.loading
	}),
	{
		addRecipe
	}
)(Add);
