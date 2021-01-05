const sessionMiddleware = require("./session");

/**
 * @description Agrega funciones tipo helpers al request para mejorar la funcionalidad del servidor
 */
const reqFunctions = (server, req, res) => {
  /**
   * @description Agrega propiedades inciales en la renderizacion de un componente
   * @param {Object} props
   */
  req.addInitialProps = (props) => {
    const renderAppData = req.routeData ? req.routeData : {};
    req.routeData = {
      ...renderAppData,
      ...props,
    };
  };

  /**
   * @description Renderiza una pagina estilo componente React
   * @param {String} pageName
   * @param {Object} appData
   */
  req.reactRender = (pageName, appData = {}) => {
    const renderAppData = req.routeData ? req.routeData : {};

    const reducers = [];
    if (req.routeReducers) {
      req.routeReducers.forEach((reducer) => reducers.push(reducer));
    }
    if (appData.reducers) {
      appData.reducers.forEach((reducer) => reducers.push(reducer));
      delete appData.reducers;
    }

    req.appData = {
      ...renderAppData,
      ...appData,
    };
    if (reducers.length > 0) {
      req.appData.reducers = reducers;
    }
    server.render(req, res, pageName, req.query);
  };

  /**
   * @description Renderiza una pagina estilo componente React y obtiene el appData de una funcion asyncrona
   * @param {String} pageName
   * @param {Function} getDataFunction
   */
  req.react = async (pageName, getDataFunction) => {
    let appData = {};
    if (typeof getDataFunction == "function") {
      try {
        appData = await getDataFunction();
      } catch (err) {
        console.log(err);
        appData = {
          error: err.getMessage(),
        };
      }
    }
    req.reactRender(pageName, appData);
  };

  /**
   * @description Agrega un reducer a la propiedad routeReducers
   * @param {Object} reducer
   */
  req.addRouteReducer = (reducer) => {
    const routeReducers = req.routeReducers ? req.routeReducers : [];
    routeReducers.push(reducer);
    req.routeReducers = routeReducers;
  };

  /**
   * @description Ingresa la nueva sesion
   * @param {Object} sessionData
   */
  req.setSession = (sessionData = {}, addCurrentSession = true) => {
    let currentSession = {};
    if (addCurrentSession) {
      currentSession = req.session.serverSession || {};
    }
    req.session.serverSession = {
      ...currentSession,
      ...sessionData,
    };
  };

  /**
   * @description Retorna la sesion
   * @returns {Object|Null}
   */
  req.getSession = () => {
    if (req.session.serverSession && req.session.serverSession.exp) {
      const currentTime = new Date().getTime() / 1000;
      if (req.session.serverSession.exp <= currentTime) return null;
    }
    return req.session.serverSession;
  };

  /**
   * @description Destruye la sesion de manera sincrona
   */
  req.destroySession = () => {
    return new Promise((resolve) => {
      delete req.session.serverSession;
      req.session.destroy((err) => {
        if (err) return resolve(false);

        resolve(true);
      });
    });
  };
};

module.exports = (server, nextjsApp) => {
  server.use((req, res, next) => {
    reqFunctions(nextjsApp, req, res);
    next();
  });
  server.use(sessionMiddleware);
};
