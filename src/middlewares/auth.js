const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
  //Read the token from the req cookies
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).json("Invalid Token");
    }
    const decodeObj = await jwt.verify(token, "Dekdbjcpajsj!5354");
    //Validate the token

    const { _id } = decodeObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
