const asyncReducer = require("./asyncReducer");
const { AUTH_GET_DATA } = require("../../redux/types");

/**
 * @description Ingresa los datos de la sesion en los reducers iniciales para la aplicacion
 */
const sessionMiddleware = asyncReducer((req) => {
  const session = req.getSession();
  if (!session) {
    req.addInitialProps({
      needSession: true,
    });
    return;
  }

  if (session.user) {
    req.addRouteReducer({
      type: AUTH_GET_DATA,
      payload: session.user,
    });
  }
});

module.exports = sessionMiddleware;
