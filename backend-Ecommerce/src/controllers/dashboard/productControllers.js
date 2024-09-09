const { formidable } = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const productModel = require("../../models/productModel");
exports.add_product = async (req, res) => {
  const { id } = req;
  const form = formidable({
    multiples: true,
  });
  form.parse(req, async (err, fields, files) => {
    let {
      name,
      category,
      description,
      quantity,
      price,
      discount,
      shopName,
      brand,
    } = fields;
    const { images } = files;
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
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i].filepath, {
          folder: "products",
        });
        allImageUrl = [...allImageUrl, result.url];
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
