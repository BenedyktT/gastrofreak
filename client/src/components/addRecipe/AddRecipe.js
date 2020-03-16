import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NutritionTable from "./NutritionTable";
import {
	getRecipe,
	destroyRecipe,
	getUserRecipe
} from "../../redux/actions/recipeActions";
import GoBack from "../layouts/GoBack";

const Recipe = ({
	getRecipe,
	recipe,
	match,
	history,
	destroyRecipe,
	getUserRecipe
}) => {
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
				<div className="recipe__title">{title}</div>
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

					<textarea
						name="prep"
						id=""
						cols="30"
						rows="10"
						placeholder="Preparation steps"
					/>
				</div>
				<div className="recipe__ingredients">
					<ul className="ingredient__elements">
						{ingr.map(e => (
							<li key={Math.random()} className="ingredient__element">
								{e}
							</li>
						))}
					</ul>
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
)(Recipe);
