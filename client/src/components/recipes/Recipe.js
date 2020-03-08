import React, { useEffect } from "react";
import { connect } from "react-redux";
import NutritionTable from "./NutritionTable";
import { getRecipe } from "../../redux/actions/recipeActions";
const Recipe = ({ getRecipe, recipe, match }) => {
	useEffect(() => {
		getRecipe(match.params.id);
	}, []);
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
				{}
				<div className="recipe__title">{title}</div>
				<div className="recipe__health-labels">
					<h3>Health labels:</h3>
					<p className="recipe__health-labels-elements">
						{healthLabels.map(e => `${e.toLowerCase().replace(/_+/g, " ")},`)}
					</p>
				</div>
				<div className="recipe__nutrition-summary">
					<span>Serving: 4</span>
					<span>Total weight: {parseInt(totalWeight)}g</span>
					<span>Kcal per serving: {calories}</span>
				</div>
				<div className="recipe__nutrition-details">
					<NutritionTable nutrients={nutrients} />
				</div>
				<div className="recipe__prep">
					<h3>Prep:</h3>
					<p>{prep}</p>
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

export default connect(state => ({ recipe: state.recipeReducer.recipe }), {
	getRecipe
})(Recipe);
