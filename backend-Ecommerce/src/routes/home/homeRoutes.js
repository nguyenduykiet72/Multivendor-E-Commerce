const homeController = require("../../controllers/home/homeControllers");
const router = require("express").Router();

router.get("/home/get-category", homeController.get_category);
router.get("/home/get-products", homeController.get_products);
router.get("/home/price-range-latest-product", homeController.price_range_product);
router.get("/home/query-products", homeController.query_products);
router.get("/home/product-detail/:slug", homeController.product_detail);
router.post("/home/customer/submit-review", homeController.customer_submit_review);
router.get("/home/customer/get-reviews/:productId", homeController.get_reviews);

module.exports = router;
