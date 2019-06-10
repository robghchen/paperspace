import * as types from "../constants/ActionTypes";

const logs = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_LOGS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default logs;