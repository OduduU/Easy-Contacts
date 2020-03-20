const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.userId.id).select("-password");
		res.json(user);
	} catch (error) {
		res.status(500).json({
			msg: "Server Error"
		});
	}
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
	"/",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

			const payload = {
				id: user._id
			};

			const token = jwt.sign(payload, process.env.jwtSecret, {
				expiresIn: 360000
			});

			res.status(201).json({token});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				msg: "Server Error"
			});
		}
	}
);

module.exports = router;
