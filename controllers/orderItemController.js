const orderItems = require("../models/orderItemsModel");

module.exports = {
  createOrder: (req, res, next) => {
    const newOrder = new orderItems({ quantity: req.body.quantity });
    newOrder.product = req.product;
    newOrder.user = req.user;
    newOrder.save((err, order) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      return res.json(order);
    });
  },
};
