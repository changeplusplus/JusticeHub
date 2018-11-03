import React, { Component } from 'react';
import * as firebase from 'firebase';
import { View, KeyboardAvoidingView, Text, TextInput,
          Button, Picker } from 'react-native';
import { InputBlock } from "../../Components/InputBlock";

export default class SignUp extends Component {
  state = {
    fullName: '',
    password: '',
    phone: '',
    email: '',
    isLawyer: false
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior='padding'>

          <InputBlock item='Full Name'
                      state='fullName'
                      onChangeText={this._onChangeText} />
          <InputBlock item='Password'
                      state='password'
                      onChangeText={this._onChangeText} />
          <InputBlock item='Phone Number'
                      state='phone'
                      onChangeText={this._onChangeText} />
          <InputBlock item='Email'
                      state='email'
                      onChangeText={this._onChangeText} />

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

  _signUp = () => {
    const { fullName, password, phone, email, isLawyer } = this.state;

    if (fullName.trim() === '' || password.trim() === '' ||
        phone.trim() === '') {
      alert('Must fill out required fields');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Get userId
        let userId = firebase.auth().currentUser.uid;

        // Set basic data in database
        firebase.database().ref('users/' + userId).set({
          fullName: fullName,
          email: email,
          phoneNumber: phone,
          isLawyer: isLawyer
        });

        alert('Account successfully created!');

        const { navigate } = this.props.navigation;

        if (isLawyer) {
          navigate('EditLawyerProfile');
        } else {
          navigate('EditClientProfile');
        }
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      })
  };

  _onChangeText = (state, update) => {
    this.setState({
      [state]: update
    });
  };
}