const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	height: { type: Number, required: true },
	weight: { type: Number, required: true },
});
const Users = mongoose.model("User", userSchema);

module.exports = Users;
