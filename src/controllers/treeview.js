const { view_data } = require("../services/treeview");


exports.viewuser_data_frm = async (req, res) => {
    let reg = await view_data(req, res);
    res.render("treeview", { users: reg.data });
  };