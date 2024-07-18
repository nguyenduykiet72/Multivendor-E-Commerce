const adminModel = require("../models/adminModel");
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
          // name: admin.name,
          // email: admin.email,
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
      const user = await adminModel.findById(id);
      responseReturn(res, 200, { userInfo: user });
    } else {
      console.log('Sailor Information');
    }
  } catch (error) {
    console.log(error.message);
  }
};
