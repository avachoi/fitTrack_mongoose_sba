const express = require("express");
const router = express.Router();

const Users = require("../models/users");
const Meals = require("../models/meals.js");
const Workouts = require("../models/workout.js");

router.get("/:username", async (req, res) => {
	try {
		const user = await Users.findOne({ username: req.params.username });
		res.render("profile", { user: user });
	} catch (error) {
		console.log("Error rendering profile:", error);
		res.status(500).send("Error rendering user profile");
	}
});
router.put("/:username", async (req, res) => {
	try {
		const updatedUser = await Users.findOneAndUpdate(
			{ username: req.params.username },
			req.body,
			{
				new: true,
			}
		);
		res.redirect(`/profile/${updatedUser.username}`);
	} catch (error) {
		console.log("Error updating profile:", error);
		res.status(500).send("Error updating user profile");
	}
});
router.delete("/:username", async (req, res) => {
	try {
		await Users.findOneAndDelete({ username: req.params.username });
		res.redirect("/");
	} catch (error) {
		console.log("Error deleting user:", error);
		res.status(500).send("Error deleting user profile");
	}
});

module.exports = router;
