const express = require("express");
const router = express.Router();

const Users = require("../models/users");
const Meals = require("../models/meals.js");
const Workouts = require("../models/workout.js");

router.get("/:userId", async (req, res) => {
	try {
		console.log("req.params.userId?", req.params.userId);
		const workout = await Workouts.find({ userId: req.params.userId });
		const user = await Users.findOne({ userId: req.params.userId });
		console.log("&&&&&&&&&workout&&&&&&", workout);
		console.log("&&&&&&&&&user&&&&&&", user);
		res.render("workout", { workouts: workout, user: user });
	} catch (error) {
		console.log("Error retrieving workout db", error);
		res.status(500).send("Error retrieving workout db");
	}
});
router.post("/:userId", async (req, res) => {
	try {
		const newWorkout = req.body;
		const createdWorkout = await Workouts.create({
			userId: req.params.userId,
			date: newWorkout.date,
			workoutType: newWorkout.type,
			duration: newWorkout.duration,
		});
		res.redirect(`/workout/${req.params.userId}`);
	} catch (error) {
		console.log("Error creating a new workout", error);
		res.status(500).send("Error creating a new workout");
	}
});

module.exports = router;
