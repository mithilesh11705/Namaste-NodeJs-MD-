const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const user = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequest.js");

//Get all the pending connection Requests
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedUserId,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data Fetched Successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

//All connections

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedUserId, status: "accepted" },
        { toUserId: loggedUserId, status: "accepted" },
      ],
    }).populate("fromUserId", ["firstName", "lastName"]);

    const data = connectionRequest.map((request) => {
      return request.fromUserId._id.toString() === loggedUserId.toString()
        ? request.toUserId
        : request.fromUserId;
    });

    res.json({
      message: "Data Fetched Successfully",
      data,
    });
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

module.exports = userRouter;
