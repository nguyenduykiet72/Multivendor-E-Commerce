const categoryModel = require("../../models/category.model");
const productModel = require("../../models/product.model");
const reviewModel = require("../../models/review.model");
const { responseReturn } = require("../../utils/response");
const formateProduct = require("../../utils/formate");
const queryProducts = require("../../utils/queryProducts");
const moment = require("moment");
const mongoose = require("mongoose");

const get_category = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    responseReturn(res, 200, {
      categories,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const get_products = async (req, res) => {
  try {
    const products = await productModel.find({}).limit(12).sort({ createdAt: -1 });
    const allProduct1 = await productModel.find({}).limit(9).sort({ createdAt: -1 });
    const latestProduct = formateProduct(allProduct1);

    const allProduct2 = await productModel.find({}).limit(9).sort({ rating: -1 });
    const topRatedProduct = formateProduct(allProduct2);

    const allProduct3 = await productModel.find({}).limit(9).sort({ discount: -1 });
    const discountProduct = formateProduct(allProduct3);

    responseReturn(res, 200, {
      products,
      latestProduct,
      topRatedProduct,
      discountProduct,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const price_range_product = async (req, res) => {
  try {
    const priceRange = {
      low: 0,
      high: 0,
    };
    const products = await productModel.find({}).limit(9).sort({ createdAt: -1 }); //1 for ascending order, -1 for descending order
    const latestProduct = formateProduct(products);
    const getForPrice = await productModel.find({}).sort({ price: 1 });
    if (getForPrice.length > 0) {
      priceRange.high = getForPrice[getForPrice.length - 1].price;
      priceRange.low = getForPrice[0].price;
    }
    responseReturn(res, 200, { latestProduct, priceRange });
  } catch (error) {
    console.log(error.message);
  }
};

const query_products = async (req, res) => {
  const nextPage = 6;
  req.query.nextPage = nextPage;
  try {
    const products = await productModel.find({}).sort({ createdAt: -1 });
    const totalProduct = new queryProducts(products, req.query)
      .categoryQuery()
      .ratingQuery()
      .searchQuery()
      .priceQuery()
      .sortByPrice()
      .countProducts();

    const result = new queryProducts(products, req.query)
      .categoryQuery()
      .ratingQuery()
      .priceQuery()
      .searchQuery()
      .sortByPrice()
      .skip()
      .limit()
      .getProducts();

    responseReturn(res, 200, { products: result, totalProduct, nextPage });
  } catch (error) {
    console.log(error.message);
  }
};

const product_detail = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await productModel.findOne({ slug });

    const relatedProduct = await productModel
      .find({
        $and: [
          {
            _id: { $ne: product._id },
          },
          {
            category: { $eq: product.category },
          },
        ],
      })
      .limit(10);

    const moreProduct = await productModel
      .find({
        $and: [
          {
            _id: { $ne: product._id },
          },
          {
            sellerId: { $eq: product.sellerId },
          },
        ],
      })
      .limit(3);
    responseReturn(res, 200, { product, relatedProduct, moreProduct });
  } catch (error) {
    console.log(error.message);
  }
};

const customer_submit_review = async (req, res) => {
  const { productId, rating, review, name } = req.body;
  try {
    await reviewModel.create({
      productId,
      name,
      rating,
      review,
      date: moment(Date.now()).format("LL"),
    });

    let ratings = 0;
    const reviews = await reviewModel.find({ productId });
    for (let i = 0; i < reviews.length; i++) {
      ratings += reviews[i].rating;
    }
    let productRating = 0;
    if (reviews.length !== 0) {
      productRating = (ratings / reviews.length).toFixed(1);
    }
    await productModel.findByIdAndUpdate(productId, {
      rating: productRating,
    });
    responseReturn(res, 201, { message: "Review Added Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

const get_reviews = async (req, res) => {
  const { productId } = req.params;
  let { pageNo } = req.query;
  pageNo = parseInt(pageNo);
  const limit = 5;
  const skipPage = limit * (pageNo - 1);
  try {
    let getRating = await reviewModel.aggregate([
      {
        $match: {
          productId: {
            $eq: mongoose.Types.ObjectId.createFromHexString(productId),
          },
          rating: {
            $not: {
              $size: 0,
            },
          },
        },
      },
      {
        $unwind: "$rating",
      },
      {
        $group: {
          _id: "$rating",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    let review_rating = [
      {
        rating: 5,
        sum: 0,
      },
      {
        rating: 4,
        sum: 0,
      },
      {
        rating: 3,
        sum: 0,
      },
      {
        rating: 2,
        sum: 0,
      },
      {
        rating: 1,
        sum: 0,
      },
    ];

    for (let i = 0; i < review_rating.length; i++) {
      for (let j = 0; j < getRating.length; j++) {
        if (review_rating[i].rating === getRating[j]._id) {
          review_rating[i].sum = getRating[j].count;
          break;
        }
      }
    }

    const getAll = await reviewModel.find({ productId });
    const reviews = await reviewModel.find({ productId }).skip(skipPage).limit(limit).sort({ createdAt: -1 });

    responseReturn(res, 200, {
      reviews,
      totalReview: getAll.length,
      review_rating,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  get_category,
  get_products,
  price_range_product,
  query_products,
  product_detail,
  customer_submit_review,
  get_reviews,
};
