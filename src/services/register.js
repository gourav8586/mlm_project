let user = require("../model/user");
let Transaction = require("../model/transaction");
let bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    let name = req.body.name;
    let userId = req.body.userId;
    let email = req.body.email;
    let password = req.body.pass;
    let mobileNo = req.body.mobile;
    let dateOfBirth = req.body.dateOfBirth;
    let gender = req.body.gender;
    let address = req.body.address;
    let state = req.body.state;
    let city = req.body.city;
    let wallet = req.body.wallet;
    let role = req.body.role;
    let mychild = 0;

    // Check if password is provided and not empty
    if (!password || password.trim() === "") {
      return {
        success: false,
        status: 400,
        message: "Password is required",
      };
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let data = await user.findOne({ email });

    if (!data) {
      let rec = new user({
        name: name,
        mobile: mobileNo,
        email: email,
        pass: hashedPassword,
        dateOfBirth: dateOfBirth,
        gender: gender,
        address: address,
        state: state,
        wallet: wallet,
        role:"Admin",
        city: city,
        mychild: 0,
      });

      let saved_data = await rec.save();

      let message_type = "Debited";
      let reason_message = "First money deposit";

      if (saved_data) {
        let newTransaction = new Transaction({
          amount: wallet,
          type: message_type,
          reason: reason_message,
          User_Id: saved_data.userId,
        });

        let transaction = await newTransaction.save();
        console.log("transaction--", transaction);

        if (transaction) {
          return {
            message: "data saved",
            data: saved_data,
            transaction,
            success: true,
          };
        } else {
          return {
            success: false,
            message: "Transaction failed",
            status: 500,
          };
        }
      } else {
        return {
          success: false,
          message: "User cannot be added",
          status: 500,
        };
      }
    } else {
      console.log("User Found");
      return {
        success: false,
        message: "User already found",
        status: 400,
      };
    }
  } catch (error) {
    console.error("Error in register API:", error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
};
