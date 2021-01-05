import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import siteReducer from "./siteReducer";

import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  site: siteReducer,
  error: errorReducer,
});

export default rootReducer;
