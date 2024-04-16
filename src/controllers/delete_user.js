let { del } = require("../services/delete_users");

exports.delete_frm = async (req, res) => {
    let dele = await del(req, res);
    if (dele.success) {
      res.render("dashboard", { message: "" });
    } else {
      res.send({
        status: 400,
        data: [],
        success: false,
      });
    }
  };
  