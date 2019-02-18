import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, AppRegistry, View, KeyboardAvoidingView, Text, TextInput,
          Button, Picker } from 'react-native';
import { InputBlock } from "../../Components/InputBlock";
import DataStorage from '../../DataStorage';
// import * as admin from 'firebase-admin';

// var admin = require("firebase-admin");
//
// var serviceAccount = require("../../justice-hub-7f4ab08fec05.json");
//
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://justice-hub.firebaseio.com"
// });

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
                      onChangeText={(username) => this.username = username}
          />
          <TextInput
                      style = {{height: 40}}
                      placeholder="Password"
                      onChangeText={(password) => this.password = password}
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
            onPress={() => this.signUp()}
            title="Sign Up"
            color="#841584"
          />
        </View>

      </View>
    )
  }
    signUp = () =>{
      try{
          firebase.auth().createUserWithEmailAndPassword(this.username+"@fakewebsite.com", this.password)
              .then(() => {
                  alert("Signed up successfully!");
              })
              .catch((error) => {
                  if (error ==  "Error: The email address is already in use by another account."){
                      firebase.auth().signInWithEmailAndPassword(this.username+"@fakewebsite.com", this.password);
                      alert("Logged in.");
                  } else{
                      alert(error);
                  }
              });
      }
      catch (e) {
          alert(e);
      }

    }
//   _onPressButton = () => {
//      const { fullName, username, password, isLawyer } = this.state;
//
//       if (fullName.trim() === '' || password.trim() === '' ||
//           username.trim() === '') {
//         alert('Must fill out required fields');
//         return;
//       }
//
//       admin.auth().createCustomToken(username)
//         .then(function(customToken) {
//           // Send token back to client
//         })
//         .catch(function(error) {
//           console.log("Error creating custom token:", error);
//         });
//
//       firebase.auth().signInWithCustomToken(token).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//       });
//   }
}
