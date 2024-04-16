const { view_products } = require("../services/view_product");

exports.viewProduct_frm = async (req, res) => {
  let data = await view_products(req, res);
  res.render("viewproduct", { data: data.data });
};
