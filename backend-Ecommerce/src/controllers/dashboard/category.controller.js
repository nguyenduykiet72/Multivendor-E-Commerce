const { formidable } = require("formidable");
const { responseReturn } = require("../../utils/response");
const cloudinary = require("cloudinary").v2;
const categoryModel = require("../../models/category.model");

const add_category = async (req, res) => {
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

const get_category = async (req, res) => {
  const { page, searchValue, nextPage } = req.query;
  try {
    let skipPage = "";
    if (nextPage && page) {
      skipPage = parseInt(nextPage) * (parseInt(page) - 1);
    }
    if (searchValue && page && nextPage) {
      const categories = await categoryModel
        .find({
          name: { $regex: searchValue, $options: "i" },
        })
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });
      const totalCategory = await categoryModel
        .find({
          name: { $regex: searchValue, $options: "i" },
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

const update_category = async (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      responseReturn(res, 404, { error: "something went wrong" });
    } else {
      let { name } = fields;
      let { image } = files;
      const { id } = req.params;

      name = name.trim();
      const slug = name.split(" ").join("-");

      try {
        let result = null;
        if (image) {
          cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET_KEY,
            secure: true,
          });
          result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categories",
          });
        }

        const updateData = {
          name,
          slug,
        };
        if (result) {
          updateData.image = result.url;
        }
        const category = await categoryModel.findByIdAndUpdate(id, updateData, {
          new: true,
        });
        responseReturn(res, 200, {
          category,
          message: "Category Updated Successfully",
        });
      } catch (error) {
        responseReturn(res, 500, { error: "Internal Server Error" });
      }
    }
  });
};

const delete_category = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deleteCategory = await categoryModel.findByIdAndDelete(categoryId);
    if (!deleteCategory) {
      console.log(`Category with id ${categoryId} not found`);
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  add_category,
  get_category,
  update_category,
  delete_category,
};
