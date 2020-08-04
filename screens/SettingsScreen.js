import React from "react";
import {
  Text,
  StyleSheet,
  FlatLis,
  ImageBackground,
  Dimensions,
  Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { connect } from "react-redux";
import * as actions from "../actions/index";

const SettingsScreen = (props) => {
  const singout = () => {
    props.signout();
    props.navigation.navigate("welcome");
  };

  return (

      <Button title="LogOut" onPress={() => singout()} />
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});

SettingsScreen.navigationOptions = {
  tabBarIcon: <Feather name="settings" size={24} color="white" />,
  tabBarOptions: {
    activeBackgroundColor: "black",
    inactiveBackgroundColor: "black",
  },
};

// export default SettingsScreen;

export default connect(null, actions)(SettingsScreen);
