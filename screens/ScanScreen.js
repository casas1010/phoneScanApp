import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Scan from "../components/Scan";


const ScanScreen = (props) => {
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const focusListner = props.navigation.addListener("didFocus", () =>
      setIsFocused(true)
    );
    const blurListner = props.navigation.addListener("willBlur", () =>
      setIsFocused(false)
    );
    return () => {
      focusListner.remove();
      blurListner.remove();
    };
  });

  if (!isFocused) {
    return (
      <View contentContainerStyle={styles.container} style={styles.spinner}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <Scan navigation={props.navigation} />;
};

ScanScreen.navigationOptions = {
  tabBarIcon: <MaterialCommunityIcons name="barcode-scan" size={24} color="white" />,
  tabBarOptions:{
    activeBackgroundColor: 'black',
    inactiveBackgroundColor: 'black'
  }
}

const styles = {
  container: {
    flexGrow: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default ScanScreen;
