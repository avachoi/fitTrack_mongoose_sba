const mongoose = require("mongoose");
const workoutSchema = new mongoose.Schema({
	username: { type: String, required: true },
	date: { type: Date, default: Date.now() },
	workoutType: { type: String, required: true },
	duration: { type: Number, required: true },
});
const Workouts = mongoose.model("Workout", workoutSchema);

module.exports = Workouts;
