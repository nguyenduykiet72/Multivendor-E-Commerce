const myShopWalletModel = require("../../models/myShopWalletModel");
const productModel = require("../../models/productModel");
const customerOrderModel = require("../../models/customerOrderModel");
const sellerModel = require("../../models/sellerModel");
const adminSellerMessageModel = require("../../models/chat/adminSellerMessageModel");
const sellerWalletModel = require("../../models/sellerWalletModel");
const authOrderModel = require("../../models/authOrderModel");
const sellerCustomerMessageModel = require("../../models/chat/sellerCustomerMessageModel");
const { default: mongoose } = require("mongoose");
const { formidable } = require("formidable");
const cloudinary = require("cloudinary").v2;
const { responseReturn } = require("../../utils/response");
const bannerModel = require("../../models/bannerModel");

const get_admin_dashboard_data = async (req, res) => {
  const { id } = req;
  try {
    const totalSale = await myShopWalletModel.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    const totalProduct = await productModel.find({}).countDocuments();
    const totalOrder = await customerOrderModel.find({}).countDocuments();
    const totalSeller = await sellerModel.find({}).countDocuments();
    const messages = await adminSellerMessageModel.find({}).limit(3);
    const recentOrder = await customerOrderModel.find({}).limit(5);
    responseReturn(res, 200, {
      totalProduct,
      totalOrder,
      totalSeller,
      messages,
      recentOrder,
      totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
    });
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, false, "Internal server error");
  }
};

const get_seller_dashboard_data = async (req, res) => {
  const { id } = req;
  try {
    const totalSale = await sellerWalletModel.aggregate([
      {
        $match: {
          sellerId: {
            $eq: id,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    const totalProduct = await productModel
      .find({ sellerId: mongoose.Types.ObjectId.createFromHexString(id) })
      .countDocuments();
    const totalOrder = await authOrderModel
      .find({
        sellerId: mongoose.Types.ObjectId.createFromHexString(id),
      })
      .countDocuments();
    const totalPendingOrder = await authOrderModel
      .find({
        $and: [
          {
            sellerId: {
              $eq: mongoose.Types.ObjectId.createFromHexString(id),
            },
          },
          {
            delivery_status: {
              $eq: "pending",
            },
          },
        ],
      })
      .countDocuments();
    const messages = await sellerCustomerMessageModel
      .find({
        $or: [
          {
            senderId: {
              $eq: id,
            },
          },
          {
            receiverId: {
              $eq: id,
            },
          },
        ],
      })
      .limit(3);
    const recentOrder = await authOrderModel
      .find({ sellerId: mongoose.Types.ObjectId.createFromHexString(id) })
      .limit(5);
    responseReturn(res, 200, {
      totalProduct,
      totalOrder,
      totalPendingOrder,
      messages,
      recentOrder,
      totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
    });
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, false, "Internal server error");
  }
};

const add_banner = async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, field, files) => {
    const { productId } = field;
    const { mainBanner } = files;

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET_KEY,
      secure: true,
    });

    try {
      const { slug } = await productModel.findById(productId);
      const result = await cloudinary.uploader.upload(mainBanner.filepath, {
        folder: "banners",
      });
      const banner = await bannerModel.create({
        productId,
        banner: result.url,
        link: slug,
      });
      responseReturn(res, 201, {
        banner,
        message: "Banner added successfully",
      });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { error: "Internal server error" });
    }
  });
};

const get_banner = async (req, res) => {
  const { productId } = req.params;
  try {
    const banner = await bannerModel.findOne({
      productId: mongoose.Types.ObjectId.createFromHexString(productId),
    });
    responseReturn(res, 200, { banner });
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, { error: "Internal server error" });
  }
};

const update_banner = async (req, res) => {
  const { bannerId } = req.params;
  const form = formidable({ multiples: true });
  form.parse(req, async (error, _, files) => {
    const { mainBanner } = files;

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET_KEY,
      secure: true,
    });

    try {
      let banner = await bannerModel.findById(bannerId);
      let temp = banner.banner.split("/");
      temp = temp[temp.length - 1];
      const imageName = temp.split(".")[0];
      await cloudinary.uploader.destroy(imageName);
      const { url } = await cloudinary.uploader.upload(mainBanner.filepath, {
        folder: "banners",
      });

      await bannerModel.findByIdAndUpdate(bannerId, {
        banner: url,
      });

      banner = await bannerModel.findById(bannerId);
      responseReturn(res, 200, {
        banner,
        message: "Banner updated successfully",
      });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { error: "Internal server error" });
    }
  });
};

const get_banners = async (req, res) => {
  try {
    const banners = await bannerModel.aggregate([
      {
        $sample: {
          size: 5,
        }
      }
    ]);
    responseReturn(res, 200, { banners });
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, { error: "Internal server error" });
  }
};

module.exports = {
  get_admin_dashboard_data,
  get_seller_dashboard_data,
  add_banner,
  get_banner,
  update_banner,
  get_banners,
};
