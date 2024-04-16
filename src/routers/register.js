let { register_frm, register_page } = require("../controllers/register");
let express = require("express");
let router = express.Router();

router.get("/register", register_frm);
router.post("/registerpage", register_page);

module.exports = router;
