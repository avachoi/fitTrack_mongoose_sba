const mongoose = require("mongoose");
const mealSchema = new mongoose.Schema({
	username: { type: String, required: true },
	date: { type: Date, default: Date.now() },
	foodItem: { type: String, required: true },
	calories: { type: Number, required: true },
});
const Meals = mongoose.model("Meals", mealSchema);

module.exports = Meals;
