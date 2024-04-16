let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");
const { add_money_frm, add_money } = require("../controllers/add_money");

router.get("/addmoney", auth, add_money_frm);
router.post("/add_money", auth, add_money);

module.exports = router;
