import express from "express";
import axios from "axios";
import auth from "./helper/auth";
import Recipe from "../models/Recipe";
import User from "../models/User";
import getMeal from "./helper/getMeal";
const router = express.Router();

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
router.delete("/:id", auth, async (req, res) => {
	const { id } = req.params;
	try {
		await Recipe.findOneAndRemove({ recipeId: id });
		return res.json("user deleted");
	} catch (error) {
		console.error(error);
		res.status(500).json("error");
	}
});
router.post("/:id", auth, async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(req.user);
		const meal = await getMeal("i", id);
		const isExistingOnFavourite = await Recipe.findOne({ recipeId: id });
		console.log(isExistingOnFavourite);
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
export default router;
