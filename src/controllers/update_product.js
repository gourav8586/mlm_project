const {
  update_product_view,
  update_product,
} = require("../services/update_product");

exports.view_product_details = async (req, res) => {
  let data = await update_product_view(req, res);
  if (data.success) {
    res.render("updateproduct", { data: data.data });
  } else {
    console.log(data.message);
  }
};

exports.update_product_details = async (req, res) => {
  let data = await update_product(req, res);
  if (data.success) {
    res.render("viewproduct", { data: [data.data] });
  } else {
    console.log(data.message);
  }
};
