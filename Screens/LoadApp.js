import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as firebase from 'firebase';
import { SecureStore } from 'expo';
import DataStorage from '../DataStorage';

class LoadApp extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    // Try to auto login user based on what's stored async
    this._autoLogin();
  }

  async _autoLogin() {
    let email = await SecureStore.getItemAsync('lastUser');
    const { navigate } = this.props.navigation;

    if (email !== '-' && email) {
      email = email.substring(0, email.indexOf('-at_')) + '@' + email.substring(email.indexOf('-at_') + 4, email.length);

      console.log('Email:', email);

      let password = await SecureStore.getItemAsync('password');
      console.log('Pass:', password);

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          DataStorage.loadBasicData();
          DataStorage.loadProfileData();

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
    } else {
      navigate('Login');
    }
  }

  render() {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    )
  }
}

export default LoadApp;
