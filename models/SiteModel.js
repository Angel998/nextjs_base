const APIModel = require("./APIModel");

class SiteModel extends APIModel {
  async getGeneralClientData() {
    const response = await this.api.get("/site/general/client");
    return response ? response.data : null;
  }
}

module.exports = new SiteModel();
