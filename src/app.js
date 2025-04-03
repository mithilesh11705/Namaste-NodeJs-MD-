const express = require("express");

const app = express();
const User = require("./models/user");
const connectDB = require("./config/database.js");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Mithilesh",
    lastName: "Kumar",
    email: "mithilesh@gmail.com",
    password: "123456",
  });
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
