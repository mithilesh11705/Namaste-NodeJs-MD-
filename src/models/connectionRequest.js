const mongoose = require("mongoose");
const User = require("./user.js");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //refernce to the User model
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{Value} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.index({ fromUserID: 1, toUserId: 1 });
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  //Cehck if the from and to userId are same
  if (
    connectionRequest.fromUserId.toString() ==
    connectionRequest.toUserId.toString()
  ) {
    throw new Error("You can't send a connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
