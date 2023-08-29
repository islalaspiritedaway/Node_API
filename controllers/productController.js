const Product = require("../models/productModels");
const asyncHandler = require("express-async-handler");

// get all products
const getProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

// get a single product
const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

// create a product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});
// update a product
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404);
      throw new Error(`can not find a product with ID ${id}`);
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});
// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404);
      throw new Error(`can not find a product with ID ${id}`);
    }
    res.status(200).json("deleted");
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
