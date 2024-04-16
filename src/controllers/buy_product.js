const { buy_product, product_wallet } = require("../services/buy_product");

// exports.buy_Product = async (req, res) => {
//   let data = await buy_product(req, res);
//   res.render("buyproduct", { data: [data.data] });
// };

exports.order_Product = async (req, res) => {
  let data = await product_wallet(req, res);
  if (data.success) {
    res.render("buyproduct", { message: "", data: [data.data] });
  } else {
    console.log(data.message);
  }
};
