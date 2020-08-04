import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import ScanScreen from "./screens/ScanScreen";
import ListScreen from "./screens/ListScreen";
import SettingsScreen from "./screens/SettingsScreen";

const MainNavigator = createBottomTabNavigator(
  {
    auth: { screen: AuthScreen },
    welcome: { screen: WelcomeScreen },
    main: {
      screen: createBottomTabNavigator({
        Scan: { screen: ScanScreen },
        Items: { screen: ListScreen },
        Settings: { screen: SettingsScreen },
      }),
    },
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
    navigationOptions: {
      lazy: true,
    },
  }
);

const App = createAppContainer(MainNavigator);

import { Provider } from "react-redux";
import store from "./store";
import Background from "./components/Background";

export default () => {
  return (
    <Provider store={store}>
      <Background elements={<App />} />
    </Provider>
  );
};

// export default () => {
//   return (
//     <Provider store={store}>
//       <App
//       // ref={navigator => {
//       //   setNavigator(navigator);
//       // }}
//       />
//     </Provider>
//   );
// };
