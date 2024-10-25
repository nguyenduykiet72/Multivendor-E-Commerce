const stripeModel = require("../../models/stripeModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { responseReturn } = require("../../utils/response");
const sellerModel = require("../../models/sellerModel");
require("dotenv").config();

const create_stripe_connect_account = async (req, res) => {
  const { id } = req;
  const uid = uuidv4();
  try {
    const stripeInfo = await stripeModel.findOne({ sellerId: id });
    if (stripeInfo) {
      await stripeModel.deleteOne({ sellerId: id });
      const account = await stripe.accounts.create({ type: "express" });
      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: "http://localhost:3001/refresh",
        return_url: `http://localhost:3001/success?activeCode=${uid}`,
        type: "account_onboarding",
      });
      await stripeModel.create({
        sellerId: id,
        stripeId: account.id,
        code: uid,
      });
      responseReturn(res, 201, { url: accountLink.url });
    } else {
      const account = await stripe.accounts.create({ type: "express" });
      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: "http://localhost:3001/refresh",
        return_url: `http://localhost:3001/success?activeCode=${uid}`,
        type: "account_onboarding",
      });
      await stripeModel.create({
        sellerId: id,
        stripeId: account.id,
        code: uid,
      });
      responseReturn(res, 201, { url: accountLink.url });
    }
  } catch (error) {
    console.log("strpe connect account errror" + error.message);
  }
};

const active_stripe_connect_account = async (req, res) => {
  const { activeCode } = req.params;
  const { id } = req;
  try {
    const userStripeInfo = await stripeModel.findOne({ code: activeCode });

    if (userStripeInfo) {
      await sellerModel.findByIdAndUpdate(id, {
        payment: "active",
      });
      responseReturn(res, 200, { message: "Payment Active Success" });
    } else {
      responseReturn(res, 404, { message: "Payment Active Fail" });
    }
  } catch (error) {
    console.log("Active stripe connect account error" + error.message);
    responseReturn(res, 500, { message: "Internal Server Error" });
  }
};

module.exports = {
  create_stripe_connect_account,
  active_stripe_connect_account,
};
