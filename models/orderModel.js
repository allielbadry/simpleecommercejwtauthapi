const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderItems: [
    {
      type: Schema.Types.ObjectID,
      ref: "orderItems",
    },
  ],
  shippingAddress: {
    type: String,
    required: true,
  },
  totalPrice: String,
  orderAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
