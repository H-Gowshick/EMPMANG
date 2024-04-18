const express = require("express");
const router = express.Router();
const Employee = require("../models/employeeModel");
const multer = require("multer");

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/employees", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      designation,
      gender,
      course,
      adminUsername,
    } = req.body;

    // Check for required fields
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !designation ||
      !gender ||
      !course ||
      !adminUsername
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate phone number length
    if (phoneNumber.length !== 10) {
      return res
        .status(400)
        .json({ message: "Phone number must be 10 digits long" });
    }

    // Validate phone number as numeric
    if (isNaN(phoneNumber)) {
      return res.status(400).json({ message: "Phone number must be numeric" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check for duplicate email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if uploaded file is a jpg or png
    const allowedFileTypes = ["image/jpeg", "image/png"];
    if (!allowedFileTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({ message: "Only JPG/PNG files are allowed" });
    }

    // Construct image URL from the file buffer
    const imageUrl = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const newEmployee = new Employee({
      name,
      email,
      phoneNumber,
      designation,
      gender,
      course,
      imageUrl,
      adminUsername,
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/employees/getlist", async (req, res) => {
  try {
    const { adminUsername } = req.query;

    if (!adminUsername) {
      return res
        .status(400)
        .json({ message: "adminUsername parameter is required" });
    }

    // Fetch employee data based on adminUsername
    const employeeData = await Employee.find({ adminUsername });

    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update an existing employee
router.put("/employees/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber, designation, gender, course } = req.body;

  try {
    const updatedFields = {
      name,
      email,
      phoneNumber,
      designation,
      gender,
      course,
    };

    // Check if image was uploaded
    if (req.file) {
      updatedFields.imageUrl = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true } // Return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee details updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating employee details" });
  }
});

router.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the employee by ID and delete it
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Failed to delete employee" });
  }
});

module.exports = router;
