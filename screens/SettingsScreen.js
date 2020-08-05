import React from "react";
import { StyleSheet, Button,View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { connect } from "react-redux";
import * as actions from "../actions/index";

const SettingsScreen = (props) => {
  const singout = () => {
    props.signout();
    props.navigation.navigate("welcome");
  };

  return (
    <View style={styles.container}>
      <Button title="LogOut" onPress={() => singout()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
      alignItems: 'center',
      height:'100%'
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
