import express from "express";
import axios from "axios";

const router = express.Router();

const getMeal = async (queryType, item, serving = 1) => {
  try {
    const type = queryType === "s" ? "search" : "lookup";
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/${type}.php?${queryType}=${item}`
    );

    const recipe = response.data.meals.map((meal, i, arr) => ({
      title: meal.strMeal,
      prep: meal.strInstructions,
      yield: serving,
      ingr: arr.reduce((acc, curr) => {
        const extractItem = includes => {
          return (
            Object.keys(meal)
              //get keys where there are ingredients
              .filter(e => e.includes(includes))
              //create object with ingredients only
              .map(key => curr[key] && curr[key])
              //remove null and empty strings
              .filter(e => e)
          );
        };
        const ingr = extractItem("strIngredient");
        const measures = extractItem("strMeasure");
        //combine measure and ingredients
        acc = ingr.map((e, i) => `${measures[i]} ${e}`);

        return acc;
      }, [])
    }));
    return recipe;
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
    const response = await getMeal(queryType, item, 1);
    return res.json(response);
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

router.get("/:id", async (req, res) => {
  const data = await getMeal("i", req.params.id);
  try {
    const response = await axios.post(
      `https://api.edamam.com/api/nutrition-details?app_id=${process.env.APPLICATION_ID}&app_key=${process.env.APPLICATION_KEY}`,
      data[0],
      { headers: { ContentType: "application/json" } }
    );
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server error");
  }
});

export default router;
