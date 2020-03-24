const axios = require("axios");
module.exports = async data => {
  const response = await axios.post(
    `https://api.edamam.com/api/nutrition-details?app_id=${process.env.APPLICATION_ID}&app_key=${process.env.APPLICATION_KEY}`,
    data[0],
    { headers: { ContentType: "application/json" } }
  );
  const {
    calories,
    totalWeight,
    dietLabels,
    healthLabels,
    cautions,
    totalNutrients,
    totalDaily
  } = response.data;
  const nutrients = [
    ...Object.values(totalNutrients),
    ...Object.values(totalDaily)
  ]
    .reduce((acc, curr) => {
      const x = acc.find(e => e.label === curr.label);
      if (!x) {
        return (acc = [...acc, curr]);
      }
      const toMerge = {
        amount: parseInt(x.quantity),
        amountUnit: x.unit
      };
      acc = acc.filter(e => e !== x);
      return (acc = [...acc, { ...curr, ...toMerge }]);
    }, [])
    .reduce((acc, curr) => {
      if (curr.amount) {
        return {
          ...acc,
          [curr.label]: {
            quantity: curr.quantity,
            unit: curr.unit,
            amount: curr.amount,
            amountUnit: curr.amountUnit
          }
        };
      }
      return {
        ...acc,
        [curr.label]: {
          quantity: curr.quantity,
          unit: curr.unit
        }
      };
    }, {});
  const nutritionReport = {
    prep: data[0].prep,
    title: data[0].title,
    ingr: data[0].ingr,
    calories,
    totalWeight,
    dietLabels,
    healthLabels,
    cautions,
    nutrients
  };
  return nutritionReport;
};
