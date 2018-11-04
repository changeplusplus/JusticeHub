import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import SignUp from './Screens/Auth/SignUp';
import config from './firebase-config';
import * as firebase from 'firebase';
import Login from "./Screens/Auth/Login";
import ClientProfile from "./Screens/Profile/ClientProfile";
import LawyerProfile from "./Screens/Profile/LawyerProfile";
import SetupLawyerProfile from "./Screens/Profile/SetupLawyerProfile";
import SetupClientProfile from "./Screens/Profile/SetupClientProfile";

// API information in firebase-config.js
firebase.initializeApp(config);

const ClientTabNav = TabNavigator({
  /*CreateCase: {

  },*/
  ViewProfile: {
    screen: ClientProfile
  }
}, {
  tabBarPosition: 'bottom'
});

const LawyerTabNav = TabNavigator({
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

const MainStack = StackNavigator({
  /*SignUp: {
    screen: SignUp
  },*/
  Login: {
    screen: Login
  },
  SetupLawyerProfile: {
    screen: SetupLawyerProfile
  },
  SetupClientProfile: {
    screen: SetupClientProfile
  },
  ClientTabNav: {
    screen: ClientTabNav
  },
  LawyerTabNav: {
    screen: LawyerTabNav
  }
}, {
  // Todo: potentially make this page specific
  navigationOptions: { header: null }
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