import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import { SecureStore } from 'expo';
import DataStorage from "../../DataStorage";
import CaseSearch from "../Cases/CaseSearch";
class LawyerProfile extends Component {
  render() {
    return (
      <View>
        <Text>Lawyer Profile</Text>
          <Button onPress={() => {this.props.navigation.navigate('CaseSearch')}} title="Find Cases"/>
        <Button onPress={this._logout} title='Log Out' />
      </View>
    )
  }

  _logout = () => {
    firebase.auth().signOut();

    // Delete SecureStore user and pass and replace with - as placeholder
    SecureStore.getItemAsync('lastUser')
      .then((user) => {
        SecureStore.setItemAsync('lastUser', '-')
          .then(() => {
            SecureStore.setItemAsync('pass', '-')
              .then(() => {
                DataStorage.clearData();

                const { navigate } = this.props.navigation;

                navigate('Login');
              })
          })
      })
  }
}

export default LawyerProfile;