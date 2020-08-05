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
      },
      // remove the white border on the tabNavigator
      // {
      //   tabBarOptions:{
      //     tabStyle:{borderColor:'purple', borderWidth:4,},
      //    }
      // }
      
      ),
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
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist"; // npm install --save redux-persist

const persistedStore = persistStore(store);

export default () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <Background elements={<App />} />
      </PersistGate>
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
