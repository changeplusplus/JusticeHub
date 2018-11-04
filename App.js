import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import SignUp from './Screens/Auth/SignUp';
import config from './firebase-config';
import * as firebase from 'firebase';
import LoadApp from './Screens/LoadApp';
import Login from "./Screens/Auth/Login";
import ClientProfile from "./Screens/Profile/ClientProfile";
import LawyerProfile from "./Screens/Profile/LawyerProfile";
import SetupLawyerProfile from "./Screens/Profile/SetupLawyerProfile";
import SetupClientProfile from "./Screens/Profile/SetupClientProfile";

// API information in firebase-config.js
firebase.initializeApp(config);

const ClientTabNav = createBottomTabNavigator({
  /*CreateCase: {

  },*/
  ViewProfile: {
    screen: ClientProfile
  }
}, {
  tabBarPosition: 'bottom'
});

const LawyerTabNav = createBottomTabNavigator({
  /*CurrentCases: {

  },
  AllCases: {

  },*/
  ViewProfile: {
    screen: LawyerProfile
  }
}, {
  tabBarPosition: 'bottom'
});

const MainStack = createStackNavigator({
  LoadApp: {
    screen: LoadApp
  },
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  SetupLawyerProfile: {
    screen: SetupLawyerProfile
  },
  SetupClientProfile: {
    screen: SetupClientProfile
  },
  ClientTabNav: {
    screen: ClientTabNav,
    navigationOptions: {
      header: null
    }
  },
  LawyerTabNav: {
    screen: LawyerTabNav,
    navigationOptions: {
      header: null
    }
  }
});

class App extends React.Component {
  // SignUp component is a placeholder before we use react-navigation
  render() {
    return (
      <MainStack />
    );
  }
}

export default MainStack;