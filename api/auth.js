const express = require("express");
const router = express.Router();
const auth = require("./helper/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// @route GET api/auth
// @desc
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.send(401).json({ msg: "server error" });
  }
});

// @route POST api/auth
// @desc login user
// @access Public

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "password is required").exists()
  ],
  async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }
      const payload = {
        user: user.id
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
