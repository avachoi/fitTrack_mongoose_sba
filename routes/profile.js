const express = require("express");
const router = express.Router();

const Users = require("../models/users");
const Meals = require("../models/meals.js");
const Workouts = require("../models/workout.js");

router.get("/:userId", async (req, res) => {
	try {
		const user = await Users.findOne({ userId: req.params.userId });
		res.render("profile", { user: user });
	} catch (error) {
		console.log("Error rendering profile:", error);
		res.status(500).send("Error rendering user profile");
	}
});
router.put("/:userId", async (req, res) => {
	try {
		const updatedUser = await Users.findOneAndUpdate(
			{ userId: req.params.userId },
			req.body,
			{
				new: true,
			}
		);
		res.redirect(`/profile/${updatedUser.userId}`);
	} catch (error) {
		console.log("Error updating profile:", error);
		res.status(500).send("Error updating user profile");
	}
});
router.delete("/:userId", async (req, res) => {
	try {
		await Users.findOneAndDelete(req.params.userId);
		res.redirect("/");
	} catch (error) {
		console.log("Error deleting user:", error);
		res.status(500).send("Error deleting user profile");
	}
});

module.exports = router;
