const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function dbConnect() {
	const uri = process.env.MONGODB_URI;
	if (!uri) {
		throw new Error("MONGODB_URI is not defined in the environment variables");
	}

	try {
		await mongoose.connect(uri, { dbName: "fitTrack" });
		console.log("Successfully connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB", error);
		throw error;
	}
}

module.exports = dbConnect;
