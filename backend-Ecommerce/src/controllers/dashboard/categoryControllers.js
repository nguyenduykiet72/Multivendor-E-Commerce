const { formidable } = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const categoryModel = require("../../models/categoryModel");

exports.add_category = async (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      responseReturn(res, 404, { error: "something went wrong" });
    } else {
      let { name } = fields;
      let { image } = files;
      name = name.trim();
      const slug = name.split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET_KEY,
        secure: true,
      });

      try {
        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: "categories",
        });

        if (result) {
          const category = await categoryModel.create({
            name,
            slug,
            image: result.url,
          });
          responseReturn(res, 201, {
            category,
            message: "Category Added Successfully",
          });
        } else {
          responseReturn(res, 404, { error: "Image Upload Failed" });
        }
      } catch (error) {
        responseReturn(res, 500, { error: "Internal Server Error" });
      }
    }
  });
};

exports.get_category = async (req, res) => {
  const { page, searchValue, nextPage } = req.query;
  const skipPage = parseInt(nextPage) * (parseInt(page) - 1);
  try {
    if (searchValue && page && nextPage) {
      const categories = await categoryModel
        .find({
          $text: { $search: searchValue },
        })
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });
      const totalCategory = await categoryModel
        .find({
          $text: { $search: searchValue },
        })
        .countDocuments();
      responseReturn(res, 200, { categories, totalCategory });
    } else if (searchValue === "" && page && nextPage) {
      const categories = await categoryModel
        .find({})
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });
      const totalCategory = await categoryModel.find({}).countDocuments();
      responseReturn(res, 200, { categories, totalCategory });
    } else {
      const categories = await categoryModel.find({}).sort({ createdAt: -1 });
      const totalCategory = await categoryModel.find({}).countDocuments();
      responseReturn(res, 200, { categories, totalCategory });
    }
  } catch (error) {
    console.log(error.message);
  }
};
