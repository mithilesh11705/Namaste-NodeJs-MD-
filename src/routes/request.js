const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const { userAuth } = require("../middlewares/auth.js");

const ConnectionRequest = require("../models/connectionRequest.js");
const requestRouter = express.Router();
requestRouter.use(express.json());

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignore", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User Not found" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request  Already Exists" });
      }
      const data = await connectionRequest.save();

      res.json({
        message: "Connection Request Sent",
        data,
      });
    } catch (err) {
      res.status(400).send("Something went wrong" + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const requestId = req.params.requestId;
      const loggedUser = req.user;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid Status",
        });
      }

      const connectionRequest = await ConnectionRequest.findById({
        _id: requestId,
        fromUserId: loggedUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(404).json({
          message: "Connection Request Not Found",
        });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({
        message: `Connection Request ${status}`,
        data,
      });
    } catch (err) {
      res.status(400).send("Something went wrong" + err.message);
    }
  }
);
module.exports = requestRouter;
