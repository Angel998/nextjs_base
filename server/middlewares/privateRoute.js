/**
 * @description Redirige a una URL en caso de que no se encuentre la sesion
 */
const privateRoute = (
  config = {
    redirectUrl: "/login",
    redirectToCheckSession: false,
  }
) => {
  return function (req, res, next) {
    const session = req.getSession();
    if (config.redirectToCheckSession) {
      config.redirectUrl = `/auth/check?path=${req.originalUrl}`;
    }

    if (!session) return res.redirect(config.redirectUrl);
    next();
  };
};

module.exports = privateRoute;
