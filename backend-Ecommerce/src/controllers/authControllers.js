const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomer");
const { createToken } = require("../utils/createToken");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcrypt");

exports.admin_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel
      .findOne({
        email,
      })
      .select("+password");
    if (admin) {
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = await createToken({
          id: admin._id,
          role: admin.role,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }),
          responseReturn(res, 200, { token, message: "Login Successfully" });
      } else {
        responseReturn(res, 404, { error: "Password Wrong!" });
      }
    } else {
      responseReturn(res, 404, { error: "Email Not Found" });
    }
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

exports.getUser = async (req, res) => {
  const { id, role } = req;
  try {
    if (role === "admin") {
      const admin = await adminModel.findById(id);
      responseReturn(res, 200, { userInfo: admin });
    } else {
      const seller = await sellerModel.findById(id);
      responseReturn(res, 200, { userInfo: seller });
    }
  } catch (error) {
    responseReturn(res, 500, { error: "Internal Server Error" });
  }
};

exports.seller_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await sellerModel
      .findOne({
        email,
      })
      .select("+password");
    if (seller) {
      const match = await bcrypt.compare(password, seller.password);
      if (match) {
        const token = await createToken({
          id: seller.id,
          role: seller.role,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }),
          responseReturn(res, 200, { token, message: "Login Successfully" });
      } else {
        responseReturn(res, 404, { error: "Password Wrong!" });
      }
    } else {
      responseReturn(res, 404, { error: "Email Not Found" });
    }
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

exports.seller_register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const getUser = await sellerModel.findOne({ email });
    if (getUser) {
      responseReturn(res, 404, { error: "Email already existed" });
    } else {
      const seller = await sellerModel.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        method: "manually",
        shopInfo: {},
      });
      await sellerCustomerModel.create({
        myId: seller.id,
      });
      const token = await createToken({
        id: seller.id,
        role: seller.role,
      });
      res.cookie("accessToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      responseReturn(res, 201, { token, message: "Register Successfully" });
    }
  } catch (error) {
    responseReturn(res, 500, { error: "Internal Server Error" });
  }
};
