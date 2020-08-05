import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import _ from "lodash";
import { connect } from "react-redux";

import * as actions from "../actions";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const WelcomeScreen = (props) => {
  const loginWithFacebook = async () => {
    props.facebookLogin();
    onAuthComplete(props);
  };

  //   // snippet of code should resemble componentWillReceiveProps
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    onAuthComplete(props);
  }, [props.token]);
  //   // snippet of code should resemble componentWillReceiveProps

  const onAuthComplete = (props) => {
    if (props.token) {
      props.navigation.navigate("Scan");
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1900,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          alignItems: "center",
        }}
      >
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.text}>Billions of bars.{"\n"} Free on Jabroni</Text>
      </Animated.View>

      <View style={styles.buttonContainer}>
        {/* <Button
            titleStyle={styles.buttonTitle}
            style={styles.buttonStyle}
            title="SIGN UP FREE"
            onPress={() => navigate("SignUpScreen")}
          /> */}
        <Button
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.buttonStyle}
          type="clear"
          title={"CONTINUE \n WITH FACEBOOK"}
          onPress={() => loginWithFacebook()}
          icon={
            <Feather
              name="facebook"
              size={24}
              color="white"
              style={{ left: 0 }}
            />
          }
        />
        {/* <Button
            titleStyle={styles.buttonTitle}
            style={styles.buttonStyle}
            title="LOGIN"
            type="clear"
            onPress={() => navigate("LoginScreen")}
          /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: "40%",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 15,
    left: 10,
    right: 10,
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
  },
  buttonStyle: {
    paddingTop: 10,
  },
});

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(WelcomeScreen);
