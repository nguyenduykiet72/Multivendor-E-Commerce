const categoryController = require("../../controllers/dashboard/category.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/category-add", authMiddleware, categoryController.add_category);
router.get("/category-get", authMiddleware, categoryController.get_category);
router.put("/category-update/:id", authMiddleware, categoryController.update_category);
router.delete("/category/delete/:id", categoryController.delete_category);

module.exports = router;
