const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const dbConnect = require("./conn.js");

const usersData = require("./data/users.js");
const mealsData = require("./data/meals.js");
const workoutData = require("./data/workout.js");

const Users = require("./models/users");
const Meals = require("./models/meals.js");
const Workouts = require("./models/workout.js");

const app = express();
const port = 8080;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
	const time = new Date();

	console.log(
		`-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
	);
	if (Object.keys(req.body).length > 0) {
		console.log("Containing the data:");
		console.log(`${JSON.stringify(req.body)}`);
	}
	next();
});
//using morgan
app.use(
	morgan(function (tokens, req, res) {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, "content-length"),
			"-",
			tokens["response-time"](req, res),
			"ms",
		].join(" ");
	})
);
app.use((req, res, next) => {
	console.log(`Serving: ${req.url}`);
	next();
});

/////////////////////////////ROUTS//////////////////////////////////////////////
app.get("/", (req, res) => {
	// res.set("Cache-Control", "public, max-age=3600");
	// res.set();

	res.render("login");
});
app.post("/login", async (req, res) => {
	try {
		const user = await Users.findOne({ username: req.body.username });
		if (user) {
			console.log("######user#######", user);
			const result = req.body.password === user.password;
			if (result) {
				res.redirect(`/workout/${user.userId}`);
			} else {
				res.status(400).send("Password doesn't match");
			}
		} else {
			res.status(400).send("User doesn't exist");
		}
	} catch (error) {
		console.log("Error retrieving users:", error);
		res.status(500).send("Error logging In");
	}
});

app.get("/signup", (req, res) => {
	res.render("signup");
});
app.post("/signup", async (req, res) => {
	try {
		const newUser = req.body;
		const existedName = Users.findOne({ username: newUser.username });
		if (existedName) {
			res.send("Username already existed");
		} else if (newUser.username === newUser.password) {
			res.send("Username and Password can not be same.");
		} else {
			const createdUser = await Users.create({
				username: newUser.username,
				userId: uuidv4(),
				password: newUser.password,
				height: newUser.height,
				weight: newUser.weight,
			});
			console.log("createdUser", createdUser);
			res.redirect("/");
		}
	} catch (error) {
		console.log("Error signing up", error);
		res.status(500).send("Error signing up");
	}
});
app.get("/workout/:userId", async (req, res) => {
	try {
		console.log("req.params.userId?", req.params.userId);
		const workout = await Workouts.find({ userId: req.params.userId });
		console.log("&&&&&&&&&workout&&&&&&", workout);
		res.render("workout", { workouts: workout, userId: req.params.userId });
	} catch (error) {
		console.log("Error retrieving workout db", error);
		res.status(500).send("Error retrieving workout db");
	}
});
app.post("/workout/:userId", async (req, res) => {
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
app.get("/meals/:userId", async (req, res) => {
	try {
		const meals = await Meals.find({ userId: req.params.userId });
		res.render("meals", { meals: meals, userId: req.params.userId });
	} catch (error) {
		console.log("Error retrieving meals data", error);
		res.status(500).send("Error retrieving meals data");
	}
});
app.post("/meals/:userId", async (req, res) => {
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
app.get("/users", async (req, res) => {
	try {
		const users = await Users.find({});
		res.render("users", { users: users });
	} catch (error) {
		console.log("Error retrieving users:", error);
		res.status(500).send("Error retrieving users");
	}
});
app.get("/profile/:id", async (req, res) => {
	try {
		const user = await Users.findById(req.params.id);
		res.render("profile", { user: user });
	} catch (error) {
		console.log("Error rendering profile:", error);
		res.status(500).send("Error rendering user profile");
	}
});
app.put("/profile/:id", async (req, res) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.redirect(`/profile/${updatedUser.id}`);
	} catch (error) {
		console.log("Error updating profile:", error);
		res.status(500).send("Error updating user profile");
	}
});
app.delete("/profile/:id", async (req, res) => {
	try {
		await Users.findByIdAndDelete(req.params.id);
		res.redirect("/");
	} catch (error) {
		console.log("Error deleting user:", error);
		res.status(500).send("Error deleting user profile");
	}
});

app.get("/seed", async (req, res) => {
	await Users.deleteMany({});
	await Users.insertMany(usersData);

	await Meals.deleteMany({});
	await Meals.insertMany(mealsData);

	await Workouts.deleteMany({});
	await Workouts.insertMany(workoutData);

	res.send("seeded!");
});

/////////////////////ERRORS////////////////////////////////////////////////////
app.get("/", (req, res) => {
	throw new Error("BROKEN"); // Express will catch this on its own.
});
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something went wrong!" });
});
app.listen(port, () => {
	console.log(`Server listening on port:${port}`);
	dbConnect();
});
