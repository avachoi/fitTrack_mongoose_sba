const mongoose = require("mongoose");
const workoutSchema = new mongoose.Schema({
	userId: { type: String, required: true, unique: true },
	date: { type: Number, required: true },
	workoutType: { type: String, required: true },
	duration: { type: Number, required: true },
});
const Workouts = mongoose.model("Workout", workoutSchema);

module.exports = Workouts;
