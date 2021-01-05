import { post, get, deletefn } from "./api";
import {
  DIRECTION_LOADING,
  DIRECTION_END_LOADING,
  DIRECTION_GET_DATA,
  DIRECTION_ADD_ELEMENT,
  DIRECTION_UPDATE_ELEMENT,
  DIRECTION_REMOVE_ELEMENT,
  DIRECTION_CLEAR,
} from "../../redux/types";

export const getClientDirections = (checkAxiosConfig = true) => async (
  dispatch
) => {
  await get(dispatch, {
    url: "/direction",
    loadingType: DIRECTION_LOADING,
    successType: DIRECTION_GET_DATA,
    errorType: DIRECTION_END_LOADING,
    checkAxiosConfig,
  });
};

export const createClientDirection = (data, callbackFuncion = null) => async (
  dispatch
) => {
  const response = await post(dispatch, {
    url: "/direction",
    data,
    successType: DIRECTION_ADD_ELEMENT,
  });
  if (callbackFuncion && response) callbackFuncion(response.success);
};

export const deleteClientDirection = (id, callbackFuncion = null) => async (
  dispatch
) => {
  const response = await deletefn(dispatch, {
    url: `/direction/${id}`,
    successType: DIRECTION_REMOVE_ELEMENT,
    successPayload: { id },
  });
  if (callbackFuncion && response) callbackFuncion(response.success);
};

export const updateClientDirection = (data, callbackFuncion = null) => async (
  dispatch
) => {
  const response = await post(dispatch, {
    url: `/direction/${data.id}`,
    successType: DIRECTION_UPDATE_ELEMENT,
    data,
  });
  if (callbackFuncion && response) callbackFuncion(response.success);
};
