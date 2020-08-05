import { DELETE_ALL_ITEMS } from "./types";
import { DELETE_ITEM } from "./types";
import { ADD_ITEM } from "./types";
import axios from "axios";

export const addItemToList = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

export const deleteAllItems = () => {
  return {
    type: DELETE_ALL_ITEMS,
  };
};

export const deleteItem = (itemId) => async (dispatch) => {
  dispatch({ type: DELETE_ITEM, payload: itemId });
};

const handleSubmit = async (data) => {
  let response;
  try {
    response = await axios.post(
      "https://us-central1-quickstart-1585764879031.cloudfunctions.net/barcodeLookUp",
      { barCode: data }
    );
  } catch (err) {
    console.log(err);
  }
  return response.data;
};

export const getItem = (data) => async (dispatch) => {
  let response = await handleSubmit(data);

  dispatch(
    addItemToList({
      imageURL: response.imageURL,
      name: response.name,
      barcode: data,
    })
  );
};
