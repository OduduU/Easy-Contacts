const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
		
		res.json({ data: req.body });
	}
);

module.exports = router;
