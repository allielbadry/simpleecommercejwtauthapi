const productController = require("../controllers/productController");
const { categoryById } = require("../controllers/categoryController");
const router = require("express").Router();

router.post("/:categoryId/newproduct", productController.craeteProduct);
router.put("/product/:productId", productController.updateProduct);
router.delete("/product/:productId", productController.deleteProduct);
router.get("/", productController.getProduct);
router.get("/:categoryId/product", productController.getProductByCategory);
router.get("/:productId", productController.getSingleProduct);
router.get("/product/count", productController.productCount);
router.get("/product/featuer", productController.featuredProduct);

router.param("productId", productController.productById);
router.param("categoryId", categoryById);

module.exports = router;
