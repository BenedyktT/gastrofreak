import React from "react";

const NutritionTable = () => {
  return (
    <table className="tg">
      <tr>
        <th className="tg-owf9"></th>
        <th className="tg-53ol">g</th>
        <th className="tg-53ol">%</th>
      </tr>
      <tr>
        <td className="tg-owf9">
          <span style={{ fontWeight: "bold" }}>Fat</span>
        </td>
        <td className="tg-ofj5" style={{ fontWeight: "bold" }}>
          75
        </td>
        <td className="tg-ofj5" style={{ fontWeight: "bold" }}>
          40
        </td>
      </tr>
      <tr>
        <td className="tg-owf9">Saturated</td>
        <td className="tg-ofj5">21</td>
        <td className="tg-ofj5">12</td>
      </tr>
      <tr>
        <td className="tg-owf9">Monosaturated</td>
        <td className="tg-ofj5">2</td>
        <td className="tg-ofj5">12</td>
      </tr>
      <tr>
        <td className="tg-owf9">Monounsaturated</td>
        <td className="tg-ofj5">11</td>
        <td className="tg-ofj5">57</td>
      </tr>
      <tr>
        <td className="tg-owf9">Polyunsaturated</td>
        <td className="tg-ofj5">11</td>
        <td className="tg-ofj5">22</td>
      </tr>
      <tr>
        <td className="tg-owf9">
          <span style={{ fontWeight: "bold" }}>Carbs</span>
        </td>
        <td className="tg-ofj5" style={{ fontWeight: "bold" }}>
          150
        </td>
        <td className="tg-ofj5" style={{ fontWeight: "bold" }}>
          60
        </td>
      </tr>
      <tr>
        <td className="tg-owf9">Sugars</td>
        <td className="tg-ofj5">11</td>
        <td className="tg-ofj5">21</td>
      </tr>
      <tr>
        <td className="tg-owf9">Fiber</td>
        <td className="tg-ofj5">22</td>
        <td className="tg-ofj5">24</td>
      </tr>
      <tr>
        <td className="tg-owf9" style={{ fontWeight: "bold" }}>
          Proteins
        </td>
        <td className="tg-ofj5" style={{ fontWeight: "bold" }}>
          421
        </td>
        <td className="tg-ofj5" style={{ fontWeight: "bold" }}>
          24
        </td>
      </tr>
    </table>
  );
};

export default NutritionTable;
