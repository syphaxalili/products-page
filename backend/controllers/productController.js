const Product = require("../models/productModel");
const mongoose = require("mongoose");

// Some utilities
const ERROR_MESSAGES = {
  NOT_FOUND: "404 - Product not found",
  INVALID_ID: "404 - Product ID not valid",
  VALIDATION_ERROR: "Please fill all the fields.",
};

const checkEmptyFields = (fields) => {
  const emptyFields = Object.keys(fields).filter(
    (key) =>
      key !== "available" && (fields[key] === undefined || fields[key] === "")
  );
  return emptyFields;
};

// GET all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// GET a single product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: ERROR_MESSAGES.INVALID_ID });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// POST a new product
const createProduct = async (req, res) => {
  const newProductObject = req.body;

  // Returns an array of empty fields [Used for form validation]
  const emptyFields = checkEmptyFields(newProductObject);

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: ERROR_MESSAGES.VALIDATION_ERROR, emptyFields });
  }

  try {
    const product = await Product.create({
      ...newProductObject,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const newProductValueObject = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: ERROR_MESSAGES.INVALID_ID });
  }

  // Returns an array of empty fields [Used for form validation]
  const emptyFields = checkEmptyFields(newProductValueObject);

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: ERROR_MESSAGES.VALIDATION_ERROR, emptyFields });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { ...newProductValueObject },
      { new: true } // This ensures the updated product is returned not the old one
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// DELETE a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete({ _id: id });

    if (!deletedProduct) {
      return res.status(404).json({ error: ERROR_MESSAGES.NOT_FOUND });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
