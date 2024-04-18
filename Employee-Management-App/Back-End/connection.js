const mongoose = require("mongoose");

// mongodb connection function
const ConnectionDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gowshikacsbs2020:6siIhbrd0bgMqJdL@cluster0.kpftux4.mongodb.net/"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};
module.exports = ConnectionDB;
