let Product = require("../model/product");

exports.del_product = async (req, res) => {
  try {
    let _id = req.body._id;
    console.log(_id);

    let data = await Product.findByIdAndDelete({ _id: _id });
    console.log("Product deleted");

    if (data) {
      return {
        data: data,
        message: "Product deleted",
        success: true,
        status: 200,
      };
    } else {
      return {
        data: [],
        message: "Product can't deleted",
        success: false,
        status: 400,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
