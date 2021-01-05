const API = require("../libraries/API");
const { APP_AUTH_HEADER, APP_AUTH_BEARER } = require("../config/appConfig");

class APIModel {
  constructor() {
    this.api = new API();
  }

  getAuthHeader(token) {
    const header = {};
    header[APP_AUTH_HEADER] = `${APP_AUTH_BEARER}${token}`;
    return header;
  }
}

module.exports = APIModel;
