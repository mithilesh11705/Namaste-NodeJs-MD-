const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/user");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth.js")



app.use(express.json()); //json middelware
const { validateSignup } = require("./utils/validations");

app.use(cookieParser());
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
  //Validation Of data
  try {
    validateSignup(req);

    //Encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

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

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  } 
});

//Update data of the User
app.patch("/update/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "skills",
      "photourl",
      "about",
      "gender",
      "age",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User updated Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // if (!validate.isEmail(email)) return res.status(400).send("Invalid Email");

    const user = await User.findOne({ email: email });
    if (!user) throw new ERROR("Invalid Credentials");

    const isPassword = await bcrypt.compare(password, user.password);

    if (isPassword) {
      //Create a JWT Token
     const token=await user.getJwt();
      //Add the token to cookie and send the

      // response back to the user

      res.cookie("token", token);
      console.log(token);
      res.send("Login Successfull");
    } else throw new Error("Password Is not correct");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

app.get("/profile",userAuth, async (req, res) => {
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
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
  try{

    const user=req.user;
    console.log("Sending a Connection Request");
    res.send("Connection Request Sent");
}catch(err){
  res.status(400).send("Something went wrong");
}});


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
