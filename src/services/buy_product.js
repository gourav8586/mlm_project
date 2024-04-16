let Product = require("../model/product");
let user = require("../model/user");
let Transaction = require("../model/transaction");

exports.product_wallet = async (req, res) => {
  try {
    let name = req.body.name;
    let wallet = req.body.wallet;
    let token = req.cookies.jwt;

    console.log("Product Name--" + name);

    let product_data = await Product.findOne({ name: name });

    if (!product_data.quantity == "0") {
      let product_details = await Product.findOne({
        name: name,
      });

      let product_quantity = product_details.quantity - 1;

      let data = await Product.findOneAndUpdate(
        { name: name },
        { quantity: product_quantity }
      );

      let user_details = await user.findOne({ auth_key: token });
      if (!user_details.wallet == "0") {
        let Login_user = await user.findOne({ auth_key: token });
        let User_wallet = Login_user.wallet;
        let product_price = product_details.price;

        let result = User_wallet - product_price;
        let data1 = await user.findOneAndUpdate(
          { auth_key: token },
          { wallet: result }
        );

        let message_type = "Credited";
        let reason_message = "Product Buy";

        let newTransaction = new Transaction({
          amount: product_price,
          type: message_type,
          reason: reason_message,
          User_Id: Login_user.userId,
        });

        let transaction = newTransaction.save();

        if (transaction) {
          return {
            data: data1,
            data,
            message: "amount credited successfully....",
            success: true,
            status: 200,
          };
        } else {
          return {
            data: [],
            message: "amount not credited...",
            success: false,
            status: 300,
          };
        }
      } else {
        return {
          data: [],
          message: "insufficient balance",
          success: false,
          status: 300,
        };
      }
    } else {
      return {
        data: [],
        message: "Out of Stock",
        success: false,
        status: 300,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
