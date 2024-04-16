let { viewuser_frm } = require("../controllers/view_users");
let express = require("express");
let router = express.Router();

let auth = require("../../auth/adminauth");

router.get("/view", auth, viewuser_frm);

module.exports = router;
