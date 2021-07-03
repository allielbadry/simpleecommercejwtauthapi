const crypto = require("crypto");
const fs = require("fs");
const { join } = require("path");

function generateKeyPair() {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
  fs.writeFileSync(
    join(__dirname, "..", "/keys/id_rsa_pub.pem"),
    keyPair.publicKey
  );
  fs.writeFileSync(
    join(__dirname, "..", "/keys/id_rsa_priv.pem"),
    keyPair.privateKey
  );
}

generateKeyPair();
