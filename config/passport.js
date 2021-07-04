const fs = require("fs");
const { join } = require("path");
const jwtExtract = require("passport-jwt").ExtractJwt;
const jwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/userModel");

const publicKeyPath = join(__dirname, "..", "/keys/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(publicKeyPath, "utf8");

options = {
  jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
  passReqToCallback: true,
};
const strategy = new jwtStrategy(options, (req, payload, done) => {
  User.findById(payload.sub)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => {
      return done(err, null);
    });
});
const strategyAdmin = new jwtStrategy(options, (req, payload, done) => {
  User.findById(payload.sub)
    .then((user) => {
      if (user && user.isAdmin) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => {
      return done(err, null);
    });
});

module.exports = (passport) => {
  passport.use("user", strategy);
  passport.use("admin", strategyAdmin);
};
