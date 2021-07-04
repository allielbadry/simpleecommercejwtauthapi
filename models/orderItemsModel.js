const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemsSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Schema.Types.ObjectID,
    ref: "Product",
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
});

module.exports = mongoose.model("OrderItems", orderItemsSchema);
