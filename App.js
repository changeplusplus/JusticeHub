import React from 'react';
import { StackNavigator } from 'react-navigation';
//import SignUp from './Screens/Auth/SignUp';
import { StyleSheet, Text, View } from 'react-native';
import config from './firebase-config';       // Error with this line on iOS Simulation
import * as firebase from 'firebase';
import Chat from "./Components/Chat"
//import Login from "./Screens/Auth/Login";
//import EditLawyerProfile from "./Screens/Profile/EditLawyerProfile";
//import EditClientProfile from "./Screens/Profile/EditClientProfile";

// API information in firebase-config.js
firebase.initializeApp(config);

const MainStack = StackNavigator({
  /*SignUp: {
    screen: SignUp
  },
  Login: {
    screen: Login
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

export default App;