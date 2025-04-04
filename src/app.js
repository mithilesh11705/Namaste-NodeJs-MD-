const express = require("express");

const app = express();
const User = require("./models/user");
const connectDB = require("./config/database.js");

app.use(express.json()); //json middelware

//get user by  email

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const user = await User.findOne({ email: userEmail });
    if (user.length === 0) res.status(404).send("User Not Found");
    else res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Feed API- get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error saving the user");
  }
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is successfully on port on 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
