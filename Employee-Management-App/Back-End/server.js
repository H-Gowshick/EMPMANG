// 6siIhbrd0bgMqJdL

const express = require("express");
const bodyParser = require("body-parser");
const ConnectionDB = require("./connection.js");
const userRoute = require("./routes/userRoute");
const employeeRoute = require("./routes/employeeRoutes");
const cors = require("cors"); // Import cors package

// env configuration
require("dotenv").config();

// initialize port
const PORT = process.env.PORT || 8000;

// declare express as app
const app = express();

// connect MongoDb
ConnectionDB();

// cors
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// user route
app.use("/api/user", userRoute);

// employee route
app.use("/api", employeeRoute);

// port listen
app.listen(PORT, (error) => {
  if (error) {
    console.log(`server connection error in port ${PORT}`);
  }
  console.log(`server successfully connected in the port ${PORT}`);
});
