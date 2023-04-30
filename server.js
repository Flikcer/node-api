const express = require("express");
const app = express();
const mongoose = require("mongoose");

//routes

app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});

mongoose
  .connect(
    "mongodb+srv://admin:password1224@cluster0.ujbgaqw.mongodb.net/node-api?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongo");
    app.listen(3000, () => {
      console.log("Node API running");
    });
  })
  .catch(() => console.log(error));
