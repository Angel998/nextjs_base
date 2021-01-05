const express = require("express");
const session = require("express-session");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const APP_PORT = process.env.APP_PORT;
const routes = require("./routes");
const middlewares = require("./middlewares");

const { processLog } = require("../utils/log");
const { APP_STATIC_FOLDER } = require("../config/appConfig");

let nextjsApp;
let app;
let server;

async function init() {
  nextjsApp = next({ dev });
  await nextjsApp.prepare();
  app = express();
  app.use(express.static(APP_STATIC_FOLDER));
  app.use(express.json());
  app.use(
    session({
      resave: false,
      name: "connect.sid",
      saveUninitialized: false,
      secret: process.env.APP_SESSION_SECRET,
      unset: "destroy",
    })
  );
  middlewares(app, nextjsApp);
  routes(app);
  server = app.listen(APP_PORT, () => {
    processLog(`NextJS iniciado en http://localhost:${APP_PORT}`);
  });
  return server;
}

function close() {
  if (!server) return;
  server.close(() => {
    processLog("NextJS: Cerrando servidor");
    process.exit(1);
  });
}

module.exports = {
  app,
  server,
  init,
  close,
};
