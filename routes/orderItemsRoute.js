const orderItemController = require("../controllers/orderItemController");
const { productById } = require("../controllers/productController");
const passport = require("passport");
const router = require("express").Router();

router.post(
  "/:productId/order",
  passport.authenticate("user", { session: false }),
  orderItemController.createOrder
);

router.use("productId", productById);

module.exports = router;
