import React, { Component } from 'react';
import { View, Linking} from 'react-native';
import * as firebase from "firebase";
import { SecureStore } from "expo";
import DataStorage from "../../DataStorage";
import {Button, Text, ThemeConsumer, ThemeProvider} from "react-native-elements";

class ClientProfile extends Component {

    _openWhatsApp = () => {
        if (Linking.canOpenURL('whatsapp://app')) {
            Linking.openURL('whatsapp://app')
        } else {
            alert('Please install WhatsApp to continue')
        }
    };

    _communicate = () => {
    // FIXME hard coded data- for testing- delete
      //let clientName = get client userName
        let name = "Connor";
        let clientName = "Michael";
        let greeting = "Hello " + clientName + ", my name is " + name + " and I am a lawyer. I saw your case and would like to help.";
        let phoneNumber = +16026514181;

        if (!Linking.canOpenURL('whatsapp://app')) {
            alert('Please install WhatsApp to continue')
        } else {
            Linking.openURL('whatsapp://send?text=' + greeting + '&phone=' + phoneNumber)
        }
    };

        render() {
    return (
      <View styles={{flex:1, justifyContent:'center'}}>
          <Text h1 style={Jtheme.Text}>Account</Text>
          <Button style={Jtheme.Button} onPress={() => {this.props.navigation.navigate('EditClientProfile')}} title='Edit Profile'/>
          <Button style={Jtheme.Button} onPress={this._openWhatsApp} title='Messages' />
          <Button style={Jtheme.Button} onPress={this._communicate} title='Demo Message' />
          <Button style={Jtheme.Button} onPress={this._logout} title='Log Out' />
      </View>
    )
  }

  _logout = () => {
    firebase.auth().signOut();

    // Delete SecureStore user and pass and replace with - as placeholder
    SecureStore.setItemAsync('lastUser', '-')
      .then(() => {
        SecureStore.setItemAsync('password', '-')
          .then(() => {
            DataStorage.clearData();

            const {navigate} = this.props.navigation;

            navigate('Login');
          })
      })
  }
}

export default ClientProfile;

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
        paddingLeft: 115,
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