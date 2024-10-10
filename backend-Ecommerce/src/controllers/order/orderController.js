const moment = require("moment");
const customerOrderModel = require("../../models/customerOrderModel");
const authOrderModel = require("../../models/authOrderModel");
const cartModel = require("../../models/cartModel");
const { responseReturn } = require("../../utils/response");
const { default: mongoose } = require("mongoose");

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

module.exports = {
  place_order,
  get_customer_dashboard_data,
  get_orders,
  get_detail_order,
};
