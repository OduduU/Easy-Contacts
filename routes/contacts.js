const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get("/", auth, async (req, res) => {
	
	try {
		const contacts = await Contact.find({ user: req.userId }).sort({ date: -1 });

		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: "Server Error"
		});
	}
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
	"/",
	[
		auth,
		[
			check("name", "Name is requied")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		console.log(req);
		
		const { name, email, phone, type } = req.body;
		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.userId
			});

			const contact = await newContact.save();
			res.json(contact);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				msg: 'Server Error'
			});
		}
	}
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put("/:id", (req, res) => {
	res.json({ msg: "Update contact" });
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete("/:id", (req, res) => {
	res.json({ msg: "Delete contact" });
});

module.exports = router;
