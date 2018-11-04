import React, { Component } from 'react';
import {View, Text, Button} from 'react-native';
import * as firebase from "firebase";
import Expo from "expo";
import DataStorage from "../../DataStorage";

class ClientProfile extends Component {
  render() {
    return (
      <View>
        <Text>Client Profile</Text>
        <Button onPress={this._logout} title='Log Out' />
      </View>
    )
  }

  _logout = () => {
    firebase.auth().signOut();

    // Delete SecureStore user and pass and replace with - as placeholder
    Expo.SecureStore.setItemAsync('lastUser', '-')
      .then(() => {
        Expo.SecureStore.setItemAsync('password', '-')
          .then(() => {
            DataStorage.clearData();

            const {navigate} = this.props.navigation;

            navigate('Login');
          })
      })
  }
}

export default ClientProfile;