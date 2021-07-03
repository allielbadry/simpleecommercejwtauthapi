const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/signup", userController.createUser);
router.post("/signin", userController.userLogin);

module.exports = router;
