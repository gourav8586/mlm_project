let { add_money } = require("../services/add_money");

exports.add_money_frm = async (req, res) => {
  res.render("addmoney");
};

exports.add_money = async (req, res) => {
  let data = await add_money(req, res);
  if (data.success) {
    res.render("dashboard", { message: "", data: data.data });
  } else {
    console.log(data.message);
  }
};
