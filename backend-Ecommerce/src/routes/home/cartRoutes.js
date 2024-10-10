const cartController = require("../../controllers/home/cartController");
const router = require("express").Router();

router.post("/home/product/add-to-cart", cartController.addToCart);

router.get("/home/product/get-cart-product/:userId", cartController.get_cart_products);

router.delete("/home/product/delete-cart-product/:cartId", cartController.delete_cart_product);

router.put("/home/product/quantity-increase/:cartId", cartController.increase_cart_product);

router.put("/home/product/quantity-decrease/:cartId", cartController.decrease_cart_product);

router.post("/home/product/add-to-wishlist", cartController.add_wishlist);

router.get("/home/product/get-wishlist-products/:userId", cartController.get_wishlist_products);

router.delete("/home/product/remove-wishlist-product/:wishlistId", cartController.remove_wishlist_product);

module.exports = router;
