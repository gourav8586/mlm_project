let { withdrawal_money } = require("../services/withdrawal");

exports.withdrawal_money_frm = async (req, res) => {
  res.render("withdrawalmoney");
};

exports.withdrawal_money_page = async (req, res) => {
  let data = await withdrawal_money(req, res);
  if (data.success) {
    res.render("dashboard", { message: "" });
  } else {
    console.log(data.message);
  }
};
