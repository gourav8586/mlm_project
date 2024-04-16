let { addProduct } = require("../services/add_product");

exports.addProduct_frm = async (req, res) => {
  res.render("addproduct");
};

exports.addProduct_page = async (req, res) => {
  let data = await addProduct(req, res);
  if (data.success) {
    res.render("addproduct", { message: "" });
  } else {
    res.status(data.status).send({
      message: data.message,
      status: data.status,
      success: data.success,
    });
  }
};
