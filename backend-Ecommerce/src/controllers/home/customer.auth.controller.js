const sellerCustomerModel = require("../../models/chat/seller.customer.model");
const customerModel = require("../../models/customer.model");
const { createToken } = require("../../utils/createToken");
const { responseReturn } = require("../../utils/response");
const bcrypt = require("bcrypt");

const customer_register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const customer = await customerModel.findOne({ email });
    const hashPassword = await bcrypt.hash(password, 10);

    if (customer) {
      responseReturn(res, 404, { error: "Email already exists" });
    } else {
      const newCustomer = await customerModel.create({
        name: name.trim(),
        email: email.trim(),
        password: hashPassword,
        method: "manually",
      });

      await sellerCustomerModel.create({
        myId: newCustomer.id,
      });

      const token = await createToken({
        id: newCustomer.id,
        name: newCustomer.name,
        email: newCustomer.email,
        method: newCustomer.method,
      });
      res.cookie("customerToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      responseReturn(res, 201, { message: "Register Successfully", token });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const customer_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await customerModel.findOne({ email }).select("+password");
    if (customer) {
      const match = await bcrypt.compare(password, customer.password);
      if (match) {
        const token = await createToken({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          method: customer.method,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: "User Login Successfully", token });
      } else {
        responseReturn(res, 404, { error: "Password Wrong!" });
      }
    } else {
      responseReturn(res, 404, { error: "Email Not Found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const customer_logout = async (req, res) => {
  res.clearCookie("customerToken");
  responseReturn(res, 200, { message: "Logout Successfully" });
  // res.cookie('customerToken','',{
  //   expires: new Date(Date.now()),
  // })
  // responseReturn(res, 200, { message: "Logout Successfully"});
};

module.exports = {
  customer_register,
  customer_login,
  customer_logout
};
