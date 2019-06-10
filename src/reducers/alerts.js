import * as types from "../constants/ActionTypes";

const alerts = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_ALERTS: {
      return action.payload;
    }
    case types.UPDATE_ALERTS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default alerts;