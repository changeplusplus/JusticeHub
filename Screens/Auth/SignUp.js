import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, AppRegistry, View, KeyboardAvoidingView, Text, TextInput,
          Button, Picker } from 'react-native';
import { InputBlock } from "../../Components/InputBlock";
import DataStorage from '../../DataStorage';

export default class SignUp extends Component {

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  constructor(props) {
    super(props);
    this.state = {
      fullName: "Full Name",
      password: "Username",
      phone: "Password",
      isLawyer: false
    };
  }

  render() {
    return (
      <View style = {{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <KeyboardAvoidingView behavior='padding' style = {{flex: 1, padding: 10}}>

          <TextInput
                      style = {{height: 40}}
                      placeholder="Full Name"
                      onChangeText={(fullName) => this.setState({fullName})}
          />
          <TextInput
                      style = {{height: 40}}
                      placeholder="Username"
                      onChangeText={(fullName) => this.setState({fullName})}
          />
          <TextInput
                      style = {{height: 40}}
                      placeholder="Password"
                      onChangeText={(fullName) => this.setState({fullName})}
          />
          <Picker
                      selectedValue={this.state.isLawyer}
                      style={{height: 1, width: 100}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({isLawyer: itemValue})
                      }>
                      <Picker.Item label="Lawyer" value={true} />
                      <Picker.Item label="Client" value={false} />
          </Picker>


        </KeyboardAvoidingView>
        <View style = {{flex: 1}}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
            color="#841584"
          />
        </View>

      </View>


    )
  }
}
