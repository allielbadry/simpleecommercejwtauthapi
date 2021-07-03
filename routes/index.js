const productRoute = require("./productRoutes");
const router = require("express").Router();

router.use("/", productRoute);

module.exports = router;
