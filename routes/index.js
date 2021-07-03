const productRoute = require("./productRoutes");
const categoryRoute = require("./categoryRoute");
const userRoute = require("./userRoute");
const router = require("express").Router();

router.use("/", categoryRoute);
router.use("/", productRoute);
router.use("/", userRoute);

module.exports = router;
