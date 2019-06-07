import { LOAD_LOGS } from "../actions/logActions";

const initialState = { logs: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LOGS: {
      return { ...state, logs: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
