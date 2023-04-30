const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel");

//middleware so it can understand JSON
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    alert(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
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
