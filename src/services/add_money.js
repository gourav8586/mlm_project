let user = require("../model/user");
let Transaction = require("../model/transaction");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

exports.add_money = async (req, res) => {
  let amount = parseInt(req.body.wallet);

  let token = req.cookies.jwt;
  console.log(amount);

  let user2 = await user.findOne({ auth_key: token });

  let data = await user.findOneAndUpdate(
    { auth_key: token },
    { wallet: user2.wallet + amount }
  );

  let message_type = "Debited";
  let reason_message = "Money Added";

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
      message: "Money debited",
      success: true,
      status: 200,
    };
  } else {
    return {
      data: [],
      message: "add money failed",
      success: false,
      status: 300,
    };
  }
};
