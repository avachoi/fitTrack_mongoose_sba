const express = require("express");
const router = express.Router();

const Users = require("../models/users");
const Meals = require("../models/meals.js");
const Workouts = require("../models/workout.js");

router.get("/:userId", async (req, res) => {
	try {
		const meals = await Meals.find({ userId: req.params.userId });
		const user = await Users.findOne({ userId: req.params.userId });
		res.render("meals", { meals: meals, user: user });
	} catch (error) {
		console.log("Error retrieving meals data", error);
		res.status(500).send("Error retrieving meals data");
	}
});
router.post("/:userId", async (req, res) => {
	try {
		const newMeal = req.body;
		const createdMeal = await Meals.create({
			userId: req.params.userId,
			date: newMeal.date,
			foodItem: newMeal.foodItem,
			calories: newMeal.calories,
		});
		res.redirect(`/meals/${req.params.userId}`);
	} catch (error) {
		console.log("Error creating a new workout", error);
		res.status(500).send("Error creating a new workout");
	}
});

module.exports = router;
