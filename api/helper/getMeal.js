const axios = require("axios");

module.exports = async (queryType, item, serving = 1) => {
	try {
		const type = queryType === "s" ? "search" : "lookup";
		const response = await axios.get(
			`https://www.themealdb.com/api/json/v1/1/${type}.php?${queryType}=${item}`
		);

		if (response.data.meals) {
			const recipe = response.data.meals.map((meal, i, arr) => ({
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
		}
		return [{ msg: "Wrong ID - this recipe does not exist" }];
	} catch (error) {
		console.error(error);
		return error;
	}
};
