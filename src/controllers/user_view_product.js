const { view_products } = require("../services/view_product");

exports.User_viewProduct_frm = async (req, res) => {
  let data = await view_products(req, res);
  res.render("userviewproduct", { data: data.data });
};
