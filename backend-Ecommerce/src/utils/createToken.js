const jwt = require("jsonwebtoken");

module.exports.createToken = async (data) => {
  const token = await jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};
