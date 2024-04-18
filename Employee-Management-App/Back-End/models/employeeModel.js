const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  adminUsername: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: ["hr", "manager", "sales"],
    default: "hr",
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: [String],
    enum: ["MCA", "BCA", "BSC"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
