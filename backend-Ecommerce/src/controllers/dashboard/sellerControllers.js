const sellerModel = require("../../models/sellerModel");
const { responseReturn } = require("../../utils/response");

exports.get_seller_request = async (req, res) => {
  const { page, searchValue, nextPage } = req.query;
  const skipPage = parseInt(nextPage) * (parseInt(page) - 1);
  try {
    if (searchValue) {
    } else {
      const sellers = await sellerModel
        .find({ status: "pending" })
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });
      const totalSeller = await sellerModel
        .find({ status: "pending" })
        .countDocuments();
      responseReturn(res, 200, { sellers, totalSeller });
    }
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

exports.get_seller = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const seller = await sellerModel.findById(sellerId);
    responseReturn(res, 200, { seller });
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

exports.update_seller_status = async (req, res) => {
  const { sellerId, status } = req.body;
  try {
    await sellerModel.findByIdAndUpdate(sellerId, { status });
    const seller = await sellerModel.findById(sellerId);
    responseReturn(res, 200, {
      seller,
      message: "Seller Status Updated Successfully",
    });
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};
