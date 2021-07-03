const User = require("../models/userModel");
const utils = require("../libs/utils");

module.exports = {
  createUser: (req, res, next) => {
    const hashPassword = utils.genPassword(req.body.password);
    const userParam = {
      name: {
        first: req.body.first,
        last: req.body.last,
      },
      email: req.body.email,
      hash: hashPassword.hash,
      salt: hashPassword.salt,
    };
    const newUser = new User(userParam);
    newUser.save((err, user) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      const jwt = utils.issueJWT(user);
      const fullName = `${user.name.first} ${user.name.last}`;
      return res.json({
        fullName: fullName,
        email: user.email,
        token: jwt.token,
        expires: jwt.expires,
      });
    });
  },
  userLogin: (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.json({
          error: "User not Found",
        });
      }
      const isValid = utils.validPassword(
        req.body.password,
        user.salt,
        user.hash
      );
      if (!isValid) {
        return res.json({
          error: "Username or Password does not Match",
        });
      }
      const token = utils.issueJWT(user);
      return res.json({
        message: "Login Succseful",
        token: token.token,
        expires: token.expires,
      });
    });
  },
};
