const express = require("express");
const getMeal = require("./helper/getMeal");
const auth = require("./helper/auth");
const { check, validationResult } = require("express-validator");
const getNutritionValues = require("./helper/getNutritionValues");
const UserRecipe = require("../models/UserRecipe");

const router = express.Router();

//@public
//get

//@public
//get
//get list of meals by input

router.get("/queryType=:queryType/:item", async (req, res) => {
	const { queryType, item } = req.params;
	if (queryType !== "s" && queryType !== "i") {
		return res.status(400).json("Bad request");
	}

	try {
		const response = await getMeal(queryType, item, 1);
		return res.json(response);
	} catch (error) {
		res.status(500).json("Internal Server error");
	}
});

//@public
//get
//post recipe and get nutrition values

router.get("/:id", async (req, res) => {
	const data = await getMeal("i", req.params.id, 4);

	try {
		const recipe = await getNutritionValues(data);
		return res.json(recipe);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

router.post(
	"/",
	auth,
	[
		check("title", "Title is Required")
			.not()
			.isEmpty(),
		check("prep", "Preparation steps are required")
			.not()
			.isEmpty(),
		check("ingr", "Please provide coma separated ingredienties").isLength({
			min: 2
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const userRecipe = await UserRecipe.find({ user: req.user });
			const recipeExist = userRecipe.find(
				({ title }) => title === req.body.title
			);
			if (recipeExist) {
				return res.status(400).json("recipe already exist");
			}
			const newRecipe = new UserRecipe({
				...req.body,
				user: req.user
			});
			const recipe = await getNutritionValues([req.body]);
			await newRecipe.save();
			return res.json(recipe);
		} catch (error) {
			console.error(error);
			res.status(500).json(error.message);
		}
	}
);

router.post(
	"/preview",
	[
		check("title", "Title is Required")
			.not()
			.isEmpty(),
		check("prep", "Preparation steps are required")
			.not()
			.isEmpty(),
		check("ingr", "Please provide coma separated ingredienties").isLength({
			min: 2
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const recipe = await getNutritionValues([req.body]);
			return res.json(recipe);
		} catch (error) {
			console.error(error);
			res.status(500).json(error.message);
		}
	}
);
module.exports = router;
/*
 */
