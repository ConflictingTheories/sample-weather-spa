const crypto = require("crypto");

module.exports = (function Crypto() {
  const _that = {
    // Sha512
    sha512: (password, salt) => {
      var hash = crypto.createHmac("sha512", salt);
      hash.update(password);
      var value = hash.digest("hex");
      return {
        salt: salt,
        passwordHash: value,
      };
    },
    // Random Value
    genRandomHex: (length) => {
      return crypto
        .randomBytes(~~(length / 2) + 1)
        .toString("hex")
        .slice(0, length);
    },
    // Password Hash
    saltHashPassword: (pass) => {
      var salt = _that.genRandomHex(16);
      var passwordData = _that.sha512(pass, salt);
      return passwordData;
    },
  };
  return _that;
})();
