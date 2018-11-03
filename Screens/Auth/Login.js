import React, { Component } from 'react';
import * as firebase from 'firebase';
import {View, TextInput, Button, KeyboardAvoidingView} from 'react-native';
import { InputBlock } from "../../Components/InputBlock";

class Login extends Component {
  state = {
    email: '',
    password: ''
  };
  
  render() {
    return (
      <View>
        <InputBlock item='Email'
                    state='email'
                    onChangeText={this._onChangeText}/>
        <InputBlock item='Password'
                    state='password'
                    onChangeText={this._onChangeText}/>

        <Button onPress={this._login} title='Sign Up' color='blue' />
      </View>
    )
  }

  _login = () => {
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Get userId
        let userId = firebase.auth().currentUser.uid;

        alert('Logged in!\n' + userId);
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

export default Login;