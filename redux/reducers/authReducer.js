import {
  AUTH_LOADING,
  AUTH_END_LOADING,
  AUTH_GET_DATA,
  AUTH_CLEAR,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: {},
};

export default function reducer(state = initialState, action) {
  const payload = action.payload ? action.payload : {};
  switch (action.type) {
    case HYDRATE:
      const hydratePayload = payload.auth ? payload.auth : {};
      return {
        ...state,
        ...hydratePayload,
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case AUTH_END_LOADING:
      return {
        ...state,
        loading: false,
      };

    case AUTH_GET_DATA:
      return {
        ...state,
        loading: false,
        user: payload,
        isLoggedIn: Object.keys(payload).length > 0,
      };

    case AUTH_CLEAR: {
      return {
        loading: false,
        user: {},
      };
    }

    default:
      return state;
  }
}
