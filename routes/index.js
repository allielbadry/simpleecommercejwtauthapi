const productRoute = require("./productRoutes");
const categoryRoute = require("./categoryRoute");
const router = require("express").Router();

router.use("/", categoryRoute);
router.use("/", productRoute);

module.exports = router;
