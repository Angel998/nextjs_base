import { GET_ERRORS, CLEAR_ERRORS } from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE:
      const hydratePayload = action.payload.error ? action.payload.error : {};
      return {
        ...state,
        ...hydratePayload,
      };
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
