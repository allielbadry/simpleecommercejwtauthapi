const orderSchema = require("../models/orderModel");
const orderItems = require("../models/orderItemsModel");

module.exports = {
  createOrder: (req, res, next) => {
    const newOrder = new orderItems({ quantity: req.body.quantity });
    newOrder.product = req.product;
    newOrder.save((err, order) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
    });
    const orderParam = {
      orderItems: newOrder,
      shippingAddress: req.body.address,
      totalPrice: req.body.totalprice,
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
};
