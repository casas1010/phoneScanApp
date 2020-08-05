import React, {  useState, useEffect } from "react";
import {
  View,
  AsyncStorage,
} from "react-native";
import _ from "lodash";
import { AppLoading } from "expo";

import Slides from "../components/Slides";

const SLIDE_DATA = [
  { text: "Welcome to Jabroni", color: "#0000f4" },
  { text: "Use is app to find the name and barcode of stuff!", color: "#010088" },
  { text: "Point and scan to get started!", color: "#0000cf" },
];



const AuthScreen = (props) => {
  const [token, setToken] = useState(null);

  useEffect( () => {
    checkToken();
  }, []);

  const checkToken = async () => {
    let token = await AsyncStorage.getItem("fb_token");
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

export default AuthScreen;
