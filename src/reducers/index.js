import { combineReducers } from "redux";
import logs from "./logs";
import alerts from "./alerts";

const reducer = combineReducers({
  alerts,
  logs
});

export default reducer;
