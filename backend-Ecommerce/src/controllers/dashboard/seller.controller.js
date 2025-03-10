const sellerModel = require("../../models/seller.model");
const { responseReturn } = require("../../utils/response");

const get_seller_request = async (req, res) => {
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

const get_seller = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const seller = await sellerModel.findById(sellerId);
    responseReturn(res, 200, { seller });
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

const update_seller_status = async (req, res) => {
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

const get_active_seller = async (req, res) => {
  let { page, searchValue, nextPage } = req.query;
  page = parseInt(page);
  nextPage = parseInt(nextPage);
  const skipPage = nextPage * (page - 1);
  searchValue = searchValue ? searchValue.trim() : "";
  try {
    if (searchValue) {
      const sellers = await sellerModel
        .find({
          $text: { $search: searchValue },
          status: "active",
        })
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });
      const totalSeller = await sellerModel
        .find({
          $text: { $search: searchValue },
          status: "active",
        })
        .countDocuments();
      responseReturn(res, 200, { totalSeller, sellers });
    } else {
      const sellers = await sellerModel
        .find({ status: "active" })
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });
      const totalSeller = await sellerModel
        .find({ status: "active" })
        .countDocuments();
      responseReturn(res, 200, { totalSeller, sellers });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const get_deactivate_seller = async (req, res) => {
  let { page, searchValue, nextPage } = req.query;
  page = parseInt(page);
  nextPage = parseInt(nextPage);
  const skipPage = nextPage * (page - 1);
  searchValue = searchValue ? searchValue.trim() : "";
  try {
    if (searchValue) {
      const sellers = await sellerModel
        .find({
          $text: { $search: searchValue },
          status: "deactivate",
        })
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });
      const totalSeller = await sellerModel
        .find({
          $text: { $search: searchValue },
          status: "deactivate",
        })
        .countDocuments();
      responseReturn(res, 200, { totalSeller, sellers });
    } else {
      const sellers = await sellerModel
        .find({ status: "deactivate" })
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });
      const totalSeller = await sellerModel
        .find({ status: "deactivate" })
        .countDocuments();
      responseReturn(res, 200, { totalSeller, sellers });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  get_seller_request,
  get_seller,
  update_seller_status,
  get_active_seller,
  get_deactivate_seller,
};
