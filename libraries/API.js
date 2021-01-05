const axios = require("axios");
const { API_URL } = require("../config/appConfig");

class API {
  async post(url, data = {}, axiosConfig = null) {
    try {
      const axiosResponse = await axios.post(
        `${API_URL}${url}`,
        data,
        axiosConfig
      );
      return axiosResponse.data;
    } catch (err) {}
    return null;
  }

  async get(url, axiosConfig = null) {
    try {
      const axiosResponse = await axios.get(`${API_URL}${url}`, axiosConfig);
      return axiosResponse.data;
    } catch (err) {}
    return null;
  }
}

module.exports = API;
