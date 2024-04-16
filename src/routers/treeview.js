let express = require("express");
let router = express.Router();

let auth = require("../../auth/adminauth");
const { viewuser_data_frm } = require("../controllers/treeview");

router.get("/view_user", auth, viewuser_data_frm);

module.exports = router;
