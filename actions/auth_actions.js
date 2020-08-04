import { AsyncStorage } from "react-native";
import * as Facebook from "expo-facebook";
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, LOG_OUT } from "./types";

// check for the token
// if there is a token, store the token in the store
// if there is no token, start the facebook loginflow
// if the user passes the facebook loginflow successfully, store the token in the store



// facebook login decision workflow
export const facebookLogin = () => async (dispatch) => {
    // get the fb token if it is there
  let token = await AsyncStorage.getItem("fb_token");

  // check the value of that token
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
    console.log("start fb login");
  }
};

// starts facebooklogin flow
const doFacebookLogin = async (dispatch) => {
  Facebook.initializeAsync("300020044475971", "ScanApp");

  let { type, token } = await Facebook.logInWithReadPermissionsAsync(
    "300020044475971",
    {
      permissions: ["public_profile"],
    }
  );

  if (type === "cancel") {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  // if it makes it this far, it means that you have login succesfully
  await AsyncStorage.setItem("fb_token", token);

  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};



export const signout = () => async (dispatch) => {
  // get the fb token if it is there
  await AsyncStorage.removeItem("fb_token");
  console.log('token has been cleared from phone')
  dispatch({ type: LOG_OUT, payload: '' });

}