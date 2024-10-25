const moment = require("moment");
const customerOrderModel = require("../../models/customerOrderModel");
const authOrderModel = require("../../models/authOrderModel");
const cartModel = require("../../models/cartModel");
const myShopWalletModel = require("../../models/myShopWalletModel");
const sellerWalletModel = require("../../models/sellerWalletModel");
const { responseReturn } = require("../../utils/response");

const { default: mongoose } = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const place_order = async (req, res) => {
  const { price, products, shipping_fee, items, shippingInfo, userId } =
    req.body;
  let authorOrderData = [];
  let cartId = [];
  const tempDate = moment(Date.now()).format("LLL");

  let customerOrderProduct = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i].products;
    for (let j = 0; j < product.length; j++) {
      const tempCustomerProduct = product[j].productInfo;
      tempCustomerProduct.quantity = product[j].quantity;
      customerOrderProduct.push(tempCustomerProduct);
      if (product[j]._id) {
        cartId.push(product[j]._id);
      }
    }
  }
  console.log(customerOrderProduct);
  console.log("Cart Id:::", cartId);

  try {
    const order = await customerOrderModel.create({
      customerId: userId,
      shippingInfo,
      products: customerOrderProduct,
      price: price + shipping_fee,
      payment_status: "unpaid",
      delivery_status: "pending",
      date: tempDate,
    });

    for (let i = 0; i < products.length; i++) {
      const product = products[i].products;
      const price = products[i].price;
      const sellerId = products[i].sellerId;
      let storeProduct = [];
      for (let j = 0; j < product.length; j++) {
        const tempProduct = product[j].productInfo;
        tempProduct.quantity = product[j].quantity;
        storeProduct.push(tempProduct);
      }
      authorOrderData.push({
        orderId: order.id,
        sellerId,
        products: storeProduct,
        price: price,
        payment_status: "unpaid",
        shippingInfo: "Elliot House",
        delivery_status: "pending",
        date: tempDate,
      });
    }
    await authOrderModel.insertMany(authorOrderData);
    for (let k = 0; k < cartId.length; k++) {
      await cartModel.findByIdAndDelete(cartId[k]);
    }

    setTimeout(() => {
      check_payment(order.id);
    }, 30000);

    responseReturn(res, 200, {
      message: "Order Placed Successfully",
      orderId: order.id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const check_payment = async (id) => {
  try {
    const order = await customerOrderModel.findById(id);
    if (order.payment_status === "unpaid") {
      await customerOrderModel.findByIdAndUpdate(id, {
        delivery_status: "canceled",
      });
      await authOrderModel.updateMany(
        { orderId: id },
        {
          delivery_status: "canceled",
        }
      );
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};

const get_customer_dashboard_data = async (req, res) => {
  const { userId } = req.params;
  try {
    const recentOrder = await customerOrderModel
      .find({ customerId: mongoose.Types.ObjectId.createFromHexString(userId) })
      .limit(5);

    const pendingOrder = await customerOrderModel
      .find({
        customerId: mongoose.Types.ObjectId.createFromHexString(userId),
        delivery_status: "pending",
      })
      .countDocuments();

    const canceledOrder = await customerOrderModel
      .find({
        customerId: mongoose.Types.ObjectId.createFromHexString(userId),
        delivery_status: "canceled",
      })
      .countDocuments();

    const totalOrder = await customerOrderModel
      .find({
        customerId: mongoose.Types.ObjectId.createFromHexString(userId),
      })
      .countDocuments();

    responseReturn(res, 200, {
      recentOrder,
      pendingOrder,
      totalOrder,
      canceledOrder,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const get_orders = async (req, res) => {
  const { customerId, status } = req.params;
  try {
    let orders = [];
    if (status !== "all") {
      orders = await customerOrderModel.find({
        customerId: mongoose.Types.ObjectId.createFromHexString(customerId),
        delivery_status: status,
      });
    } else {
      orders = await customerOrderModel.find({
        customerId: mongoose.Types.ObjectId.createFromHexString(customerId),
      });
    }
    responseReturn(res, 200, { orders });
  } catch (error) {
    console.log(error.message);
  }
};

const get_detail_order = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await customerOrderModel.findById(orderId);
    responseReturn(res, 200, { order });
  } catch (error) {
    console.log(error.message);
  }
};

const get_admin_orders = async (req, res) => {
  let { page, searchValue, nextPage } = req.query;
  page = parseInt(page);
  nextPage = parseInt(nextPage);
  const skipPage = nextPage * (page - 1);
  try {
    if (searchValue) {
    } else {
      //aggregate dùng để tạo connection giữa các collection
      const orders = await customerOrderModel
        .aggregate([
          {
            $lookup: {
              from: "authorders",
              localField: "_id",
              foreignField: "orderId",
              as: "subOrders",
            },
          },
        ])
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });

      const totalOrder = await customerOrderModel.aggregate([
        {
          $lookup: {
            from: "authorders",
            localField: "_id",
            foreignField: "orderId",
            as: "subOrders",
          },
        },
      ]);
      responseReturn(res, 200, { orders, totalOrder: totalOrder.length });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const get_admin_order_detail = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await customerOrderModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(orderId),
        },
      },
      {
        $lookup: {
          from: "authorders",
          localField: "_id",
          foreignField: "orderId",
          as: "subOrders",
        },
      },
    ]);
    responseReturn(res, 200, { order: order[0] });
  } catch (error) {
    console.log("Get admin order detail " + error.message);
  }
};

const update_admin_order_status = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    await customerOrderModel.findByIdAndUpdate(orderId, {
      delivery_status: status,
    });
    responseReturn(res, 200, { message: "Order status updated successfully" });
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, { message: "Internal Sever Error" });
  }
};

const get_seller_orders = async (req, res) => {
  const { sellerId } = req.params;
  let { page, searchValue, nextPage } = req.query;
  page = parseInt(page);
  nextPage = parseInt(nextPage);
  const skipPage = nextPage * (page - 1);
  try {
    if (searchValue) {
    } else {
      const orders = await authOrderModel
        .find({ sellerId })
        .skip(skipPage)
        .limit(nextPage)
        .sort({ createdAt: -1 });
      const totalOrder = await authOrderModel
        .find({ sellerId })
        .countDocuments();
      responseReturn(res, 200, { orders, totalOrder });
    }
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, { message: "Internal Sever Error" });
  }
};

const get_seller_order_detail = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await authOrderModel.findById(orderId);
    responseReturn(res, 200, { order });
  } catch (error) {
    console.log("Get seller order detail " + error.message);
    responseReturn(res, 500, { message: "Internal Sever Error" });
  }
};

const update_seller_order_status = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    await authOrderModel.findByIdAndUpdate(orderId, {
      delivery_status: status,
    });
    responseReturn(res, 200, { message: "Order status updated successfully" });
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, { message: "Internal Sever Error" });
  }
};

const create_payment = async (req, res) => {
  const { price } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: "VND",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    responseReturn(res, 200, { clientSecret: payment.client_secret });
  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, { message: "Internal Sever Error" });
  }
};

const get_confirm_order = async (req, res) => {
  const { orderId } = req.params;
  try {
    await customerOrderModel.findByIdAndUpdate(orderId, {
      payment_status: "paid",
    });
    await authOrderModel.updateMany(
      { orderId: mongoose.Types.ObjectId.createFromHexString(orderId) },
      {
        payment_status: "paid",
        delivery_status: "pending",
      }
    );
    const customerOrder = await customerOrderModel.findById(orderId);
    const authorOrder = await authOrderModel.find({
      orderId: mongoose.Types.ObjectId.createFromHexString(orderId),
    });

    //m/d/yyyy => 1/1/2025 => [0] = 1, [1] = 1, [2] = 2025
    const time = moment(Date.now()).format("l");
    const splitTime = time.split("/");

    await myShopWalletModel.create({
      amount: customerOrder.price,
      month: splitTime[0],
      year: splitTime[2],
    })

    for (let i = 0; i < authorOrder.length; i++) {
      await sellerWalletModel.create({
        sellerId: authorOrder[i].sellerId.toString(),
        amount: authorOrder[i].price,
        month: splitTime[0],
        year: splitTime[2],
      })
    }

    responseReturn(res,200,{message: "Order confirmed successfully"});

  } catch (error) {
    console.log(error.message);
    responseReturn(res, 500, { message: "Internal Sever Error" });
  }
};

module.exports = {
  place_order,
  get_customer_dashboard_data,
  get_orders,
  get_detail_order,
  get_admin_orders,
  get_admin_order_detail,
  update_admin_order_status,
  get_seller_orders,
  get_seller_order_detail,
  update_seller_order_status,
  create_payment,
  get_confirm_order,
};
