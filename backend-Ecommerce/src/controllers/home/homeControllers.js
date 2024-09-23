const categoryModel = require("../../models/categoryModel");
const productModel = require('../../models/productModel')
const { responseReturn } = require("../../utils/response");
const formateProduct = require('../../utils/formate')

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
    const products = await productModel.find({}).limit(12).sort({createdAt:-1});
    const allProduct1 = await productModel.find({}).limit(9).sort({createdAt:-1});
    const latestProduct = formateProduct(allProduct1);

    const allProduct2 = await productModel.find({}).limit(9).sort({rating:-1});
    const topRatedProduct = formateProduct(allProduct2);

    const allProduct3 = await productModel.find({}).limit(9).sort({discount:-1});
    const discountProduct = formateProduct(allProduct3);

    responseReturn(res,200,{products,latestProduct,topRatedProduct,discountProduct})
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  get_category,
  get_products
};
