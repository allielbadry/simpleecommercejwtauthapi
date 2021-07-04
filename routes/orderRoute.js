const { productById } = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const passport = require("passport");
const router = require("express").Router();

router.post(
  "/orderfinal",
  passport.authenticate("user", { session: false }),
  orderController.createOrder
);
router.get(
  "/orders",
  passport.authenticate("user", { session: false }),
  orderController.getOrders
);
router.get("/totalsale", orderController.totalShop);

module.exports = router;
