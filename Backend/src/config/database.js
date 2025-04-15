const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mithileshdeore7:iD44NyRfhoHdyazx@mdcluster.skeg8d8.mongodb.net/devTinder"
  );
};


module.exports=connectDB;

