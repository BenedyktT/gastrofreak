const express = require("express");
const axios = require("axios");
const auth = require("./helper/auth");
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const getMeal = require("./helper/getMeal");
const router = express.Router();
//@private
//get list of favourite
router.get("/", auth, async (req, res) => {
	try {
		const find = await Recipe.find({ user: req.user });
		if (find) {
			return res.json(find);
		}
		return res.json([]);
	} catch (error) {
		console.error(error);
		res.status(500).json("error");
	}
});

//@private
//delete from favourite list

router.delete("/:id", auth, async (req, res) => {
	const { id } = req.params;

	try {
		const recipe = await Recipe.find({ recipeId: id });
		if (recipe[0].user.toString() !== req.user) {
			return res.status(401).json("Unauthorized");
		}
		await recipe[0].remove();
		res.json("Recipe removed");
	} catch (error) {
		console.error(error);
		res.status(500).json(error.message);
	}
});

//@private
//add to favourite list
router.post("/:id", auth, async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(req.user);
		const meal = await getMeal("i", id);

		const isExistingOnFavourite = await Recipe.findOne({
			recipeId: id,
			user: req.user
		});
		if (user && meal && !isExistingOnFavourite) {
			const addRecipeToFavourite = new Recipe({
				user: req.user,
				...meal[0],
				recipeId: id
			});
			const post = await addRecipeToFavourite.save();
			return res.json(post);
		}
		return res.status(400).json("Something went wrong");
	} catch (error) {
		console.error(error);
		res.status(500).json("error");
	}
});
module.exports = router;
