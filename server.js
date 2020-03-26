const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const recipes = require("./api/recipes");
const connectDB = require("./config/config");
const categories = require("./api/categories");
const user = require("./api/user");
const auth = require("./api/auth");
const favourite = require("./api/favourite");
const userRecipes = require("./api/userRecipes");

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
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, (req, res) => {
  console.log(`server is working on port ${PORT}`);
});

module.exports = app;
//https://developer.edamam.com/admin/applications/1409619312049
//https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
