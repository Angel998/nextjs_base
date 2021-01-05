const { isNextRequest } = require("../../utils/validate");

/**
 * @description Ejecuta una funcion que agrega datos a los reducers iniciales, primero validando si el
 * request es te NEXT y asi omitir la operacion
 * @param {Function} fn
 */
const asyncReducer = (fn) => async (req, res, next) => {
  if (isNextRequest(req)) return next();
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = asyncReducer;
