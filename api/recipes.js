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
