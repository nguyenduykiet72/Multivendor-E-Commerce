const homeController = require("../../controllers/home/homeControllers");
const router = require("express").Router();

router.get("/home/get-category", homeController.get_category);
router.get("/home/get-products", homeController.get_products);

module.exports = router;
