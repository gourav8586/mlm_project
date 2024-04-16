let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");
const { blockUnblock_frm } = require("../controllers/user_status");

router.post("/block_user", auth, blockUnblock_frm);

module.exports = router;
