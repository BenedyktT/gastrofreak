import NutritionTable from "../recipes/NutritionTable";
import { previewRecipe } from "../../redux/actions/recipeActions";
import GoBack from "../layouts/GoBack";
import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Loader from "../layouts/Loader";

const PreviewRecipe = ({ previewRecipe, recipe, history, loading }) => {
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
							<div className="form__element form__element--textarea">
								<label htmlFor=""></label>
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
								<input type="submit" value="Calculate Nutritions" />
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
							<Loader className="inline" />
						)}
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
		previewRecipe
	}
)(PreviewRecipe);
