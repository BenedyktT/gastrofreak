const { getMeal, fetchRecipe, trimRecipe } = require("./getMeal");
const axios = require("axios");

const response = {
  meals: [
    {
      idMeal: "52772",
      strMeal: "Teriyaki Chicken Casserole",
      strDrinkAlternate: null,
      strCategory: "Chicken",
      strArea: "Japanese",
      strInstructions:
        "Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\n" +
        "Combine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\n" +
        "Meanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\n" +
        "Place the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n" +
        "*Meanwhile, steam or cook the vegetables according to package directions.\r\n" +
        "Add the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      strTags: "Meat,Casserole",
      strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
      strIngredient1: "soy sauce",
      strIngredient2: "water",
      strIngredient3: "brown sugar",
      strIngredient4: "ground ginger",
      strIngredient5: "minced garlic",
      strIngredient6: "cornstarch",
      strIngredient7: "chicken breasts",
      strIngredient8: "stir-fry vegetables",
      strIngredient9: "brown rice",
      strIngredient10: "",
      strIngredient16: null,
      strMeasure1: "1 cup",
      strMeasure2: "1/2 cup",
      strMeasure3: "1/4 cup",
      strMeasure4: "1/2 teaspoon",
      strMeasure5: "1/2 teaspoon",
      strMeasure6: "4 Tablespoons",
      strMeasure7: "2",
      strMeasure8: "1 (12 oz.)",
      strMeasure9: "3 cups",
      strMeasure10: "",
      strMeasure11: "",
      strMeasure16: null,
      strSource: null,
      dateModified: null
    }
  ]
};

jest.mock("axios");
describe("getMeal function", () => {
  it("should be defined", () => {
    expect(getMeal).toBeDefined();
  });
  it("should return an array with message if id is not provided", () => {
    axios.get.mockResolvedValue({
      data: []
    });
    return getMeal("i").then(response =>
      expect(response).toEqual([
        { msg: "Wrong ID - this recipe does not exist" }
      ])
    );
  });
  it("should return recipy of requested id", () => {
    axios.get.mockResolvedValue({
      data: response
    });
    return getMeal("i", 52772).then(response => {
      expect(response).toBeDefined();
      expect(response[0]).toHaveProperty("ingr", "title", "prep");
    });
  });
});

describe("fetchRecipy", () => {
  it("should catch error", async () => {
    axios.get.mockResolvedValue(Promise.reject());
    return await expect(fetchRecipe("i", 123456)).rejects.toThrow("Error");
  });
});

describe("trimRecipe", () => {
  it("should return an error message if invalid argument is passed", () => {
    expect(trimRecipe()).toBe("Invalid argument");
  });
  it("should return an object", () => {
    expect(typeof trimRecipe(response.meals)).toBe("object");
  });
  it("should return trimmed object", () => {
    const result = trimRecipe(response.meals);
    expect(result).not.toHaveProperty("strMeasure");
    expect(result[0].title).toBe("Teriyaki Chicken Casserole");
  });
});
