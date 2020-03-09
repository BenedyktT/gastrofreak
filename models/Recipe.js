import mongoose from "mongoose";

let RecipeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	},
	title: {
		type: String,
		required: true
	},
	prep: { type: String, required: true },
	ingr: { type: Array, required: true },
	date: {
		type: Date,
		default: Date.now()
	},
	recipeId: {
		type: Number
	}
});

export default RecipeSchema = mongoose.model("recipe", RecipeSchema);
