const axios = require("axios");
const fetchRecipe = async (queryType, item) => {
  try {
    const type = queryType === "s" ? "search" : "lookup";
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/${type}.php?${queryType}=${item}`
    );
    return response.data.meals;
  } catch (error) {
    throw new Error("Error");
  }
};

const trimRecipe = meals => {
  if (!meals) {
    return "Invalid argument";
  }
  const recipe = meals.map((meal, i, arr) => ({
    title: meal.strMeal,
    prep: meal.strInstructions,
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
};

const getMeal = async (queryType, item, serving = 1) => {
  try {
    if (!item) {
      return [{ msg: "Wrong ID - this recipe does not exist" }];
    }
    const recipe = await fetchRecipe(queryType, item).catch(e =>
      console.error(e)
    );

    return trimRecipe(recipe);
  } catch (error) {
    console.log(error);
    throw new Error("error");
  }
};
exports.getMeal = getMeal;
exports.fetchRecipe = fetchRecipe;
exports.trimRecipe = trimRecipe;
