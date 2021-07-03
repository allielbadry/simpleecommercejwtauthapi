const fs = require("fs");
const { join } = require("path");
const jwtExctract = require("passport-jwt").ExtractJwt;
const jwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/userModel");

const publicKeyPath = join(__dirname, "..", "/keys/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(publicKeyPath, "utf8");

const options = {
  jwtFromRequest: jwtExctract.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};
const strategy = new jwtStrategy(options, (payload, done) => {
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

module.exports = (passport) => {
  passport.use(strategy);
};
