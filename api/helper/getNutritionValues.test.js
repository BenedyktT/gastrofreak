const axios = require("axios");
const getNutritionValues = require("./getNutritionValues");
const exampleDataToConvert = {
  calories: 1200,
  totalWeight: 1200,
  dietLabels: ["array"],
  healthLabels: ["array"],
  cautions: ["array"],
  totalNutrients: ["array"],
  totalDaily: ["array"]
};
jest.mock("axios");

describe("getNutritionValues", () => {
  it("fetch data successfully", async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: exampleDataToConvert })
    );
    await expect(
      getNutritionValues([{ prep: "prep", title: "title", ingr: ["ingr"] }])
    ).resolves.toHaveProperty(
      "ingr",
      "nutrients",
      "prep",
      "title",
      "totalWeight"
    );
  });
  it("fetch data with error", async () => {
    expect.assertions(1);
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error("Wrong Data Type"))
    );

    await expect(getNutritionValues([])).rejects.toThrow("Wrong data type");
  });
});
