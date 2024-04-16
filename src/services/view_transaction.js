let Transaction = require("../model/transaction");

exports.View_transaction = async (req, res) => {
  let data = await Transaction.find();
  if (data) {
    return {
      data: data,
      Message: "All Transaction",
      success: true,
      status: 200,
    };
  } else {
    return {
        data: [],
        Message: "Transaction Not Found",
        success: false,
        status: 300,
      };
  }
};
