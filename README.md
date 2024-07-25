# FitTrack

FitTrack is a fitness tracking application that allows users to log and manage their workouts, meals, and profile information. The application is built using Node.js, Express, MongoDB, and Pug as the template engine.

## Features

- User authentication (signup, login)
- Profile management (view, update, delete)
- Workout logging and management
- Meal logging and management

## Installation

To get started with FitTrack, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/avachoi/fitTrack.git
cd fitTrack
```

2. Install dependencies:

```bash
npm install
```

3. Set up the environment variables:

Create a .env file in the root directory and add your MongoDB connection string:

```bash
MONGODB_URI=your_mongodb_uri
```

4. Seed the database (optional):

If you want to seed the database with initial data, run:

```bash
npm run seed
```

5. Start the application:

```bash
npm start
```

The application will be running on http://localhost:8080.

## Usage

### User Authentication

- Signup: Visit http://localhost:8080/signup to create a new account.
- Login: Visit http://localhost:8080 to login.

### Profile Management

- View Profile: After logging in, navigate to http://localhost:8080/profile/:username to view your profile.
- Update Profile: Edit your profile information directly on the profile page.
- Delete Profile: Delete your profile from the profile page.

### Workout Logging

- View Workouts: Navigate to http://localhost:8080/workout/:username to view your workouts.
- Add Workout: Use the form on the workouts page to add a new workout.
- Delete Workout: Delete a workout directly from the workouts page.

### Meal Logging

- View Meals: Navigate to http://localhost:8080/meals/:username to view your meals.
- Add Meal: Use the form on the meals page to add a new meal.
- Delete Meal: Delete a meal directly from the meals page.
