const productRoute = require("./productRoutes");
const categoryRoute = require("./categoryRoute");
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const orderItemRoute = require("./orderItemsRoute");
const router = require("express").Router();

router.use("/", orderRoute);
router.use("/", categoryRoute);
router.use("/", productRoute);
router.use("/", userRoute);
router.use("/", orderItemRoute);

module.exports = router;
