import React from "react";

const NutritionTable = ({ nutrients, portion, totalWeight }) => {
	const {
		Fat,
		Saturated,
		Monounsaturated,
		Polyunsaturated,
		Carbs,
		Fiber,
		Water,
		Protein,
		Sugars
	} = nutrients;
	const calculatePortion = nutrient => {
		return parseInt((portion * nutrient) / totalWeight);
	};
	return (
		<table className="tg">
			<thead>
				<tr>
					<th className="tg-owf9"></th>
					<th className="tg-53ol">{portion} g</th>
					<th className="tg-53ol">% Daily</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="tg-owf9">
						<span style={{ fontWeight: "bold" }}>Fat</span>
					</td>
					<td className="tg-ofj5" style={{ fontWeight: "bold" }}>
						{calculatePortion(Fat.amount)}
					</td>
					<td className="tg-ofj5" style={{ fontWeight: "bold" }}>
						{calculatePortion(parseInt(Fat.quantity))}
					</td>
				</tr>
				<tr>
					<td className="tg-owf9">Saturated</td>
					<td className="tg-ofj5">{calculatePortion(Saturated.amount)}</td>
					<td className="tg-ofj5">
						{calculatePortion(parseInt(Saturated.quantity))}
					</td>
				</tr>
				<tr>
					<td className="tg-owf9">Monounsaturated</td>
					<td className="tg-ofj5">
						{calculatePortion(parseInt(Monounsaturated.quantity))}
					</td>
					<td className="tg-ofj5"></td>
				</tr>
				<tr>
					<td className="tg-owf9">Polyunsaturated</td>
					<td className="tg-ofj5">
						{calculatePortion(parseInt(Polyunsaturated.quantity))}
					</td>
					<td className="tg-ofj5"></td>
				</tr>
				<tr>
					<td className="tg-owf9">
						<span style={{ fontWeight: "bold" }}>Carbs</span>
					</td>
					<td className="tg-ofj5" style={{ fontWeight: "bold" }}>
						{calculatePortion(Carbs.amount)}
					</td>
					<td className="tg-ofj5" style={{ fontWeight: "bold" }}>
						{calculatePortion(parseInt(Carbs.quantity))}
					</td>
				</tr>
				<tr>
					<td className="tg-owf9">Sugars</td>
					<td className="tg-ofj5">
						{calculatePortion(parseInt(Sugars.quantity))}
					</td>
					<td className="tg-ofj5"></td>
				</tr>
				<tr>
					<td className="tg-owf9">Fiber</td>
					<td className="tg-ofj5">{calculatePortion(Fiber.amount)}</td>
					<td className="tg-ofj5">
						{calculatePortion(parseInt(Fiber.quantity))}
					</td>
				</tr>
				<tr>
					<td className="tg-owf9" style={{ fontWeight: "bold" }}>
						Proteins
					</td>
					<td className="tg-ofj5" style={{ fontWeight: "bold" }}>
						{calculatePortion(Protein.amount)}
					</td>
					<td className="tg-ofj5" style={{ fontWeight: "bold" }}>
						{calculatePortion(parseInt(Protein.quantity))}
					</td>
				</tr>
				<tr>
					<td className="tg-owf9">Water</td>
					<td className="tg-ofj5">{calculatePortion(Water.quantity)}</td>
					<td className="tg-ofj5"></td>
				</tr>
			</tbody>
		</table>
	);
};

export default NutritionTable;
