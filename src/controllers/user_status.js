const { user_blocked } = require("../services/user_status");


exports.blockUnblock_frm = async (req, res) => {
    let user_block = await user_blocked(req, res);
    if (user_block.success) {
      res.render("dashboard", { message: "" });
      console.log(user_block);
    }
  };