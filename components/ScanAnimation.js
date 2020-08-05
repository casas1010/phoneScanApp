// Animated.Value.Animated// where

// Animated.Types.Spring//how element is changeing

// Animated.Components// what element to element
import React, { Component, useState, useEffect } from "react";
import { View, Animated, Button, Text, Easing } from "react-native";

const ScanAnimation = () => {
  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  useEffect(() => {
    moveBar();
  }, []);

  function moveBar() {
    Animated.timing(value, {
      toValue: { x: 0, y: 150 },
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.cubic,
    }).start(() => {
      Animated.timing(value, {
        toValue: { x: 0, y: 0 },
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(() => {
        moveBar();
      });
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.barCodeSight}>
        <Animated.View style={value.getLayout()}>
          <View style={styles.line} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "green",
  },
  barCodeSight: {
    width: 150,
    height: 150,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
  },
};

export default ScanAnimation;
