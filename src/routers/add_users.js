const { adduser_page, addUsers_frm } = require("../controllers/add_user");
let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");

router.get("/addusers", auth, addUsers_frm);
router.post("/add_users", adduser_page);

module.exports = router;
