const {
  addProduct_frm,
  addProduct_page,
} = require("../controllers/add_product");
let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");

router.get("/addproduct", auth, addProduct_frm);
router.post("/add_product", auth, addProduct_page);

module.exports = router;
