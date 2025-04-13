const express = require("express");

const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth.js");
const User = require("../models/user");
const { validateProfileEditData } = require("../utils/validations");
const profileRouter = express.Router();
profileRouter.use(express.json());
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedMessage = await jwt.verify(token, "Dekdbjcpajsj!5354");

    console.log(decodedMessage);
    const { _id } = decodedMessage;

    const user = req.user;
    if (!user) {
      throw new Error("User not present");
    }

    console.log(cookies);
    res.json({
      message: "User Found",
      data: user,
    });
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "skills",
      "photourl",
      "about",
      "gender",
      "age",
    ];

    const loggedInUser = req.user;

    if (!validateProfileEditData(req)) {
      return res
        .status(400)
        .send({ message: "Invalid fields in request body" });
    }

    Object.keys(req.body).forEach((key) => {
      if (ALLOWED_UPDATES.includes(key)) {
        loggedInUser[key] = req.body[key];
      }
    });

    // Save changes if using a DB model like Mongoose
    await loggedInUser.save();

    res
      .status(200)
      .send({ message: "Profile updated successfully", user: loggedInUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).send({ message: "Server error while updating profile" });
  }
});

module.exports = profileRouter;
