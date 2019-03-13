import React, { Component } from 'react';
import {Picker, View} from 'react-native';
import * as firebase from 'firebase';
import {InputBlock} from "../../Components/InputBlock";
import {Button, Text, TextInput, ThemeConsumer, ThemeProvider} from "react-native-elements";

export default class EditClientProfile extends Component {
  state = {
    location: '',
    caseType: '',
    commPref: '',
  };

  render() {
    return (
      <View>
        <Text h3 style={Jtheme.Text}>Update your information:</Text>

        <TextInput style={Jtheme.InputText}
                    item='Location'
                    state='location'
                    onChangeText={this._onChangeText}/>

        <TextInput style={Jtheme.InputText}
                    item='Type of case'
                    state='caseType'
                    onChangeText={this._onChangeText}/>

        <Text h5 style={Jtheme.Text}>How should lawyers contact you?</Text>
        <Picker
            selectedValue={this.state.commPref}
            onValueChange={(itemValue) => this.setState({commPref: itemValue})}>

          <Picker.Item label='Email' value={true} />
          <Picker.Item label='Phone' value={false} />
        </Picker>

        <Button style={Jtheme.Button} onPress={this._submitChanges} title='Submit Changes'/>
      </View>
    );
  }

  _submitChanges = () => {
    const { location, caseType, commPref } = this.state;

    let userId = firebase.auth().currentUser.uid;

    firebase.database().ref('Profiles/Clients/' + userId).update({
      location: location,
      caseType: caseType,
      commPref: commPref
    });
  };

  _onChangeText = (state, update) => {
    this.setState({
      [state]: update
    });
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
    alignment: true,
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
    alignment: true,
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