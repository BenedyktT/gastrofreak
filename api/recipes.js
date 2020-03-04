import express from "express";
import axios from "axios";

const router = express.Router();

const getMeal = async (queryType, item) => {
  try {
    const type = queryType === "s" ? "search" : "lookup";
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/${type}.php?${queryType}=${item}`
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

//@public
//get
//get list of meals by input

router.get("/queryType=:queryType/:item", async (req, res) => {
  const { queryType, item } = req.params;
  if (queryType !== "s" && queryType !== "i") {
    return res.status(400).json("Bad request");
  }

  try {
    const response = await getMeal(queryType, item);
    return res.json(response.data);
  } catch (error) {
    res.status(500).json("Internal Server error");
  }
});

router.get("/categories=:category", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${req.params.category}`
    );

    return res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server error");
  }
});

//@public
//post
//post recipe and get nutrition values

router.post("/", async (req, res) => {
  const data = {
    title: "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
    prep:
      "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
    yield: "About 15 servings",
    ingr: [
      "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
      "7 cloves garlic, minced",
      "1 tablespoon caraway seeds, crushed",
      "4 teaspoons salt",
      "Freshly ground pepper to taste",
      "1 teaspoon olive oil",
      "1 medium onion, peeled and chopped",
      "3 cups sourdough rye bread, cut into 1/2-inch cubes",
      "1 1/4 cups coarsely chopped pitted prunes",
      "1 1/4 cups coarsely chopped dried apricots",
      "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
      "2 teaspoons chopped fresh rosemary",
      "1 egg, lightly beaten",
      "1 cup chicken broth, homemade or low-sodium canned"
    ]
  };
  try {
    const response = await axios.post(
      `https://api.edamam.com/api/nutrition-details?app_id=${process.env.APPLICATION_ID}&app_key=${process.env.APPLICATION_KEY}`,
      data,
      { headers: { ContentType: "application/json" } }
    );
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server error");
  }
});

export default router;
