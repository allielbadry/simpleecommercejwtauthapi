const { productById } = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const passport = require("passport");
const router = require("express").Router();

router.post(
  "/:productId/order",
  passport.authenticate("user", { session: false }),
  orderController.createOrder
);

router.use("productId", productById);

module.exports = router;
