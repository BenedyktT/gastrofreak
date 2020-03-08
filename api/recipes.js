import express from "express";
import axios from "axios";
import getMeal from "./helper/getMeal";

const router = express.Router();

//@public
//get

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

//@public
//get
//post recipe and get nutrition values

router.get("/:id", async (req, res) => {
	const data = await getMeal("i", req.params.id, 10);

	try {
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
		return res.json(nutritionReport);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

export default router;

/*
 */
