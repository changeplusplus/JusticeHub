import React, { Component } from 'react';
import {View, Linking} from 'react-native';
import * as firebase from 'firebase';
import { SecureStore } from 'expo';
import DataStorage from "../../DataStorage";
import CaseSearch from "../Cases/CaseSearch";
import {Button, Text, ThemeConsumer, ThemeProvider} from "react-native-elements";

class LawyerProfile extends Component {
  render() {
    return (
      <View>
          <Text h1 style={Jtheme.Text}>My Profile</Text>
            <Button style={Jtheme.Button} onPress={() => {this.props.navigation.navigate('CaseSearch')}} title='Find Cases'/>
            <Button style={Jtheme.Button} onPress={this._openWhatsApp} title='Messages'/>
            <Button style={Jtheme.Button} onPress={() => {this.props.navigation.navigate('SetupLawyerProfile')}} title='Edit Profile'/>
            <Button style={Jtheme.Button} onPress={this._logout} title='Log Out' />

      </View>
    )
  }

    _openWhatsApp = () => {
        if (Linking.canOpenURL('whatsapp://app')) {
            Linking.openURL('whatsapp://app')
        } else {
            alert('Please install WhatsApp to continue')
        }
    };

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

const Jtheme = {

    backgroundColor: '#112853',

    BackButton: {
        color: '#cc7832',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 100,
        marginTop: -5,
        position: 'absolute', // add if dont work with above
    },

    Button: {
        color: '#cc7832',
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 30,
        paddingBottom: 30,
    },

    Container: {
        flex: 1,
        color: '#cc7832',
        backgroundColor: '#112853',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: '#111111',
        borderWidth: 1,
    },

    Input: {
        flex: 1,
        backgroundColor: '#111111',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: '#111111',
        borderWidth: 3,
        paddingLeft: 50,
    },

    Text: {
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 40,
        paddingTop: 50,
        paddingLeft: 50,
        paddingRight: 50,
    },

    InputText: {
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 15,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 50,
    },

};