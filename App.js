import React from 'react';
<<<<<<< HEAD
import { StackNavigator } from 'react-navigation';
//import SignUp from './Screens/Auth/SignUp';
import { StyleSheet, Text, View } from 'react-native';
import config from './firebase-config';       // Error with this line on iOS Simulation
import * as firebase from 'firebase';
import Chat from "./Components/Chat"
//import Login from "./Screens/Auth/Login";
//import EditLawyerProfile from "./Screens/Profile/EditLawyerProfile";
//import EditClientProfile from "./Screens/Profile/EditClientProfile";
=======
import { StackNavigator, TabNavigator } from 'react-navigation';
import SignUp from './Screens/Auth/SignUp';
import config from './firebase-config';
import * as firebase from 'firebase';
import Login from "./Screens/Auth/Login";
import ClientProfile from "./Screens/Profile/ClientProfile";
import LawyerProfile from "./Screens/Profile/LawyerProfile";
import SetupLawyerProfile from "./Screens/Profile/SetupLawyerProfile";
import SetupClientProfile from "./Screens/Profile/SetupClientProfile";
>>>>>>> 2515a7c4586165abc21068081eb24106fc3f6bca

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
  SignUp: {
    screen: SignUp
  },
  Login: {
    screen: Login
<<<<<<< HEAD
  },*/
  /*EditLawyerProfile: {
    screen: EditLawyerProfile
  }*/
  /*EditClientProfile: {
    screen: EditClientProfile
  }*/

   // After login
   // Main: { screen: Main },

    Chat: { screen: Chat }

    // Conversations with others
    // Conversations: { screen: Conversations },

  }, {
=======
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
>>>>>>> 2515a7c4586165abc21068081eb24106fc3f6bca
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