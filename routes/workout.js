const express = require("express");
const router = express.Router();

const Users = require("../models/users");
const Meals = require("../models/meals.js");
const Workouts = require("../models/workout.js");

router.get("/:username", async (req, res) => {
	try {
		const workout = await Workouts.find({ username: req.params.username });
		const user = await Users.findOne({ username: req.params.username });
		res.render("workout", { workouts: workout, user: user });
	} catch (error) {
		console.log("Error retrieving workout db", error);
		res.status(500).send("Error retrieving workout db");
	}
});
router.post("/:username", async (req, res) => {
	try {
		const newWorkout = req.body;
		const createdWorkout = await Workouts.create({
			username: req.params.username,
			date: newWorkout.date,
			workoutType: newWorkout.type,
			duration: newWorkout.duration,
		});
		res.redirect(`/workout/${req.params.username}`);
	} catch (error) {
		console.log("Error creating a new workout", error);
		res.status(500).send("Error creating a new workout");
	}
});

module.exports = router;
