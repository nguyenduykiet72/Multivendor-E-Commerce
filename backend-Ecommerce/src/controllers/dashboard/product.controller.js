const { formidable } = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const productModel = require("../../models/product.model");

const add_product = async (req, res) => {
  const { id } = req;
  const form = formidable({
    multiples: true,
  });
  form.parse(req, async (err, fields, files) => {
    let { name, category, description, quantity, price, discount, shopName, brand } = fields;
    let { images } = files;
    name = name.trim();
    const slug = name.split(" ").join("-");

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET_KEY,
      secure: true,
    });

    try {
      let allImageUrl = [];

      if (!Array.isArray(images)) {
        images = [images];
      }

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i].filepath, {
          folder: "products",
        });
        allImageUrl.push(result.url);
      }

      await productModel.create({
        sellerId: id,
        name,
        slug,
        shopName,
        category: category.trim(),
        description: description.trim(),
        quantity: parseInt(quantity),
        price: parseInt(price),
        discount: parseInt(discount),
        images: allImageUrl,
        brand: brand.trim(),
      });
      responseReturn(res, 201, { message: "Product Added Successfully" });
    } catch (error) {
      responseReturn(res, 500, { message: error });
    }
  });
};

const get_products = async (req, res) => {
  const { page, searchValue, nextPage } = req.query;
  const { id } = req;

  const skipPage = parseInt(nextPage) * (parseInt(page) - 1);
  try {
    if (searchValue) {
      const products = await productModel
        .find({
          // name: { $regex: searchValue, $options: "i" },
          $text: { $search: searchValue },
          sellerId: id,
        })
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });
      const totalProduct = await productModel
        .find({
          // name: { $regex: searchValue, $options: "i" },
          $text: { $search: searchValue },
          sellerId: id,
        })
        .countDocuments();
      responseReturn(res, 200, { products, totalProduct });
    } else {
      const products = await productModel.find({ sellerId: id }).skip(skipPage).limit(nextPage).sort({ createdAt: -1 });
      const totalProduct = await productModel.find({ sellerId: id }).countDocuments();
      responseReturn(res, 200, { products, totalProduct });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const get_product = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findById(productId);
    responseReturn(res, 200, { product });
  } catch (error) {
    console.log(error.message);
  }
};
const update_product = async (req, res) => {
  let { name, description, quantity, price, discount, brand, productId, category } = req.body;
  name = name.trim();
  const slug = name.split(" ").join("-");
  try {
    await productModel.findByIdAndUpdate(productId, {
      name,
      description,
      quantity,
      price,
      category,
      discount,
      brand,
      productId,
      slug,
    });
    const product = await productModel.findById(productId);
    responseReturn(res, 200, {
      product,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

const update_product_image = async (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fields, files) => {
    // console.log(`Fields::`, fields);
    // console.log(`Files::`, files);
    const { oldImage, productId } = fields;
    const { newImage } = files;
    if (error) {
      responseReturn(res, 400, { error: error.message });
    } else {
      try {
        cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.API_KEY,
          api_secret: process.env.API_SECRET_KEY,
          secure: true,
        });

        const result = await cloudinary.uploader.upload(newImage.filepath, {
          folder: "products",
        });
        if (result) {
          let { images } = await productModel.findById(productId);
          const index = images.findIndex((img) => img === oldImage);
          images[index] = result.url;
          await productModel.findByIdAndUpdate(productId, { images });
          const product = await productModel.findById(productId);
          responseReturn(res, 200, {
            product,
            message: "Product Images Updated Successfully",
          });
        } else {
          responseReturn(res, 404, {
            error: " Images Updated Failed",
          });
        }
      } catch (error) {
        responseReturn(res, 404, {
          error: error.message,
        });
      }
    }
  });
};

module.exports = {
  add_product,
  get_products,
  get_product,
  update_product,
  update_product_image,
};
