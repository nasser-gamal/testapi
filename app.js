const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// const postRoutes = require("./routes/post");
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");
const User = require("./models/user");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster2.vw0ekbe.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST ,PUT, PATCH ,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// app.use("/post", postRoutes);
app.use("/auth", userRoutes);
app.use("/todo", todoRoutes);


mongoose
  .connect(uri)
  .then((result) => {
    console.log("connected");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
