import { DELETE_ITEM, DELETE_ALL_ITEMS, ADD_ITEM } from "../actions/types";
import _ from "lodash";
// import { REHYDRATE } from "redux-persist/es/constants";

const itemReducer = (state = [], action) => {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload.items || [];
    case ADD_ITEM:
      return _.uniqBy([action.payload, ...state], "barcode");

    case DELETE_ITEM:
      return state.filter((item) => item.barcode !== action.payload);

    case DELETE_ALL_ITEMS:
      return [];
    default:
      return state;
  }
};

export default itemReducer;
