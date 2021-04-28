import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import BusinessListScreen from "./src/screens/BusinessListScreen";
import BusinessCreateScreen from "./src/screens/BusinessCreateScreen";
import BusinessDetailScreen from "./src/screens/BusinessDetailScreen";
import MenuCreateScreen from "./src/screens/MenuCreateScreen";
import ServiceCreateScreen from "./src/screens/ServiceCreateScreen";
import NoticeCreateScreen from "./src/screens/NoticeCreateScreen";
import MenuDetailScreen from "./src/screens/MenuDetailScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as BusinessProvider } from "./src/context/BusinessContext";
import { FontAwesome } from "@expo/vector-icons";

const businessListFlow = createStackNavigator({
  BusinessList: BusinessListScreen,
  BusinessCreate: BusinessCreateScreen,
  BusinessDetail: BusinessDetailScreen,
  MenuCreate: MenuCreateScreen,
  ServiceCreate: ServiceCreateScreen,
  NoticeCreate: NoticeCreateScreen,
  MenuDetail: MenuDetailScreen,
});

businessListFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: <FontAwesome name="th-list" size={24} color="black" />,
};

//const businessDetailFlow = createStackNavigator({});

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  //grouping of different screen
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),

  mainFlow: createBottomTabNavigator({
    TrackCreate: TrackCreateScreen,
    BusinessList: businessListFlow,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <BusinessProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </BusinessProvider>
  );
};
