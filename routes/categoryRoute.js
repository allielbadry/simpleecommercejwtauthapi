const categoryController = require("../controllers/categoryController");
const router = require("express").Router();

router.get("/category", categoryController.getCategory);
router.post("/newcategory", categoryController.createCategory);
router.put("/:categoryId", categoryController.updateCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

router.param("categoryId", categoryController.categoryById);

module.exports = router;
