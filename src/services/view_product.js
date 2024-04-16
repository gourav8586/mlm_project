let Product = require("../model/product");

exports.view_products = async (req, res) => {
  let data = await Product.find();
  if (data) {
    return {
      data: data,
      success: true,
      status: 200,
      message: "All product details",
    };
  } else {
    return {
      data: [],
      success: false,
      status: 300,
      message: "failed show to products details",
    };
  }
};
