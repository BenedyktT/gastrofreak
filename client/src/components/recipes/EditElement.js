import React, { Fragment } from "react";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { connect } from "react-redux";
import { enterEditMode, exitEditMode } from "../../redux/actions/recipeActions";

const EditElement = ({
	id,
	update,
	recipe,
	isExternalRecipe,
	enterEditMode,
	element,
	exitEditMode,
	isEditMode
}) => {
	const onClick = e => {
		enterEditMode(element);
		if (isExternalRecipe) {
			const { title, prep, ingr } = recipe;
			console.log(recipe);
			return;
		}
		console.log(id, update);
	};
	return (
		<Fragment>
			{isEditMode ? (
				<div className="">
					<input type="text" />
					<input type="submit" />
				</div>
			) : (
				<Edit className="edit-svg" />
			)}
		</Fragment>
	);
};

export default connect(
	state => ({
		recipe: state.recipeReducer.recipe,
		isEditMode: state.recipeReducer.isEditMode
	}),
	{
		enterEditMode,
		exitEditMode
	}
)(EditElement);
