const auth = require("./helper/auth");
const getNutritionValues = require("./helper/getNutritionValues");
const UserRecipe = require("../models/UserRecipe");
const express = require("express");
const router = express.Router();
router.delete("/:id", auth, async (req, res) => {
	const { id } = req.params;
	try {
		const recipe = await UserRecipe.findById(id);
		if (recipe.user.toString() !== req.user) {
			return res.status(401).json("Unauthorized");
		}
		await recipe.remove();
		res.json("Recipe removed");
	} catch (error) {
		console.error(error);
		res.status(500).json(error.message);
	}
});

router.get("/", auth, async (req, res) => {
	try {
		const recipes = await UserRecipe.find({ user: req.user });
		res.json(recipes);
	} catch (error) {
		console.error(error);
		res.status(500).json(error.message);
	}
});

//@public
//get
//post recipe and get nutrition values

router.get("/:id", async (req, res) => {
	const data = await UserRecipe.findById(req.params.id).select(
		"-date -user -v -_id"
	);
	if (!data) {
		return res.status(500).json("Didn't find any recipe matching criteria");
	}

	try {
		const recipe = await getNutritionValues([data]);
		return res.json(recipe);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

module.exports = router;
