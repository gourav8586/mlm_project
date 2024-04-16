let user = require("../model/user");
let Transaction = require("../model/transaction");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

exports.withdrawal_money = async (req, res) => {
  let amount = parseInt(req.body.wallet);
  let token = req.cookies.jwt;

  let user2 = await user.findOne({ auth_key: token });

  if (!user2.wallet == "0") {
    let data = await user.findOneAndUpdate(
      { auth_key: token },
      { wallet: user2.wallet - amount }
    );

    let message_type = "Credited";
    let reason_message = "Money Withdraw";

    let newTransaction = new Transaction({
      amount: amount,
      type: message_type,
      reason: reason_message,
      User_Id: user2.userId,
    });

    let transaction = newTransaction.save();

    if (transaction) {
      return {
        data: data,
        message: "Money Credited",
        success: true,
        status: 200,
      };
    } else {
      return {
        data: [],
        message: "Withdraw money failed",
        success: false,
        status: 300,
      };
    }
  } else {
    return {
      data: [],
      message: "insufficient Fund for Withdraw money",
      success: false,
      status: 300,
    };
  }
};
