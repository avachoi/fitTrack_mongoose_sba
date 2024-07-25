const express = require("express");
const router = express.Router();

const Users = require("../models/users");
const Meals = require("../models/meals.js");
const Workouts = require("../models/workout.js");

router.get("/:username", async (req, res) => {
	try {
		const meals = await Meals.find({ username: req.params.username });
		const user = await Users.findOne({ username: req.params.username });
		res.render("meals", { meals: meals, user: user });
	} catch (error) {
		console.log("Error retrieving meals data", error);
		res.status(500).send("Error retrieving meals data");
	}
});
router.post("/:username", async (req, res) => {
	try {
		const newMeal = req.body;
		const createdMeal = await Meals.create({
			username: req.params.username,
			date: newMeal.date,
			foodItem: newMeal.foodItem,
			calories: newMeal.calories,
		});
		res.redirect(`/meals/${req.params.username}`);
	} catch (error) {
		console.log("Error creating a new workout", error);
		res.status(500).send("Error creating a new workout");
	}
});

module.exports = router;
