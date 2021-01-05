import { post, get } from "./api";
import {
  PROFILE_LOADING,
  PROFILE_END_LOADING,
  PROFILE_GET_DATA,
  PROFILE_CLEAR,
} from "../../redux/types";

export const getProfile = (checkAxiosConfig = false) => async (dispatch) => {
  await get(dispatch, {
    url: "/profile",
    loadingType: PROFILE_LOADING,
    successType: PROFILE_GET_DATA,
    errorType: PROFILE_END_LOADING,
    checkAxiosConfig,
  });
};

export const updateProfile = (data, successCallback = null) => async (
  dispatch
) => {
  let axiosConfig = null;
  if (data instanceof FormData) {
    axiosConfig = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };
  }
  const response = await post(dispatch, {
    url: "/profile",
    data,
    loadingType: PROFILE_LOADING,
    successType: PROFILE_GET_DATA,
    errorType: PROFILE_END_LOADING,
    axiosConfig,
  });
  if (successCallback && response && response.success) successCallback();
};

export const updateCurrentUserPassword = (
  data,
  loadingAction = null,
  finishCallback = null
) => async (dispatch) => {
  if (loadingAction) loadingAction();
  const response = await post(dispatch, {
    url: "/profile/update_password",
    data,
  });
  if (response && finishCallback) finishCallback(response.success);
};
