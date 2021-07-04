const orderSchema = require("../models/orderModel");
const orderItems = require("../models/orderItemsModel");

module.exports = {
  createOrder: async (req, res, next) => {
    const orderItemsArray = await orderItems
      .find({ user: req.user._id, isPaid: false })
      .populate("product", "_id name price");
    const totalPrice = orderItemsArray.map((value, index, array) => {
      const price = array[index].quantity * array[index]["product"].price;
      return price;
    });
    const finalPrice = totalPrice.reduce((a, b) => a + b);
    const orderParam = {
      orderItems: orderItemsArray,
      shippingAddress: req.body.address,
      totalPrice: finalPrice,
      user: req.user,
    };
    orderSchema
      .create(orderParam)
      .then((order) => {
        return res.json(order);
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  },
  getOrders: (req, res, next) => {
    orderSchema
      .find({ user: req.user._id })
      .populate("user", "_id name")
      .populate({ path: "orderItems", populate: "product" })
      .then((order) => {
        return res.json(order);
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  },
  totalShop: async (req, res, next) => {
    try {
      const totalSales = await orderSchema.aggregate([
        { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
      ]);
      return res.json(totalSales);
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
};
