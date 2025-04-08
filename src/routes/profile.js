const express = require("express");

const jwt = require("jsonwebtoken");
const {userAuth}=require("../middlewares/auth.js")
const User = require("../models/user");
const {validateProfileEditData}=require("../utils/validations");
const profileRouter=express.Router();
profileRouter.use(express.json());
profileRouter.get("/profile",userAuth, async (req, res) => {
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

  profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
    if(!validateProfileEditData(req)){
      return res.status(400).send({message:"Invalid request"});
    }
    const loggedInUser=req.user;
    console.log(loggedInUser);
    
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        loggedInUser[key] = req.body[key];
      }
    });
  res.send("Profile Updated Successfully");

 }catch(err)
 {
  res.status(400).send("Invalid request");
 } 
})
  module.exports=profileRouter;
