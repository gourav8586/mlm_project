let express = require("express");
let router = express.Router();
let auth = require("../../auth/adminauth");
const { buy_Product, order_Product } = require("../controllers/buy_product");

// router.post("/buyproduct", auth, buy_Product);
router.post("/order_product", auth, order_Product);

module.exports = router;
