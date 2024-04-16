const { del_product } = require("../services/delete_product");

exports.delete_product = async (req, res) => {
  let dele = await del_product(req, res);
  if (dele.success) {
    res.render("dashboard", { message: "" });
  } else {
    console.log(dele.message);
  }
};
