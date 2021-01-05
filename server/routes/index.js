const homeRoute = require("./home");
const dashboardRoute = require("./dashboard");
const authRoute = require("./auth");

module.exports = (server) => {
  server.use("/auth", authRoute);
  server.use("/dashboard", dashboardRoute);
  server.use(homeRoute);
  server.all("*", (req) => {
    return req.react("/notfound");
  });
};
