const mongoose = require("mongoose");
const mealSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	date: { type: Number, required: true },
	foodItem: { type: String, required: true },
	calories: { type: Number, required: true },
});
const Meals = mongoose.model("Meals", mealSchema);

module.exports = Meals;
