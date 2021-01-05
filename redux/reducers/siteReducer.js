import {
  SITE_LOADING,
  SITE_END_LOADING,
  SITE_GET_DATA,
  SITE_CLEAR,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  loading: false,
  navigationLinks: [],
  contactLinks: [],
  socialLinks: [],
  storeLocation: [],
  userDashboardLinks: [
    {
      href: "/dashboard",
      text: "Perfil",
      icon: "icon-user-circle-o",
    },
    {
      href: "/dashboard/direcciones",
      text: "Direcciones",
      icon: "icon-location-pin",
    },
    {
      href: "/dashboard/compras",
      text: "Compras",
      icon: "icon-shopping-cart1",
    },
    {
      href: "/dashboard/entregas",
      text: "Entregas",
      icon: "icon-delivery_dining",
    },
    {
      href: "/dashboard/creditos",
      text: "Creditos",
      icon: "icon-credit",
    },
  ],
};

export default function reducer(state = initialState, action) {
  const payload = action.payload ? action.payload : {};
  switch (action.type) {
    case HYDRATE:
      const hydratePayload = payload.site ? payload.site : {};
      return {
        ...state,
        ...hydratePayload,
      };
    case SITE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SITE_END_LOADING:
      return {
        ...state,
        loading: false,
      };

    case SITE_GET_DATA:
      return {
        ...state,
        loading: false,
        ...payload,
      };

    case SITE_CLEAR: {
      return {
        loading: false,
      };
    }

    default:
      return state;
  }
}
