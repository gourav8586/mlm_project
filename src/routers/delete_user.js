let { delete_frm } = require("../controllers/delete_user");
let express = require("express");
let router = express.Router();

let auth = require("../../auth/adminauth");

router.post("/delete", auth, delete_frm);
module.exports = router;
