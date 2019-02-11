import React, { Component } from 'react';
import * as firebase from 'firebase';
import { AppRegistry, View, KeyboardAvoidingView, Text, TextInput,
          Button, Picker } from 'react-native';
import { InputBlock } from "../../Components/InputBlock";
import DataStorage from '../../DataStorage';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: 'Full Name',
      password: 'Password',
      phone: 'Phone Number',
    };
  }

  render() {
    return (
      <View style={{ flex: 1 , padding: 10}}>
        <KeyboardAvoidingView behavior='padding'>

          <TextInput
                      style = {{height: 40}}
                      placeholder="Hmm"
                      onSubmitEditing={(fullName) => this.setState({fullName})}
          />

          <Text>{this.state.fullName}</Text>
          <Picker
            selectedValue={this.state.isLawyer}
            onValueChange={(itemValue) => this.setState({isLawyer: itemValue})}>

            <Picker.Item label='Lawyer' value={true} />
            <Picker.Item label='Client' value={false} />
          </Picker>

          <Button onPress={this._signUp} title='Sign Up' color='blue' />
        </KeyboardAvoidingView>
      </View>
    )
  }
}
