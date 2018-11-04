import React, { Component } from 'react';
import * as firebase from 'firebase';
import {View, TextInput, Button, KeyboardAvoidingView, Text} from 'react-native';
import { InputBlock } from "../../Components/InputBlock";
import DataStorage from "../../DataStorage";

class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    email: '',
    password: ''
  };
  
  render() {
    return (
      <View>
        <InputBlock item='Email'
                    state='email'
                    onChangeText={this._onChangeText}
                    value={this.state.email} />
        <InputBlock item='Password'
                    state='password'
                    onChangeText={this._onChangeText}
                    value={this.state.password} />

        <Button onPress={this._login} title='Log In' color='blue' />

        <Button onPress={this._navToSignup} title='Sign Up' color='green' />
      </View>
    )
  }

  _login = () => {
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Get userId
        let userId = firebase.auth().currentUser.uid;

        // Get basic data
        console.log('Logged in');
        DataStorage.saveLogin(email, password);
        DataStorage.loadBasicData();

        // Reset input so that it doesn't persist on logout
        this.setState({
          email: '',
          password: ''
        });

        alert('Logged in!\n' + userId);

        const { navigate } = this.props.navigation;

        if (DataStorage.IS_LAWYER) {
          navigate('LawyerTabNav');
        } else {
          navigate('ClientTabNav');
        }
      })
      .catch((error) => {
        alert('That email/password combo doesn\'t exist');
      })
  };

  _navToSignup = () => {
    const { navigate } = this.props.navigation;

    navigate('SignUp');
  }

  _onChangeText = (state, update) => {
    this.setState({
      [state]: update
    });
  };
}

export default Login;