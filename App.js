import React from 'react';
import { StackNavigator } from 'react-navigation';
import SignUp from './Screens/Auth/SignUp';
import { StyleSheet, Text, View } from 'react-native';
import config from './firebase-config';
import * as firebase from 'firebase';

// API information in firebase-config.js
firebase.initializeApp(config);

const MainStack = StackNavigator({
  SignUp: {
    screen: SignUp
  }
}, {
  navigationOptions: { header: null }
});

export default class App extends React.Component {
  // SignUp component is a placeholder before we use react-navigation
  render() {
    return (
      <MainStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
