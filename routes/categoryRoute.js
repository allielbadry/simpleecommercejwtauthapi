const categoryController = require("../controllers/categoryController");
const router = require("express").Router();
const passport = require("passport");

router.get(
  "/category",
  passport.authenticate("user", { session: false }),
  categoryController.getCategory
);
router.post("/newcategory", categoryController.createCategory);
router.put("/:categoryId", categoryController.updateCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

router.param("categoryId", categoryController.categoryById);

module.exports = router;
