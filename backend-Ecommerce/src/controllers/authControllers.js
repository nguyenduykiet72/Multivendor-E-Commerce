const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const { createToken } = require("../utils/createToken");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcrypt");
const { formidable } = require("formidable");
const cloudinary = require("cloudinary").v2;

const admin_login = async (req, res) => {
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
          responseReturn(res, 200, { token, message: "Admin Login Successfully" });
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
const getUser = async (req, res) => {
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

const seller_login = async (req, res) => {
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
          responseReturn(res, 200, { token, message: "Seller Login Successfully" });
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

const seller_register = async (req, res) => {
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

const upload_profile_image = async (req, res) => {
  const { id } = req;
  const form = formidable({ multiples: true });
  form.parse(req, async (error, _, files) => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET_KEY,
      secure: true,
    });

    const { image } = files;
    try {
      const result = await cloudinary.uploader.upload(image.filepath, {
        folder: "profile",
      });
      if (result) {
        await sellerModel.findByIdAndUpdate(id, {
          image: result.url,
        });
        const userInfo = await sellerModel.findById(id);
        responseReturn(res, 200, {
          message: "Profile Image Upload Successfully",
          userInfo,
        });
      } else {
        responseReturn(res, 404, {
          message: "Profile Image Upload Failed",
          userInfo,
        });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  });
};
const add_profile_info = async (req, res) => {
  const { city, district, shopName, address } = req.body;
  const { id } = req;
  try {
    await sellerModel.findByIdAndUpdate(id, {
      shopInfo: {
        shopName,
        city,
        district,
        address,
      },
    });
    const userInfo = await sellerModel.findById(id);
    responseReturn(res, 201, {
      userInfo,
      message: "Profile Info Added Successfully",
    });
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    responseReturn(res, 200, { message: "Logout Successfully" });
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

module.exports = {
  admin_login,
  getUser,
  seller_login,
  seller_register,
  upload_profile_image,
  add_profile_info,
  logout,
}