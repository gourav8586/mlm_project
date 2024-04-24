let { register } = require("../services/register");

exports.register_frm = async (req, res) => {
  res.render("register");
};

exports.register_page = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the entire request body
    let regis = await register(req, res);
    if (regis.success) {
      res.render("adminlogin");
    } else {
      res.status(regis.status).send({
        message: regis.message,
        status: regis.status,
        success: regis.success,
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in register_page:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
