const stripeModel = require("../../models/stripeModel");
const sellerModel = require("../../models/sellerModel");
const sellerWalletModel = require("../../models/sellerWalletModel");
const withdrawRequestModel = require("../../models/withDrawRequestModel");

const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { responseReturn } = require("../../utils/response");
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

const sumAmount = (data) => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].amount;
  }
  return sum;
};

const get_seller_payment_details = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const payments = await sellerWalletModel.find({ sellerId });
    const pendingWithdraws = await withdrawRequestModel.find({
      $and: [
        {
          sellerId: {
            $eq: sellerId,
          },
        },
        {
          status: {
            $eq: "pending",
          },
        },
      ],
    });

    const successWithdraws = await withdrawRequestModel.find({
      $and: [
        {
          sellerId: {
            $eq: sellerId,
          },
        },
        {
          status: {
            $eq: "success",
          },
        },
      ],
    });

    const pendingAmount = sumAmount(pendingWithdraws);
    const withdrawAmount = sumAmount(successWithdraws);
    const totalAmount = sumAmount(payments);

    let availableAmount = 0;
    if (totalAmount > 0) {
      availableAmount = totalAmount - (pendingAmount + withdrawAmount);
    }

    responseReturn(res, 200, {
      totalAmount,
      pendingAmount,
      withdrawAmount,
      availableAmount,
      pendingWithdraws,
      successWithdraws,
    });
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, { message: "Internal Server Error" });
  }
};

const withdrawal_request = async (req, res) => {
  const { amount, sellerId } = req.body;
  try {
    const withdrawal = await withdrawRequestModel.create({
      sellerId,
      amount: parseInt(amount),
    });
    responseReturn(res, 201, {
      message: "Withdrawal Request Success",
      withdrawal,
    });
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, { message: "Internal Server Error" });
  }
};

module.exports = {
  create_stripe_connect_account,
  active_stripe_connect_account,
  get_seller_payment_details,
  withdrawal_request,
};
