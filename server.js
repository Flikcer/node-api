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

//get products from db in json
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    alert(error.message);
    res.status(500).json({ message: error.message });
  }
});

//update a product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    //no product found to update
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find product with id ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
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
