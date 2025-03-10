const cartModel = require("../../models/cart.model");
const wishlistModel = require("../../models/wishlist.model");
const { responseReturn } = require("../../utils/response");
// const {
//   mongo: { ObjectId },
// } = require("mongoose");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const product = await cartModel.findOne({
      $and: [
        { productId: { $eq: productId } },
        {
          userId: {
            $eq: userId,
          },
        },
      ],
    });

    if (product) {
      responseReturn(res, 404, { error: "Product Already Added To Cart" });
    } else {
      const product = await cartModel.create({ userId, productId, quantity });
      responseReturn(res, 201, {
        message: "Product Added To Cart Successfully",
        product,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const get_cart_products = async (req, res) => {
  const conditions = 5;
  const { userId } = req.params;
  try {
    const cartProduct = await cartModel.aggregate([
      {
        $match: {
          userId: {
            // $eq: new ObjectId(userId),
            $eq: mongoose.Types.ObjectId.createFromHexString(userId),
          },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "products", // ten fields
        },
      },
    ]);
    let buy_product_item = 0;
    let calculatePrice = 0;
    let cart_product_count = 0;
    const outOfStockProduct = cartProduct.filter(
      (p) => p.products[0].quantity < p.quantity
    );
    for (let i = 0; i < outOfStockProduct.length; i++) {
      cart_product_count = cart_product_count + outOfStockProduct[i].quantity;
    }
    const stockProduct = cartProduct.filter(
      (p) => p.products[0].quantity >= p.quantity
    );
    for (let i = 0; i < stockProduct.length; i++) {
      const { quantity } = stockProduct[i];
      cart_product_count = buy_product_item + quantity;
      buy_product_item = buy_product_item + quantity;
      const { price, discount } = stockProduct[i].products[0];
      if (discount !== 0) {
        calculatePrice =
          calculatePrice +
          quantity * (price - Math.floor((price * discount) / 100));
      } else {
        calculatePrice = calculatePrice + quantity * price;
      }
    }
    let p = [];
    let unique = [
      ...new Set(stockProduct.map((p) => p.products[0].sellerId.toString())),
    ];
    for (let i = 0; i < unique.length; i++) {
      let price = 0;
      for (let j = 0; j < stockProduct.length; j++) {
        const tempProduct = stockProduct[j].products[0];
        if (unique[i] === tempProduct.sellerId.toString()) {
          let cost = 0;
          if (tempProduct.discount !== 0) {
            cost =
              tempProduct.price -
              Math.floor((tempProduct.price * tempProduct.discount) / 100);
            console.log(cost);
          } else {
            cost = tempProduct.price;
          }
          cost = cost - Math.floor((cost * conditions) / 100);
          price = price + cost * stockProduct[j].quantity;
          p[i] = {
            sellerId: unique[i],
            shopName: tempProduct.shopName,
            price,
            products: p[i]
              ? [
                  ...p[i].products,
                  {
                    _id: stockProduct[j]._id,
                    quantity: stockProduct[j].quantity,
                    productInfo: tempProduct,
                  },
                ]
              : [
                  {
                    _id: stockProduct[j]._id,
                    quantity: stockProduct[j].quantity,
                    productInfo: tempProduct,
                  },
                ],
          };
        }
      }
    }

    responseReturn(res, 200, {
      cart_products: p,
      price: calculatePrice,
      cart_product_count,
      shipping_fee: 20000 * p.length,
      outOfStockProduct,
      buy_product_item,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const delete_cart_product = async (req, res) => {
  const { cartId } = req.params;
  try {
    await cartModel.findByIdAndDelete(cartId);
    responseReturn(res, 200, {
      message: "Product Deleted From Cart Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const increase_cart_product = async (req, res) => {
  const { cartId } = req.params;
  try {
    const product = await cartModel.findById(cartId);
    const { quantity } = product;
    await cartModel.findByIdAndUpdate(cartId, { quantity: quantity + 1 });
    responseReturn(res, 200, {
      message: "Product Quantity Increased Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const decrease_cart_product = async (req, res) => {
  const { cartId } = req.params;
  try {
    const product = await cartModel.findById(cartId);
    const { quantity } = product;
    await cartModel.findByIdAndUpdate(cartId, { quantity: quantity - 1 });
    responseReturn(res, 200, {
      message: "Product Quantity Decreased Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const add_wishlist = async (req, res) => {
  const { slug } = req.body;
  try {
    const product = await wishlistModel.findOne({ slug });
    if (product) {
      responseReturn(res, 404, {
        error: "This Product Already Added To Wishlist",
      });
    } else {
      await wishlistModel.create(req.body);
      responseReturn(res, 201, {
        message: "Product Added To Wishlist Successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const get_wishlist_products = async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await wishlistModel.find({ userId });
    responseReturn(res, 200, { wishlistCount: wishlist.length, wishlist });
  } catch (error) {
    console.log(error.message);
  }
};

const remove_wishlist_product = async (req, res) => {
  const { wishlistId } = req.params;
  try {
    const wishlist = await wishlistModel.findByIdAndDelete(wishlistId);
    responseReturn(res, 200, {
      message: "Product Removed From Wishlist Successfully",
      wishlistId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addToCart,
  get_cart_products,
  delete_cart_product,
  increase_cart_product,
  decrease_cart_product,
  add_wishlist,
  get_wishlist_products,
  remove_wishlist_product,
};
