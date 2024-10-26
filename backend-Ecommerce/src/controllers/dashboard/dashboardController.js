const myShopWalletModel = require("../../models/myShopWalletModel");
const productModel = require("../../models/productModel");
const customerOrderModel = require("../../models/customerOrderModel");
const sellerModel = require("../../models/sellerModel");
const adminSellerMessageModel = require("../../models/chat/adminSellerMessageModel");
const sellerWalletModel = require("../../models/sellerWalletModel");
const authOrderModel = require("../../models/authOrderModel");
const sellerCustomerMessageModel = require("../../models/chat/sellerCustomerMessageModel");
const { default: mongoose } = require("mongoose");

const { responseReturn } = require("../../utils/response");

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

module.exports = {
  get_admin_dashboard_data,
  get_seller_dashboard_data,
};
