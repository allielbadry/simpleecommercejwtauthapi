const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

mongoose.connection.once("connect", () => {
  console.log("DB CONNECTED");
});
