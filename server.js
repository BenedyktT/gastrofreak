import dotenv from "dotenv";
dotenv.config();
import express from "express";
import recipes from "./api/recipes";
import connectDB from "./config/config";
import categories from "./api/categories";
import user from "./api/user";
import auth from "./api/auth";
import favourite from "./api/favourite";
import userRecipes from "./api/userRecipes";

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));
app.use("/user", user);
app.use("/auth", auth);
app.use("/categories", categories);
app.use("/recipes", recipes);
app.use("/favourite", favourite);
app.use("/userRecipes", userRecipes);
app.get("/", (req, res) => {
	return res.send("Hello world");
});

app.listen(PORT, (req, res) => {
	console.log(`server is working on port ${PORT}`);
});

//https://developer.edamam.com/admin/applications/1409619312049
//https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
