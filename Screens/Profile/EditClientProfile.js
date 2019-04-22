/**
 * Copyright 2019 Change++ (changeplusplus.org)
 * File Name: EditClientProfile.js
 * Authors: Jake Laderman
 * Description: Allows one to edit the client profile
 * Last Edited: 5.15.19
 */


import React, { Component } from 'react';
import {Picker, ScrollView, TextInput, View} from 'react-native';
import * as firebase from 'firebase';
import {InputBlock} from "../../Components/InputBlock";
import {Button, Text, ThemeConsumer, ThemeProvider} from "react-native-elements";
import I18n from "../../Utils/i18n";

export default class EditClientProfile extends Component {
  state = {
    prefersEmail: true
  };

  render() {
    return (
      <View style={{justifyContent:'center'}}>
          <Text h5 style={Jtheme.Text}>{I18n.curLang.edit_client_profile.contact_question}</Text>
        <Picker
            selectedValue={this.state.prefersEmail}
            onValueChange={(itemValue) => this.setState({prefersEmail: itemValue})}>
          <Picker.Item label={I18n.curLang.edit_client_profile.picker_email} value={true} />
          <Picker.Item label={I18n.curLang.edit_client_profile.picker_phone} value={false} />
        </Picker>
          <Button style={Jtheme.Button} onPress={this._submitChanges}
                  title={I18n.curLang.edit_client_profile.submit}/>
      </View>
    );
  }

  _submitChanges = () => {
    const { prefersEmail } = this.state;
    const { navigate } = this.props.navigation;

    let userId = firebase.auth().currentUser.uid;

    firebase.database().ref('cases/' + userId).update({
      prefersEmail: prefersEmail
    });
    navigate('ClientProfile');
  };
}

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
    paddingTop: 125,
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