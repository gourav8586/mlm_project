let Product = require("../model/product");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

exports.update_product_view = async (req, res) => {
  let _id = req.query._id;
  console.log(_id);

  let data = await Product.findById({ _id: _id });

  if (data) {
    return {
      data: data,
      message: "Product find",
      status: 200,
      success: true,
    };
  } else {
    return {
      data: [],
      message: "Product can't find",
      status: 300,
      success: false,
    };
  }
};

exports.update_product = async (req, res) => {
  try {
    let name = req.body.name;
    let _id = req.body._id;
    let description = req.body.description;
    let price = req.body.price;
    let category = req.body.category;
    let quantity = req.body.quantity;

    console.log(_id);

    let data = await Product.findByIdAndUpdate(
      { _id: _id },
      {
        name: name,
        description: description,
        price: price,
        category: category,
        quantity: quantity,
      }
    );

    console.log("Product id:--", data._id);
    if (data) {
      return {
        data: data,
        message: "Product Updated",
        success: true,
        status: 200,
      };
    } else {
      return {
        data: [],
        message: "Product can't updated",
        success: false,
        status: 300,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
