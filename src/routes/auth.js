const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookieParser = require("cookie-parser");
const { validateSignup } = require("../utils/validations");

const { userAuth } = require("../middlewares/auth.js");

const authRouter = express.Router();
authRouter.use(express.json());
authRouter.use(cookieParser());

authRouter.post("/signup", async (req, res) => {
  //Validation Of data
  try {
    validateSignup(req);

    //Encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    //Store the data in Database

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.send("User created");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error : " + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // if (!validate.isEmail(email)) return res.status(400).send("Invalid Email");

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid Credentials");

    //     console.log("Entered Password:", password);
    // console.log("Hashed Password from DB:", user.password);

    const isPassword = await bcrypt.compare(password, user.password);

    if (isPassword) {
      //Create a JWT Token

      const token = await jwt.sign({ _id: user._id }, "Dekdbjcpajsj!5354", {
        expiresIn: "7d",
      });
      //Add the token to cookie and send the

      // response back to the user

      res.cookie("token", token);
      console.log(token);
      res.json({message:"User Logged In", data: user});
    } else throw new Error("Password Is not correct");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("User Logged Out");
});

module.exports = authRouter;
