import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, AppRegistry, View, KeyboardAvoidingView, Text, TextInput,
          Button, Picker } from 'react-native';
import { InputBlock } from "../../Components/InputBlock";
import DataStorage from '../../DataStorage';

var t = require('tcomb-form-native');

var STORAGE_KEY = 'id_token';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: "Full Name",
      username: "Username",
      password: "Password",
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
                      onChangeText={(username) => this.setState({username})}
          />
          <TextInput
                      style = {{height: 40}}
                      placeholder="Password"
                      onChangeText={(password) => this.setState({password})}
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
            onPress={this._userSignup}
            title="Sign Up"
            color="#841584"
          />
        </View>

      </View>


    )
  }
  // _onPressButton = () => {
  //    const { fullName, username, password, isLawyer } = this.state;
  //
  //     if (fullName.trim() === '' || password.trim() === '' ||
  //         username.trim() === '') {
  //       alert('Must fill out required fields');
  //       return;
  //     }
  //
  //     var token;
  //     admin.auth().createCustomToken(username)
  //       .then(function(customToken) {
  //         token = customToken;
  //       })
  //       .catch(function(error) {
  //         console.log("Error creating custom token:", error);
  //       });
  //
  //     firebase.auth().signInWithCustomToken(token).catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //     });
  // }

// https://dzone.com/articles/adding-authentication-to-your-react-native-app-usi-1
// Playing around with above tutorial
// Trying to modify to suit project needs
// Currently understand how to perform a custom sign in according to below tutorial but struggling to generate JWT
// https://firebase.google.com/docs/auth/web/custom-auth
// Need to create custom token as shown below
// https://firebase.google.com/docs/auth/admin/create-custom-tokens
// Unfortunately, Firebase Admin SDK is not supported for React Native and I am struggling to find third party that use same algorithm
// Might have to make own JWT as shown in following tutorial
// https://medium.com/code-wave/how-to-make-your-own-jwt-c1a32b5c3898
// Have invested a lot of hours researching/playing with tutorials, but haven't been able to get a funcitonal/meaningful commit
// Thus I'm taking to the comments to explain my workflow and what I'm doing right now

_userSignup() {
    if (true) { // if validation fails, value will be null
        fetch("http://localhost:19002/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: value.username,
                password: value.password,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            this._onValueChange(STORAGE_KEY, responseData.id_token),
            AlertIOS.alert(
            "Signup Success!",
            "Click the button to get a Chuck Norris quote!"
            )
        })
        .done();
    }
}
}
