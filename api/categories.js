const express = require("express");
const axios = require("axios");
const router = express.Router();

//public
//get list of all categories

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

//publick
//search for categories by name

router.get("/:category", async (req, res) => {
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

module.exports = router;
