/**
 * @description Retorna si un REQUEST es de NextJS
 * @returns {Boolean}
 */
const isNextRequest = (req) => {
  return req.url.indexOf("_next") >= 0;
};

const isEmpty = (value) =>
  value === undefined ||
  value === "undefined" ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = {
  isEmpty,
  isNextRequest,
};
