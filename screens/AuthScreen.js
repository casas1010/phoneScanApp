import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import _ from "lodash";
import { AppLoading } from "expo";

import Slides from "../components/Slides";

const SLIDE_DATA = [
  { text: "Welcome to JobApp", color: "#03A9F4" },
  { text: "Use this to get a job", color: "#009688" },
  { text: "Set your location, then swipe away", color: "#03A9F4" },
];



const AuthScreen = (props) => {
  const [token, setToken] = useState(null);

  useEffect( () => {
    // AsyncStorage.removeItem('fb_token')         // REMOVE ME!
    checkToken();
  }, []);

  const checkToken = async () => {
    let token = await AsyncStorage.getItem("fb_token");
    // setToken(token);
    if (token) {
      props.navigation.navigate("Scan");
      setToken(token);
    } else {
      setToken(false);
    }
  };

  const onSlidesComplete = () => {
    props.navigation.navigate("welcome");
  };

  if (_.isNull(token)) {
    return <AppLoading />;
  }

  return (
    <View>
      <Slides data={{ SLIDE_DATA }} onComplete={onSlidesComplete} />
    </View>
  );
};
const styles = StyleSheet.create({});

export default AuthScreen;
