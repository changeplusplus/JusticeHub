import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, AppRegistry, View, KeyboardAvoidingView, Text, TextInput,
          Button, Picker } from 'react-native';
import { InputBlock } from "../../Components/InputBlock";
import DataStorage from '../../DataStorage';
import MainStack from "../../App.js"
import { withNavigation } from 'react-navigation';




export default class SignUp extends Component {
  static router = MainStack.router;
  // MainStack navigation={this.props.navigation};


  constructor(props) {
    super(props);
    this.state = {
      fullName: "Full Name",
      email: "email",
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
                      placeholder="Email"
                      onChangeText={(email) => this.setState({email})}
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

  _userSignup = () => {
    const { fullName, email, password, isLawyer } = this.state;

    if (fullName.trim() === '' || password.trim() === '' ||
        email.trim() === '') {
      alert('Must fill out required fields');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() =>
    {
      let userId = firebase.auth().currentUser.uid;
            // Set basic data in database
      firebase.database().ref('users/' + userId).set({
        fullName: fullName,
        email: email,
        isLawyer: isLawyer
      });
      alert('Sign up successful!');
      this.props.navigation.navigate('Login');

    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);

  });
  }

}
