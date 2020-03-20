const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
	"/",
	[
		check("name", "Name is required")
			.not()
			.isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) return res.status(400).json({ msg: "User already exists" });

			user = new User({
				name,
				email,
				password
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				id: user._id
			};

			const token = jwt.sign(payload, process.env.jwtSecret, {
				expiresIn: 360000
			});

			res.status(201).json({token});
		} catch (error) {
			res.status(500).json("Server Error");
		}
	}
);

module.exports = router;
