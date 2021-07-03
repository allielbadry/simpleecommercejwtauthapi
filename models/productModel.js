const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  inStock: {
    type: Number,
    required: true,
  },
  photos: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    deafult: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Schema.Types.ObjectID,
    ref: "Category",
  },
});

module.exports = mongoose.model("Product", productSchema);
