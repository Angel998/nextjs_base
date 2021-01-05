const jwt = require("jsonwebtoken");

/**
 * @description Retorna un objeto de un Token o Null
 * @param {String} token
 * @returns {Object | Null}
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {}
  return null;
};

module.exports = {
  verifyToken,
};
