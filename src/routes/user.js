const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const User = require("../models/user.js");
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

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    //Users  should see all the cards except the ones they have already connected with and his  own profile
    //ignored people
    //already sent the connection request
    //already accepted the connection request

    const loggedUserId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    limit=limit>50?50:limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: loggedUserId,
        },
        {
          toUserId: loggedUserId,
        },
      ],
    }).select("fromUserId toUserId");

    const hideuserFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideuserFromFeed.add(req.fromUserId.toString());
      hideuserFromFeed.add(req.toUserId);
    });

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideuserFromFeed) } },
        { _id: { $ne: loggedUserId } },
      ],
    })
      .select("fromuserId firstName lastName")
      .skip((page - 1) * limit)
      .limit(limit);

    res.send(user);
  } catch (err) {
    res.status(400).json("Something went wrong" + err.message);
  }
});

module.exports = userRouter;
