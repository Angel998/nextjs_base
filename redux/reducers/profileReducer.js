import {
  PROFILE_LOADING,
  PROFILE_END_LOADING,
  PROFILE_GET_DATA,
  PROFILE_CLEAR,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  loading: true,
  content: {},
};

export default function reducer(state = initialState, action) {
  const payload = action.payload ? action.payload : {};
  switch (action.type) {
    case HYDRATE:
      const hydratePayload = payload.profile ? payload.profile : {};
      return {
        ...state,
        ...hydratePayload,
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case PROFILE_END_LOADING:
      return {
        ...state,
        loading: false,
      };

    case PROFILE_GET_DATA:
      return {
        ...state,
        loading: false,
        content: payload,
      };

    case PROFILE_CLEAR: {
      return {
        loading: false,
        content: {},
      };
    }

    default:
      return state;
  }
}
