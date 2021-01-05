import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  API_URL,
  APP_LOCALSTORE_KEY,
  APP_AUTH_HEADER,
  APP_AUTH_BEARER,
} from "../../config/appConfig";
import { GET_ERRORS, CLEAR_ERRORS, AUTH_GET_DATA } from "../../redux/types";
import { isEmpty } from "../../utils/validate";

export const post = async (
  dispatch,
  requestConfig = {
    url: "",
    data: {},
    loadingType: null,
    successType: null,
    errorType: null,
    axiosConfig: null,
    checkAxiosConfig: false,
  }
) => {
  if (requestConfig.checkAxiosConfig) {
    checkAxiosAppConfig();
  }

  let response = null;
  if (requestConfig.loadingType) {
    dispatch({
      type: requestConfig.loadingType,
    });
  }
  try {
    const axiosResponse = await axios.post(
      `${API_URL}${requestConfig.url}`,
      requestConfig.data,
      requestConfig.axiosConfig
    );
    if (requestConfig.successType) {
      dispatch({
        type: requestConfig.successType,
        payload: axiosResponse.data.data,
      });
    }
    clearErrors(dispatch);
    configUserFromResponse(axiosResponse.data, dispatch);
    response = axiosResponse.data;
  } catch (err) {
    console.log(err);
    response = getErrors(dispatch, err);
    if (requestConfig.errorType) {
      dispatch({
        type: requestConfig.errorType,
      });
    }
  }
  return response;
};

export const get = async (
  dispatch,
  requestConfig = {
    url: "",
    loadingType: null,
    successType: null,
    errorType: null,
    axiosConfig: null,
    checkAxiosConfig: false,
  }
) => {
  if (requestConfig.checkAxiosConfig) {
    checkAxiosAppConfig();
  }

  let response;
  if (requestConfig.loadingType) {
    dispatch({
      type: requestConfig.loadingType,
    });
  }
  try {
    const axiosResponse = await axios.get(
      `${API_URL}${requestConfig.url}`,
      requestConfig.axiosConfig
    );
    if (requestConfig.successType) {
      dispatch({
        type: requestConfig.successType,
        payload: axiosResponse.data.data,
      });
    }
    clearErrors(dispatch);
    configUserFromResponse(axiosResponse.data, dispatch);
    response = axiosResponse.data;
  } catch (err) {
    console.log(err);
    response = getErrors(dispatch, err);
    if (requestConfig.errorType) {
      dispatch({
        type: requestConfig.errorType,
      });
    }
  }

  return response;
};

export const deletefn = async (
  dispatch,
  requestConfig = {
    url: "",
    loadingType: null,
    successType: null,
    errorType: null,
    axiosConfig: null,
    checkAxiosConfig: false,
    successPayload: null,
  }
) => {
  if (requestConfig.checkAxiosConfig) {
    checkAxiosAppConfig();
  }

  let response;
  if (requestConfig.loadingType) {
    dispatch({
      type: requestConfig.loadingType,
    });
  }
  try {
    const axiosResponse = await axios.delete(
      `${API_URL}${requestConfig.url}`,
      requestConfig.axiosConfig
    );
    if (requestConfig.successType) {
      let payload = {};
      if (requestConfig.successPayload) {
        payload = requestConfig.successPayload;
      } else if (axiosResponse.data.data) {
        payload = axiosResponse.data.data;
      }
      dispatch({
        type: requestConfig.successType,
        payload,
      });
    }
    clearErrors(dispatch);
    configUserFromResponse(axiosResponse.data, dispatch);
    response = axiosResponse.data;
  } catch (err) {
    console.log(err);
    response = getErrors(dispatch, err);
    if (requestConfig.errorType) {
      dispatch({
        type: requestConfig.errorType,
      });
    }
  }

  return response;
};

/**
 * @description Actualiza la informacion de la sesion en el servidor a travez de su token
 * @param {String} token
 * @returns {Boolean}
 */
export const updateToken = async (token) => {
  let success = false;
  try {
    await axios.post(`${location.origin}/auth/update`, {
      token,
    });
    success = true;
  } catch (err) {
    console.log(err);
  }
  return success;
};

export const clearErrors = (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getErrors = (dispatch, errorResponse) => {
  let payload = {};
  if (
    errorResponse.response &&
    errorResponse.response.data &&
    typeof errorResponse.response.data.data !== "undefined"
  ) {
    payload = errorResponse.response.data.data;
  }

  if (
    errorResponse.response &&
    errorResponse.response.data &&
    typeof errorResponse.response.data.error !== "undefined"
  ) {
    payload = {
      ...payload,
      error: errorResponse.response.data.error,
    };
  }

  if (errorResponse.response && errorResponse.response.data) {
    configUserFromResponse(errorResponse.response, dispatch);
  }

  dispatch({
    type: GET_ERRORS,
    payload,
  });

  if (errorResponse.response && errorResponse.response.data) {
    return errorResponse.response.data;
  }
};

/**
 * @description Configura la informacion de usuario desde una respuesta HTTP
 * @param {Object} response
 * @param {Function} dispatch
 */
export const configUserFromResponse = (response, dispatch) => {
  const decoded = getTokenFromResponse(response);
  if (isEmpty(decoded)) return;

  setUserToState(decoded.user, dispatch);
};

/**
 * @description Ejecuta el dispatch con el TYPE correcto para ingresar el usuario a Redux
 * @param {Object} payload
 * @param {Function} dispatch
 */
export const setUserToState = (payload, dispatch) => {
  dispatch({
    type: AUTH_GET_DATA,
    payload,
  });
};

/**
 * @description Retorna el token decodificado de un request, o nulo
 * @param {Object} response
 * @returns {Object|Null}
 */
export const getTokenFromResponse = (response) => {
  const { token } = response;
  if (isEmpty(token)) return null;

  let decoded = null;

  try {
    decoded = jwt_decode(token);
  } catch (err) {
    console.log(err);
  }

  if (decoded) {
    localStorage.setItem(APP_LOCALSTORE_KEY, token);
    setAxiosToken(token);
  }

  return decoded;
};

/**
 * @description Configura o elimina el token de axios
 * @param {String} token
 */
export const setAxiosToken = (token) => {
  if (token) {
    axios.defaults.headers.common[
      APP_AUTH_HEADER
    ] = `${APP_AUTH_BEARER}${token}`;
  } else {
    delete axios.defaults.headers.common[APP_AUTH_HEADER];
  }
};

/**
 * @description Elimina el token de la sesion del navegador del usuario
 */
export const removeToken = () => {
  setAxiosToken(null);
  localStorage.removeItem(APP_LOCALSTORE_KEY);
};

export const checkAxiosAppConfig = () => {
  if (axios.defaults.headers.common[APP_AUTH_HEADER]) return;
  if (!localStorage) return;

  const token = localStorage.getItem(APP_LOCALSTORE_KEY);
  getTokenFromResponse({ token });
};

const sleep = (seconds = 5) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};
