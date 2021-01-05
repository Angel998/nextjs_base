const { SITE_GET_DATA, PROFILE_GET_DATA } = require("../../redux/types");
const SiteModel = require("../../models/SiteModel");
const ProfileModel = require("../../models/ProfileModel");
const asyncReducer = require("./asyncReducer");

/**
 * @description Agrega la informacion general para visualizar la app para un cliente convencional
 */
const getGeneralClientData = asyncReducer(async (req) => {
  const payload = await SiteModel.getGeneralClientData();
  if (!payload) return;

  req.addRouteReducer({
    type: SITE_GET_DATA,
    payload,
  });
});

const getClientProfileData = asyncReducer(async (req) => {
  const session = req.getSession();
  if (!session || !session.token) return;

  const payload = await ProfileModel.getClientProfile(session.token);
  if (!payload) return;

  req.addRouteReducer({
    type: PROFILE_GET_DATA,
    payload,
  });
});

module.exports = {
  getGeneralClientData,
  getClientProfileData,
};
