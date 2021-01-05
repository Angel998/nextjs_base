import { post, updateToken, removeToken } from "./api";
import { AUTH_LOADING, AUTH_END_LOADING } from "../../redux/types";
import { redirect } from "../../utils/document";

export const logingOut = () => {
  removeToken();
  redirect("/auth/end");
};

export const authUser = (data, callbackAction = null) => async (dispatch) => {
  const response = await post(dispatch, {
    url: "/auth/login",
    data,
    loadingType: AUTH_LOADING,
    errorType: AUTH_END_LOADING,
  });
  if (callbackAction && response) callbackAction(response.success);

  if (!response || !response.success) return;

  const success = await updateToken(response.token);
  if (success) {
    redirect("/dashboard");
  }
};

export const registerUser = (data, callbackAction = null) => async (
  dispatch
) => {
  const response = await post(dispatch, {
    url: "/auth/register",
    data,
    loadingType: AUTH_LOADING,
    errorType: AUTH_END_LOADING,
  });
  if (callbackAction && response) callbackAction(response.success);
  if (!response || !response.success) return;

  const success = await updateToken(response.token);
  if (success) {
    redirect("/dashboard");
  }
};
