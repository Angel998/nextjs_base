import { APP_LOCALSTORE_KEY } from "../config/appConfig";
import { isEmpty } from "../utils/validate";
import {
  getTokenFromResponse,
  setUserToState,
  updateToken,
  removeToken,
} from "./actions/api";

/**
 * @description Obtiene el token y lo decodifica
 */
const getTokenInfo = () => {
  const token = localStorage.getItem(APP_LOCALSTORE_KEY);
  if (isEmpty(token)) return null;

  const decoded = getTokenFromResponse({ token });
  const currentTime = new Date().getTime() / 1000;

  if (!decoded || !decoded.user || decoded.exp <= currentTime) {
    removeToken();
    return null;
  }

  return {
    token,
    decoded,
  };
};

/**
 * @description Inicia la aplicacion a partir de los elementos guardados en localStorage
 */
const initAppStatus = (store) => {
  const tokenInfo = getTokenInfo();
  if (!tokenInfo) return false;

  const { decoded } = tokenInfo;

  setUserToState(decoded.user, store.dispatch);
  return true;
};

/**
 * @description Obtiene el token y lo verifica para luego enviarlo al servidor y guardarlo en sesion
 * @returns {Boolean}
 */
const checkAppSession = async (getTokenFromLocalStorage = true) => {
  let token;

  if (getTokenFromLocalStorage) {
    token = localStorage.getItem(APP_LOCALSTORE_KEY);
  } else {
    const tokenInfo = getTokenInfo();
    if (tokenInfo && tokenInfo.token) {
      token = tokenInfo.token;
    }
  }
  if (isEmpty(token)) return false;

  const success = await updateToken(token);
  return success;
};

export { initAppStatus, checkAppSession };
