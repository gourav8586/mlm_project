const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.view_data = async (req, res) => {
  try {
    // Find all users and sort them by direction
    const users = await UserModel.find().sort({ direction: 1 }); // Assuming direction values are strings like "left" and "right"

    // Process users
    const userNames = users.map((user) => user.name);

    // Send response
    return {
      message: "User view",
      data: userNames,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
