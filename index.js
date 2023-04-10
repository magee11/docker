const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
require("dotenv").config();
const User = require("./models/User");

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/docker-mongo")
  .then(() => {
    console.log("====================================");
    console.log("Database connection done");
    console.log("====================================");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/create", async (req, res) => {
  const user = req.body;
  const newuser = new User(user);
  await newuser.save();
  res.send(newuser);
});

app.get("/alluser", async (req, res) => {
  const allusers = await User.find({});
  res.send(allusers);
});

app.listen(port, () => {
  console.log(`Backed is Listening on ${port}`);
});
