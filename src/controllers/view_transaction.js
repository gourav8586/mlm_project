const { View_transaction } = require("../services/view_transaction");

exports.View_transation_page = async (req, res) => {
  let data = await View_transaction(req, res);
  if (data.success) {
    res.render("viewtransaction", { data: data.data });
  } else {
    console.log(data.Message);
  }
};
