let { view } = require("../services/view_users");


exports.viewuser_frm = async (req, res) => {
    let reg = await view(req, res);
    res.render("viewuser", { data: reg.data });
  };