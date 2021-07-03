const fs = require("fs");
const { join } = require("path");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const privateKeyPath = join(__dirname, "..", "/keys/id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(privateKeyPath, "utf8");

module.exports = {
  genPassword: function (password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hashPass = crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");
    return {
      hash: hashPass,
      salt: salt,
    };
  },
  validPassword: function (password, salt, hash) {
    const hashPass = crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");
    return hashPass === hash;
  },
  issueJWT: function (user) {
    const _id = user._id;
    const expiresIn = "1d";
    const payload = {
      sub: _id,
      isAdmin: false,
      iat: Date.now(),
    };
    const signedToken = jwt.sign(payload, PRIV_KEY, {
      expiresIn: expiresIn,
      algorithm: "RS256",
    });
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn,
    };
  },
};
