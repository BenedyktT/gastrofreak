import express from "express";
const router = express.Router();
import User from "../models/User";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

//@public
//@register new user

router.post(
	"/",
	[
		check("name", "Name is Required")
			.not()
			.isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a pasword with 6 or more characters"
		).isLength({
			min: 6
		})
	],
	async function(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		try {
			// see if user exists
			let user = await User.findOne({ email });
			if (user) {
				res.status(400).json({ errors: [{ msg: "User already exist" }] });
			}

			user = new User({
				name,
				email,
				password
			});
			// encrypt password
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();
			// return jsonwebtoken

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				process.env.jwtSecret,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (e) {
			console.error(e.message);
			res.status(500).send("server error");
		}
	}
);

export default router;
