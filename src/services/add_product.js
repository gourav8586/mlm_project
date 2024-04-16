let Product = require("../model/product");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

exports.addProduct = async (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let category = req.body.category;
  let quantity = req.body.quantity;

  let data = await Product.findOne({ name });
  console.log("product_name....", +data);

  if (!data) {
    let newProduct = new Product({
      name: name,
      description: description,
      price: price,
      category: category,
      quantity: quantity,
    });

    let savedProduct = await newProduct.save();
    if (savedProduct) {
      return {
        message: "Product saved successfully",
        data: savedProduct,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: "Failed to save product",
        data: [],
        success: false,
        status: 500,
      };
    }
  } else {
    console.log("Product found");
    return {
      status: 500,
      success: false,
      message: "Product already have",
    };
  }
};
