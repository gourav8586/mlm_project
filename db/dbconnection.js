const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/MLM");
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database not connected", error);
  }
};
