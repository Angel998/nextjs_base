const APIModel = require("./APIModel");

class ProfileModel extends APIModel {
  async getClientProfile(token) {
    const response = await this.api.get("/profile", {
      headers: { ...this.getAuthHeader(token) },
    });
    return response ? response.data : null;
  }
}

module.exports = new ProfileModel();
