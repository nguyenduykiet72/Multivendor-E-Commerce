const productController = require("../../controllers/dashboard/productControllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/product-add", authMiddleware, productController.add_product);
router.get("/products-get", authMiddleware, productController.get_products);
router.get("/product-get/:productId", authMiddleware, productController.get_product);
router.post("/product-update", authMiddleware, productController.update_product);
router.post("/product-image-update", authMiddleware, productController.update_product_image);

module.exports = router;
