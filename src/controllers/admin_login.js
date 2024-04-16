let { adminlogin } = require("../services/admin_login");

exports.login_frm = async (req, res) => {
  res.render("adminlogin");
};

exports.dashboard = async (req, res) => {
  res.render("dashboard", { message: "" });
};

exports.login_page = async (req, res) => {
  let log = await adminlogin(req, res);
  if (log.success) {
    res.redirect("user_dashboard");
  } else if (log.success) {
    res.status(log.status).send({
      message: log.message,
      status: log.status,
      success: log.success,
      data: [],
    });
  } else {
    res.status(log.status).send({
      message: log.message,
      status: log.status,
      success: log.success,
      data: [],
    });
  }
};
