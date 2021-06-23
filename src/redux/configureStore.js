import user from "./modules/user";
import post from "./modules/post";
import image from "./modules/image";
import comment from "./modules/comment";

import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  user,
  post,
  image,
  comment,
  router: connectRouter(history),
});

export default rootReducer;
