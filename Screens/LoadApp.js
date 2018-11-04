import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';
import DataStorage from '../DataStorage';

class LoadApp extends Component {
  componentDidMount() {
    // Try to auto login user based on what's stored async
    this._autoLogin();
  }

  async _autoLogin() {
    let email = await Expo.SecureStore.getItemAsync('lastUser');

    if (email) {
      email = email.substring(0, email.indexOf('-at_')) + '@' + email.substring(email.indexOf('-at_') + 4, email.length);

      console.log('Email:', email);

      let password = await Expo.SecureStore.getItemAsync('password');
      console.log('Pass:', password);

      const { navigate } = this.props.navigation;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          DataStorage.loadBasicData();

          if (DataStorage.IS_LAWYER) {
            navigate('LawyerTabNav');
          } else {
            navigate('ClientTabNav');
          }
        })
        .catch((error) => {
          alert('SignIn Error: ' + error.message);
          navigate('Login');
        })
    }
  }

  render() {
    return (
      <View>

      </View>
    )
  }
}

export default LoadApp;