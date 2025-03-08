const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config(); // Load environment variables

const url = process.env.MONGODB_URL; 
const port = process.env.PORT || 3000; //Get URL from .env


mongoose.connect(url);

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/noteRoutes");

app.use("/auth", authRoutes);

app.use("/admin", adminRoutes);
app.use("/", noteRoutes);

app.listen(port , () => {
  console.log("Server started  ");
});
