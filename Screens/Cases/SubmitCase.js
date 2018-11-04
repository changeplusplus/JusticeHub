import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import {InputBlock} from "../../Components/InputBlock";


class SubmitCase extends Component {
  state = {
    caseType: '',
    caseDetails: ''
  };

  render() {
    return (
      <View>
        <Text>Submit Case</Text>
        <InputBlock item='Type of case'
                    state='caseType'
                    onChangeText={this._onChangeText}/>
        <InputBlock item='Case Deatails'
                    state='caseDetails'
                    onChangeText={this._onChangeText}/>

        <Button onPress={this._submitCase} title='Submit Case' />
      </View>
    )
  }

  _submitCase = () => {
    const { caseType, caseDetails } = this.state;

    let userId = firebase.auth().currentUser.uid;

    firebase.database().ref('Cases/' + userId).update({
      caseType: caseType,
      caseDetails: caseDetails
    });

    const { navigate } = this.props.navigation;
    navigate('ClientTabNav');
  };

  _onChangeText = (state, update) => {
    this.setState({
      [state]: update
    });
  };
}

export default SubmitCase;
