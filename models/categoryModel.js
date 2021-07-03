const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    reqired: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  photo: {
    type: String,
  },
  craeted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);
