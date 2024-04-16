let auth = require("../../auth/adminauth");
let express = require("express");
const { User_viewProduct_frm } = require("../controllers/user_view_product");
let router = express.Router();
router.get("/user_view_product", auth, User_viewProduct_frm);

module.exports = router;
