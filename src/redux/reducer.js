import { LOAD_LOGS, LOAD_ALERTS, UPDATE_ALERTS } from "../actions/logActions";

const initialState = { logs: [], alerts: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LOGS: {
      return { ...state, logs: action.payload };
    }
    case LOAD_ALERTS: {
      return { ...state, alerts: action.payload };
    }
    case UPDATE_ALERTS: {
      return { ...state, alerts: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
