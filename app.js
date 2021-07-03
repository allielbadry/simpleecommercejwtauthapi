const express = require("express");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// database
require("./config/database");

// load the user model
// here

// passport config;
require("./config/passport")(passport);

app.use(passport.initialize());
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// laod all the routes
app.use(require("./routes"));

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`);
});
