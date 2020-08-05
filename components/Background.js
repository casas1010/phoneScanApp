import React from "react";
import { Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const Background = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "blue",
      }}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,0.9)", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: SCREEN_HEIGHT,
        }}
      />
      <StatusBar style="light" />
      {props.elements}
    </View>
  );
};
export default Background;